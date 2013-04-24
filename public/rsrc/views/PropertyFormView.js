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
			this.widthInput = this.$('#ipt-width');
			this.nameInput = this.$('#ipt-name');
			this.labelInput = this.$('#ipt-label');
			this.typeSelect = this.$('#sel-type');
			this.requiredCheck = this.$('#ck-required');

			return this.el;
		},
		loadData: function(field, column) {
			this.fieldModel = field;
			this.columnModel = column

			this.widthInput.val(this.columnModel.get('width'));
			
			this.nameInput.val(this.fieldModel.getName());
			this.labelInput.val(this.fieldModel.getLabel());
			this.typeSelect.val(this.fieldModel.get('type'));

			var required = this.fieldModel.isRequired();
			this.requiredCheck.attr('checked', required);
		},
		updateModel: function() {
			var width = this.widthInput.val();
			var numberWidth = parseFloat(width);
			this.columnModel.set({width: numberWidth});

			var name = this.nameInput.val();
			this.fieldModel.setName(name);

			var label = this.labelInput.val();
			this.fieldModel.setLabel(label);

			var type = this.typeSelect.val();
			this.fieldModel.set({type: type});

			var required = this.requiredCheck.attr('checked');
			this.fieldModel.setRequired(required);
		},
		reset: function() {
			this.fieldModel = undefined;
			this.columnModel = undefined;
			this.$el[0].reset();
		}
	});

	return PropertyFormView;
});


