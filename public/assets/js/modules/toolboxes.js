// modules/toolboxes.js
var ToolboxItem = Backbone.Model.extend({
	initialized: function() {
		return {
			text: '输入框',
			iconClass: '',
			data-type:'input-text'
		}
	}
});


var ToolboxCollection = Backbone.Collection.extend({
	model: ToolboxItem,
	comparator: function(item) {
		return item.get('data-type');
	}
});


var ToolboxGroup = Backbone.Model.extend({
	initialized: function() {
		id: 'toolbox-forms',
		title: 'Form tools',
		items: []
	}
});

var ToolboxGroupCollection = Backbone.Collection.extend({
	model: ToolboxGroup,
	comparator: function(item) {
		return item.get('id');
	}
});