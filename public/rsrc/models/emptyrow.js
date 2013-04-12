define([
], function() {
	function emptyRowJson (rowIndex) {
		var rowsCfg = {
			index: rowIndex,
			columnCount: 3,
			layout: 'fit',
			columns: [{
				index: 0,
				colspan: 1,
				content: {
					id: 'creater_field',
					name: 'creater',
					label: '作者',
					type: 'text',
					value: '',
					required: true
				}
			}, {
				index: 1,
				colspan: 1,
				content: {
					id: 'createTime_field',
					name: 'createTime',
					label: '创建时间',
					type: 'text',
					value: '',
					required: true
				}
			}, {
				index: 2,
				colspan: 1,
				content: {
					id: 'videoLength_field',
					name: 'videoLength',
					label: '视频长度',
					type: 'text',
					value: '',
					required: false
				}
			}]
		};

		return rowsCfg;
	}
	
	return emptyRowJson;
});



