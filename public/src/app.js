$(function(){
	var rowsConfig = [{
		index: 0,
		columnCount: 1,
		layout: 'fit',
		columns: [{
			index: 0,
			colspan: 1,
			content: {
				id: 'title_field',
				name: 'title',
				label: '标题',
				type: 'text',
				value: '',
				required: false
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
				id: 'author_field',
				name: 'author',
				label: '作者',
				type: 'text',
				value: '',
				required: false
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
				required: false
			}
		}, {
			index: 2,
			colspan: 1,
			content: {
				id: 'timeLength_field',
				name: 'timeLength',
				label: '时间长度',
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
				id: 'author2_field',
				name: 'author',
				label: '作者',
				type: 'text',
				value: '',
				required: false
			}
		}, {
			index: 1,
			colspan: 1,
			content: {
				id: 'createTime2_field',
				name: 'createTime',
				label: '创建时间',
				type: 'text',
				value: '',
				required: false
			}
		}, {
			index: 2,
			colspan: 1,
			content: {
				id: 'timeLength2_field',
				name: 'timeLength',
				label: '时间长度',
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
