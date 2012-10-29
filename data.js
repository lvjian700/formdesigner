//FormCanvas
var form = {
	id: '',
	//RowsCollection
	rows: [{//Row
		index: 0,
		columnCount: 3,
		layout: 'fit,width'
		//RowCellCollection
		columns: [{//RowCell
			index: 0,
			colspan: 1,
			content: {//Field
				id: '{{name}}_id',
				name: 'property',
				type: 'text|password|number|user|time-length|date',
				required: false,
				min-length: none|4,
				max-length: none|16				
			}
		}]
	}]
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
		min-length: 'none',
		max-length: 'none',
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



