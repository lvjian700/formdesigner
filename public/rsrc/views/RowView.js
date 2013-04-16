define([
	'jquery',
	'underscore',
	'backbone',
	'm/RowModel',
	'v/ColumnView'
], function($, _, Backbone, RowModel, ColumnView ) {

	var RowView = Backbone.View.extend({
		tagName: 'div',
		className: 'row',
		events: {
			'click': 'onSelect'
		},
		initialize: function() {
			var layout = this.model.get('layout');
			this.$el.addClass(layout);

			if(this.model.get('selected') == true) {
				this.$el.addClass('row-selected');
			}

			this.columnModels = this.model.getColumns();
			this.columnViews = [];
				
			this.columnModels.forEach(function(colModel) {
				var colView = new ColumnView({
					model: colModel
				});
				colView.parent = this;      
				this.columnViews.push(colView);
			}, this);

			this.model.bind('change:selected', this.selectChanged, this);
		},
		render: function() {
			_.each(this.columnViews, function(colView) {
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
				col.remove();
			}, this);

			this.$el.empty();
		},
		onSelect: function() {
			var currentSelected = this.model.get('selected');

			this.model.set({
				selected: !currentSelected
			});
		},
		selectChanged: function() {
			var selected = this.model.get('selected');

			if(selected) {
				$(this.el).addClass('row-selected');
				return;
			}

			$(this.el).removeClass('row-selected');
		}
	});

	return RowView;
});


