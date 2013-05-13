define([
	'jquery', 'backbone', 
	'm/ColumnModel',
	'v/FieldView'

], function($, Backbone, ColumnModel, FieldView ) {
		
	function calculateWidth (width) {
		var widthAttr = (width <= 1) ? width * Configs.canvas.width : width;
		return widthAttr;
	}

	var ColumnView = Backbone.View.extend({
		tagName: 'div',
		className: 'form-column',
		events: {
			'click': 'onSelect'
		},
		initialize: function () {
			this.model.bind('change:content', this.contentUpdated, this);
			this.model.bind('change:width', this.widthUpdated, this);
			this.model.bind('change:selected', this.selectedUpdated, this);

			this.model.set({
				selected: false
			}, {silent: true});
			
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
			});

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
		onSelect: function() {
			this.parent.parent.clearCellSelect();	

			this.model.set({
				selected: true	
			});
		},
		selectedUpdated: function() {
			if(this.model.get('selected') == true) {
				this.$el.addClass('form-column-selected');
			} else {
				this.$el.removeClass('form-column-selected');
			}

			var link = ['#cell', 
				this.parent.model.get('index'),
				this.model.get('index')
			].join('/');

			Backbone.history.navigate(link, {trigger: true});
		},
		clearView: function() {
			this.contentView.remove();	
			this.$el.empty();
		}
	});

	return ColumnView;
});
