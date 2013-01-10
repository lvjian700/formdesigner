//FormCanvas
var Form = {
	id: '',
	//RowsCollection
	defaults: {
		layout: 'fit',
		label-width: '80'
	},
	rows: [{//Row
		index: 0,
		columnCount: 3,
		layout: 'fit,width'
		//RowCellCollection
		columns: [{//RowCell
			index: 0,
			colspan: 1,
			content: {//Field
				id: '{{property}}_field',
				name: '{{property}}',
				label: '标题',//这个字段值的优先级高于字典
				type: 'text|password|number|user|time-length|date',
				value: '',
				required: false,
			}
		}]//end columns

	}]//end rows
};

var CanvasRow = function(options) {

};

var CanvasCell = function(options) {

};

var Field = function(options) {
	
	if(typeof options === 'undefined') {
		throw 'The options can not be undefined.';
	}
	
	if(typeof options[name] === 'undefined') {
		throw 'The options must has [name] property';
	}
	
	var opt = {
		type: 'text',
		required: false,
		value: '',
		place-holder: 'none'
	};
	
	$.extend(opt, options);
	$.extend(Field.prototype, opt);
};


// 
var ToolboxGroups = [{ // ToolboxGroup
	title: 'Form Tools', 
	items: [{//ToolboxItem
		text: '输入框',
		iconClass: '', 
		data-type: 'input-text',
		getDragHelper: function() {
			
		}
	}, {
		text: '选择框',
		iconClass: 'drop-box-icon', 
		data-type: 'drop-box'
	}]
}, {
	title: 'Layout Tools'
	items: []
}];



