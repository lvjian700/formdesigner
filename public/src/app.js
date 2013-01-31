$(function(){
	var rowsConfig = [{
		index: 0,
		columnCount: 1,
		layout: 'fit',
		columns: [{
			index: 0,
			colspan: 1,
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
	}, {
		index: 2,
		columnCount: 3,
		layout: 'fit',
		columns: [{
			index: 0,
			colspan: 1,
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
			colspan: 1,
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
			colspan: 1,
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
		columnCount: 3,
		layout: 'fit',
		columns: [{
			index: 0,
			colspan: 1,
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
			colspan: 1,
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
			colspan: 1,
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

	var model = new FormModel(formConfig);
	var view = new FormView({model:model});
	var el = view.render().el;
	$('#formcanvas').append(el);
});
