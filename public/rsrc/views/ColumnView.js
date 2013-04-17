define([
	'jquery', 'backbone', 
	'm/ColumnModel',
	'v/FieldView'

], function($, Backbone, ColumnModel, FieldView ) {
		
	function calculateWidth (width) {
		var widthAttr = (width <= 1) ? width * 900 : width;

		return widthAttr;
	}

	var ColumnView = Backbone.View.extend({
		tagName: 'div',
		className: 'form-column',
		events: {

		},

		initialize: function () {
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

			var width = this.model.get('width');
			this.$el.css({
				width: calculateWidth(width)
			})

			return this;
		},
		getTemplate: function() {
			var el = this.render().el;
			return $('<p></p>').append(el).html();
		},
		widthUpdated: function(e) {
			var width = this.model.get('width');
			this.$el.css({
				width: calculateWidth(width) 
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
