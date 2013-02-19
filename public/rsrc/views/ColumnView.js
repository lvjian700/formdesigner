define([
	'jquery', 'backbone', 
	'm/ColumnModel',
	'v/FieldView'

], function($, Backbone, ColumnModel, FieldView ) {

	var ColumnView = Backbone.View.extend({
		tagName: 'div',
		events: {

		},

		initialize: function () {
			var colspan = this.model.get('colspan');
			var cls = 'col-' + colspan;
			this.$el.addClass(cls);

			this.model.bind('change:content', this.contentUpdated, this);
			this.model.bind('change:colspan', this.colspanUpdated, this);
			
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
		},
		colspanUpdated: function(e) {
			var preview = this.model.previous('colspan');
			var preCls = 'col-' + preview;
			
			var colspan = this.model.get('colspan');
			var cls = 'col-' + colspan;

			this.$el.addClass(cls).removeClass(preCls);
		}
	});

	return ColumnView;
});
