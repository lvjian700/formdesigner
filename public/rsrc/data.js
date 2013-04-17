define([
], function() {
	var rowsConfig = [{
		index: 0,
		layout: 'fit',
		columns: [{
			index: 0,
			width: 1,
			content: {
				id: 'newsTitle_field',
				name: 'newsTitle',
				label: '标题',
				type: 'text',
				value: '',
				required: true
			}
		}]
	}, {
		index: 1,
		layout: 'fit',
		columns: [{
			index: 0,
			width: 0.33,
			content: {
				id: 'creater_field',
				name: 'creater',
				label: '作者',
				type: 'select',
				value: '',
				required: true
			}
		}, {
			index: 1,
			width: 0.33,
			content: {
				id: 'createTime_field',
				name: 'createTime',
				label: '创建时间',
				type: 'date',
				value: '',
				required: true
			}
		}, {
			index: 2,
			width: 0.33,
			content: {
				id: 'videoLength_field',
				name: 'videoLength',
				label: '视频长度',
				type: 'timelength',
				value: '',
				required: false
			}
		}]
	}, {
		index: 2,
		layout: 'fit',
		columns: [{
			index: 0,
			width: 0.33,
			content: {
				id: 'reporter_field',
				name: 'reporter',
				label: '记者',
				type: 'text',
				value: '',
				required: false
			}
		}, {
			index: 1,
			width: 0.33,
			content: {
				id: 'camerist_field',
				name: 'camerist',
				label: '摄像',
				type: 'text',
				value: '',
				required: false
			}
		}, {
			index: 2,
			width: 0.33,
			content: {
				id: 'assistant_field',
				name: 'assistant',
				label: '参与人员',
				type: 'text',
				value: '',
				required: false
			}
		}]
	}, {
		index: 3,
		layout: 'fit',
		columns: [{
			index: 0,
			width: 0.33,
			content: {
				id: 'newsKeyword_field',
				name: 'newsKeyword',
				label: '关键字',
				type: 'text',
				value: '',
				required: false
			}
		}, {
			index: 1,
			width: 0.33,
			content: {
				id: 'dubMan_field',
				name: 'dubMan',
				label: '配音',
				type: 'text',
				value: '',
				required: false
			}
		}, {
			index: 2,
			width: 0.33,
			content: {
				id: 'batMan_field',
				name: 'batMan',
				label: '通讯员',
				type: 'text',
				value: '',
				required: false
			}
		}]
	}];
	
	var formConfig = {
		id: 'news-form-index',
		defaults: {
			layout: 'fit',
			labelWidth: 80, //px
		},
		rows: rowsConfig
	};

	return formConfig;	
});


