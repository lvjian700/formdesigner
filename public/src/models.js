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
	}
});

// emit event.
var SelectFieldModel = FieldModel.extend({
	defaults: function() {
		return {
			id: '',
			name: '',
			label: '',
			type: 'select',
			value: '',// 可能是object
			required: false
		};
	}
});

var ColumnModel = Backbone.Model.extend({ 
	
});


var RowModel = Backbone.Model.extend({

});

var RowList = Backbone.Collection.extend({
});

var FormModel = Backbone.Model.extend({
	initialize: function() {
		return {
			id: '',
			defaults: {
				layout: 'fit',
				labelWidth: '80',
			}
		}	
	}
});

var FormView = Backbone.View.extend({
	
});


