define([
	'jquery',
	'underscore',
	'backbone',
	'm/RowModel',
	'v/ColumnView'
], function($, _, Backbone, RowModel, ColumnView ) {

	var RowView = Backbone.View.extend({
		tagName: 'div',
		className: 'form-row',
		events: {
			'click': 'onSelect'
		},
		initialize: function() {
			var layout = this.model.get('layout');
			this.$el.addClass(layout);

			if(this.model.get('selected') == true) {
				this.$el.addClass('form-row-selected');
			}

			this.columnModels = this.model.getColumns();
            console.log('the columns in initialize of row..');
            console.log(this.columnModels);

			this.model.bind('change:selected', this.selectChanged, this);
            this.columnModels.bind('add', this.render, this);
		},
		render: function() {
            console.log('render row ...');
            if(this.columnViews == undefined || this.columnViews.length > 0) {
                console.log('clear view');
                this.clearView();
            }

			this.columnViews = [];

            console.log(this.columnModels);

			this.columnModels.forEach(function(colModel) {
				var colView = new ColumnView({
					model: colModel
				});
				colView.parent = this;      
				this.columnViews.push(colView);

				var colEl = colView.render().el;
				this.$el.append(colEl);

				if(colView.model.getContent().isUsed() == true) {
					show = true;	
				}

			}, this);
            
			return this;
		},
		getTemplate: function() {
			var el = this.render().el;
			return $('<p></p>').append(el).html();
		},
		clearView: function() {
			_.each(this.columnViews, function(col) {
				col.remove();
			}, this);

			this.$el.empty();
		},
		onSelect: function() {
			var currentSelected = this.model.get('selected');
			this.parent.clearRowSelect();			

			this.model.set({
				selected: true 
			});
		},
		selectChanged: function() {
			var selected = this.model.get('selected');

			if(selected) {
				$(this.el).addClass('form-row-selected');
				return;
			}

			$(this.el).removeClass('form-row-selected');
		}
	});

	return RowView;
});


