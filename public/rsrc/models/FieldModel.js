define(['backbone'], function() {

	var FieldModel = Backbone.Model.extend({
		defaults: function() {
			return {
				id: '',
				name: '',
				label: '',
				type: 'text',
				value: '',// 可能是object
				required: false
			};
		},
		initialize: function() {
		},
		setName: function(name) {
			this.set({
				id: name + '_field',
				name: name
			});
		},
		getName: function() {
			return this.get('name');
		},
		setValue: function(value) {
			this.set({value: value});	
		},
		getValue: function() {
			return this.get('value');
		},
		getDisplayValue: function() {
			return this.get('value');
		},
		setRequired: function(required) {
			this.set({required: required});	
		},
		isRequired: function() {
			return this.get('required');
		},
		setRequired: function(required) {
			this.set({required: required});
		},
		toPlain: function(options){
			var required = this.isRequired() ? 1 : 0;
			var array = [
				options.index, this.getName(), this.get('label'), 
				options.columnIndex, options.rowIndex, options.width,
				required, 1];	

			var plainConfig = array.join(',');
			plainConfig = plainConfig + ";";

			return plainConfig;
		}
	});

	return FieldModel;
});
