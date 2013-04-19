define([
	'jquery',
	'underscore',
	'backbone',
	'm/FieldModel'
], function($, _, Backbone, FieldModel) {
	
	var PropertyFormView = Backbone.View.extend({
		el: '#prop-form',
		events: {
			'change': 'updateModel'
		},
		initialize: function() {
		},
		render: function() {
			this.nameInput = this.$('#ipt-name');
			this.labelInput = this.$('#ipt-label');
			this.typeSelect = this.$('#sel-type');
			this.requiredCheck = this.$('#ck-required');

			return this.el;
		},
		loadData: function(model) {
			this.fieldModel = model;
			
			this.nameInput.val(this.fieldModel.getName());
			this.labelInput.val(this.fieldModel.getLabel());
			this.typeSelect.val(this.fieldModel.get('type'));

			var required = this.fieldModel.isRequired();
			this.requiredCheck.attr('checked', required);
		},
		updateModel: function() {
			var name = this.nameInput.val();
			this.fieldModel.setName(name);

			var label = this.labelInput.val();
			this.fieldModel.setLabel(label);

			var type = this.typeSelect.val();
			this.fieldModel.set({type: type});

			var required = this.requiredCheck.attr('checked');
			this.fieldModel.setRequired(required);
		}
	});

	return PropertyFormView;
});


