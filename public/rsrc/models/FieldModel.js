define(['backbone'], function() {

	var FieldModel = Backbone.Model.extend({
		defaults: function() {
			return {
				id: '',
				name: '',
				label: '',
				type: 'text',
				value: '',// 可能是object
				required: false,
				used: true
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
		getLabel: function() {
			return this.get('label');
		},
		setLabel: function(label) {
			this.set({label: label});
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
		isUsed: function() {
			return this.get('used');
		},
		setUsed: function(used) {
			this.set({used: used});
		},
		toPlain: function(options){
			var required = this.isRequired() ? 1 : 0;
			var used = this.isUsed() ? 1 : 0;

			var array = [
				options.index, this.getName(), this.get('label'), 
				options.columnIndex, options.rowIndex, options.width,
				required, used];	

			var plainConfig = array.join(',');
			plainConfig = plainConfig + ";";

			return plainConfig;
		}
	});

	return FieldModel;
});
