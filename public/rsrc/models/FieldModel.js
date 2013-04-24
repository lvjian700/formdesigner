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
		}
	});

	return FieldModel;
});
