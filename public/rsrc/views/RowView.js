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

			this.model.bind('change:selected', this.selectChanged, this);
            this.columnModels.bind('add', this.render, this);
            this.columnModels.bind('remove', this.render, this);
		},
		render: function() {
            if(this.columnViews == undefined || this.columnViews.length > 0) {
                this.clearView();
            }

			this.columnViews = [];

			this.columnModels.forEach(function(colModel) {
				var colView = new ColumnView({
					model: colModel
				});

				colView.parent = this;      
				this.columnViews.push(colView);


				var colEl = colView.render().el;
				this.$el.append(colEl);


			}, this);

            
			return this;
		},
		getTemplate: function() {
			var el = this.render().el;
			return $('<p></p>').append(el).html();
		},
		clearView: function() {
			_.each(this.columnViews, function(col) {
				col.undelegateEvents();
				col.remove();
			}, this);

			this.$el.empty();
		},
		onSelect: function() {
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


