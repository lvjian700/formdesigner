define([
	'jquery', 'backbone', 
	'm/ColumnModel',
	'v/FieldView'

], function($, Backbone, ColumnModel, FieldView ) {

	var ColumnView = Backbone.View.extend({
		tagName: 'div',
		className: 'column',
		events: {

		},

		initialize: function () {
			var width = this.model.get('width');
			var widthAttr = width <= 1 ? width * 100 + '%' : width + 'px';
			this.$el.css({
				width: widthAttr
			})

			this.model.bind('change:content', this.contentUpdated, this);
			this.model.bind('change:width', this.widthUpdated, this);
			
			var fieldModel = this.model.getContent();

			this.contentView = Fields.create({
				model: fieldModel
			});
			this.contentView.parent = this;
		},
		render: function () {
			var contentEl = this.contentView.render().el;
			this.$el.html(contentEl);

			return this;
		},
		getTemplate: function() {
			var el = this.render().el;
			return $('<p></p>').append(el).html();
		},
		widthUpdated: function(e) {
			var width = this.model.get('width');

			var widthAttr = width <= 1 ? width * 100 + '%' : width + 'px';

			this.$el.css({
				width: widthAttr
			});
		},
		contentUpdated: function(e) {
			this.clearView();
			
			var fieldModel = this.model.getContent();
			this.contentView = new FieldView({
				model: fieldModel
			});
			this.contentView.parent = this;

			this.render();
		},
		clearView: function() {
			this.contentView.remove();	
			this.$el.empty();
		}
	});

	return ColumnView;
});
