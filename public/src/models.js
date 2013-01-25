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
	},
	initialize: function() {
	}
});

var ColumnModel = Backbone.Model.extend({ 
	defaults: function() {
		return {
			index: 0,
			colspan: 1,
			content: {
				id: '',
				name: '',
				label: '',
				type: 'text',
				value: '',// 可能是object
				required: false
			}
		};
	},
	initialize: function() {
		var c_json = this.get('content');
		this.content = new FieldModel(c_json);
		this.content.parent = this;

		var json = this.content.toJSON();
		this.set({
			content: json
		}, { silence: true });
	},
	setContent: function(fieldModel) {
		this.content = fieldModel;
		this.content.parent = this;

		var json = this.content.toJSON();
		this.set({
			content: json
		});
	},
	getContent: function() {
		return this.content;
	}
});

var ColumnCollection = Backbone.Collection.extend({
	model: ColumnModel,
	comparator: function() {
		return this.get('index');
	}
});

var RowModel = Backbone.Model.extend({
	defaults: function() {
		return {
			index: 0,
			columnCount: 3,
			layout: 'fit',
			columns: []
		};
	},
	initialize:	function() {
		var c_json = this.get('columns');
		this.columns = new ColumnCollection(c_json);
		this.columns.parent = this;

		var json = this.columns.toJSON();
		this.set({
			columns: json
		}, { silence: true });
	},
	setColumns: function(columnCollection) {
		this.columns = columnCollection;
		this.columns.parent = this;

		var json = this.columns.toJSON();
		this.set({
			columns: json
		});
	},
	getColumns: function() {
		return this.columns;
	}
});

var RowCollection = Backbone.Collection.extend({
	model: RowModel,
	comparator: function() {
		return this.get('index');
	}
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


