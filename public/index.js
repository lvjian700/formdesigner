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
	setValue: function(value) {
		this.set({value: value});	
	},
	getValue: function() {
		this.get('value');
	},
	setRequired: function(required) {
		this.set({required: required});	
	},
	isRequired: function() {
		return this.get('required');
	}
});

var field = new FieldModel;
field.on('change:required', function(model, required) {
	console.log('old value:' + model.previous('required'));
	console.log('new value:' + required);
});

field.setRequired(true);

// emit event.
var FieldView = Backbone.View.extend({
	tagName: 'div',
	className: 'cell',
	event: {
	},
	
	initialize: function() {
	},
	render: function() {
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

$(function() {
});
