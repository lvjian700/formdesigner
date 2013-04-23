define([
	'backbone', 'underscore',
	'm/FieldModel',
	'm/ColumnModel', 'm/ColumnCollection',
	'm/RowModel', 'm/RowCollection',
	'm/FormModel'
], function(Backbone, _, FieldModel, 
	ColumnModel, ColumnCollection, RowModel, RowCollection,
	FormModel) {


	function parse2Fields (plain) {
		var parts = plain.split(';');
		parts.pop();
		var first = parts[0];

		if(first.indexOf(',') != -1) {
			return parts;
		}

		var fields = _.rest(parts);
		return fields;
	}

	function parse2Item(text) {
		var p = text.split(',');
		var required = p[6] == '1';
		var used = p[7] == '1';

		return {
			index: parseInt(p[0]),
			name: p[1],
			label: p[2],
			rowIndex: parseInt(p[3]),
			columnIndex: parseInt(p[4]),
			width: parseInt(p[5]),
			required: required,
			used: used
		}
	}

	function fields2Json(fields) {
		var rows = new Array(100);
		
		var rowIndex = -1;
		var columnCount = 0;

		for(var i = 0; i < fields.length; i++) {
			var item = fields[i];
			var json = parse2Item(item); 

			// 新建行
			if(rowIndex < json.rowIndex) {
				var row = {
					index: json.rowIndex,
					layout: 'fit',
					selected: false,
					columns: []
				}
			
				rowIndex = json.rowIndex;	
				//补足undefined
				rows[rowIndex] = row;
			}
			
			// 创建列
			var widthPrecent = json.width / 100.0;
			var column = {
				index: json.columnIndex,
				width: widthPrecent,
				selected: false,
				content: {
					id: json.name + '_field',
					name: json.name,
					label: json.label,
					type: 'text',
					value: '',
					required: json.required,
					used: json.used
				}
			}

			// 追加列
			var currentRow = rows[rowIndex];
			currentRow.columns.push(column);
		}
		
		var ret = _.without(rows, [undefined]);

		return ret;
	}
	
	function convert (plain) {
		var fields = parse2Fields(plain);
		var arrayRows = fields2Json(fields);
		
		return arrayRows;
	}

	return {
		parse2Item: parse2Item,
		parse2Fields: parse2Fields,
		fields2Json: fields2Json,
		convert: convert 
	};
});


