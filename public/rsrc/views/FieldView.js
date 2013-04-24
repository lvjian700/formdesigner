define([
	'underscore', 'backbone', 
	'./Core', 
	'text!tmpl/text_field.html'

], function(_, Backbone, Core, tmpl) {

	var FieldView = Backbone.View.extend({
		tagName: 'div',
		className: 'form-cell',
		template: Core.read_tmpl(tmpl),

		events: {
			'change input': "onChanged"
		},
		/*
		 * name changed, 需要改变input&label的id
		 * 改变input中的name
		 * */
		initialize: function() {
			this.model.bind('change', this.modelUpdated, this);		
		},
		render: function() {
			var json = this.model.toJSON();
			var html = this.template(json);
		
			this.$el.html(html);
			this.cellBody =  this.$el;
			this.label = this.$('label');
			this.inputTag =  this.$('input');
			
			this.onRender();

			if(this.model.isUsed() == false) {
				this.$el.hide();
			}
			this.requiredUpated();

			return this;
		},
		getTemplate: function() {
			var el = this.render().el;
			return $('<p></p>').append(el).html();
		},
		modelUpdated: function() {
			this.nameUpdated();
			this.valueUpdated();

			var label = this.model.getLabel();
			this.label.text(label);

			if(this.model.isUsed() == true) {
				this.$el.show();
			} else {
				this.$el.hide();
			}

			this.requiredUpated();
		},
		requiredUpated: function() {
			if(this.model.isRequired() == true) {
				this.label.addClass('required');
			} else {
				this.label.removeClass('required');
			}
		},
		nameUpdated: function() {
			var id = this.model.get('id');
			var name = this.model.getName();

			this.label.attr('for', id);

			this.inputTag.attr('id', id)
				.attr('name', name);
		},
		valueUpdated:	function() {
			var value = this.model.getValue();
			this.inputTag.val(value);
		},
		onChanged: function(e) {
			var val = this.inputTag.val();	

			this.model.set({
					value: val
				}, {
					silent: true
				});
		},
		onRender: function() {
		}
	});
	
	Fields.reg('text', FieldView);

	return FieldView;
});
