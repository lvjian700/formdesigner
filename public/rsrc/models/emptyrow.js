define([
], function() {
	function emptyRowJson (rowIndex) {
		var rowsCfg = {
			index: rowIndex,
			layout: 'fit',
			columns: [{
				index: 0,
				width: 0.33,
				content: {
					id: 'creater_field',
					name: 'creater',
					label: '作者',
					type: 'text',
					value: '',
					required: true,
					used: true
				}
			}, {
				index: 1,
				width: 0.33,
				content: {
					id: 'createTime_field',
					name: 'createTime',
					label: '创建时间',
					type: 'text',
					value: '',
					required: true,
					used: true
				}
			}, {
				index: 2,
				width: 0.33,
				content: {
					id: 'videoLength_field',
					name: 'videoLength',
					label: '视频长度',
					type: 'text',
					value: '',
					required: false,
					used: true
				}
			}]
		};

		return rowsCfg;
	}
	
	return emptyRowJson;
});



