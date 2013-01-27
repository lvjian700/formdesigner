describe("测试ColumnModel", function() {

	var model = null;

	beforeEach(function() {
		model = new ColumnModel();
	});

	afterEach(function() {
		model = null;
	});

	it("默认数据必须是这样:{index: 0, colspan:1, content: FieldModel}",
		function() {
			expect(model.get('index')).toBe(0);
			expect(model.get('colspan')).toBe(1);
			expect(model.constructor === ColumnModel);

			var content = model.get('content');
			expect(content.constructor === FieldModel);
		});
	
	it("嵌套Model的序列化和json格式一致",
		function() {
			var json = model.toJSON();
			expect(json).toEqual({
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
			});

		});

	it("测试setContent & getContent",
		function() {
			var newField = new FieldModel({
				id:'title_field',
				name: 'title',
				label: 'Title'
			});
			
			var changedSpy = jasmine.createSpy('changedSpy');
			model.bind('change:content', changedSpy);

			model.setContent(newField);
			expect(changedSpy).toHaveBeenCalled();

			var ret = model.getContent();
			expect(ret).toBe(newField);

			var json = model.toJSON();
			expect(json).toEqual({
				index: 0,
				colspan: 1,
				content: {
					id:'title_field',
					name: 'title',
					label: 'Title',
					type: 'text',
					value: '',// 可能是object
					required: false
				}
			});
		});

	it('使用json直接初始化ColumnModel', 
		function() {
			var config = {
				index: 0,
				colspan: 1,
				content: {
					id:'title_field',
					name: 'title',
					label: 'Title',
					type: 'text',
					value: '',// 可能是object
					required: false
				}
			};

			var column = new ColumnModel(config);
			var json = column.toJSON();
			expect(json).toEqual(config);

			var content = column.getContent();
			expect(content.constructor === FieldModel);
			expect(content.parent === column);
		});

});

describe('测试ColumnView', function() {
	var model, view = null;	

	beforeEach(function() {
		$('body').append('<div id="bbd"></div>');
		model = new ColumnModel();
		view = new ColumnView({
			model: model
		});
	});

	afterEach(function() {
		view.remove();
		$('#bbd').remove();
	});


	describe('尚未渲染到dom', function() {

		it('存在contentView, 并且contentView.parent为当前ColumnView',
			function() {
				expect(view.contentView).toBeDefined();
				expect(view.contentView.parent).toBeDefined();

				expect(view.contentView.constructor).toEqual(FieldView);
			});
		
		it('创建column div需要包含.col-*的css样式',
			function() {
				var el = view.render().el;
				var jel = $(el);	
				
				expect(jel).toHaveClass('col-1');
				expect(jel).toContain('div.cell');
			});

	});


	describe('渲染到dom后', function() {
		beforeEach(function() {
			var renderedEl = view.render().el
			$('#bbd').append(renderedEl);
		});

		it('更新model.colspan后, 调用colspanUpdate更新class',
			function() {
				var el = view.render().el;
				var jel = $(el);	
				
				expect(jel).toHaveClass('col-1');
				expect(jel).toContain('div.cell');
				
				model.set({colspan: 2});
				expect(view.$el).toHaveClass('col-2');
				expect(view.$el).toContain('div.cell');
			});

		it('更新model.content后,调用contentUpdated方法重绘content',
			function() {
				var fieldModel = new FieldModel({
						id:'title_field',
						name: 'title',
						label: 'Title',
						type: 'text',
						value: '',// 可能是object
						required: false
					});

				view.model.setContent(fieldModel);

				var el = view.render().el;
				var jel = $(el);	
				
				expect(jel).toHaveClass('col-1');
				expect(jel).toContain('div.cell');

				var fieldView = view.contentView;
				expect(fieldView.constructor).toEqual(FieldView);
				expect(fieldView.parent).toBe(view);
				
				var label_for = fieldView.label.attr('for');
				expect(label_for).toEqual('title_field');
				
				var input_id = fieldView.inputTag.attr('id');
				expect(input_id).toEqual('title_field');

				var input_name = fieldView.inputTag.attr('name');
				expect(input_name).toEqual('title');
			});
		
	});
});


describe('测试ColumnCollection', function() {


	describe('使用[]创建ColumnCollection', function() {
		var list = null;
		beforeEach(function() {
			list = new ColumnCollection();
		});
		it("使用[]可以构建空的Collection", function() {
			var empty_list = new ColumnCollection([]);
			expect(empty_list).toBeDefined();
			expect(empty_list.models).toBeDefined();
			expect(empty_list.models.length).toBe(0);
			expect(empty_list.length).toBe(0);
		});

		it("空Collection可以序列化成[]", function() {
			var json = list.toJSON();
			expect(json).toEqual([]);
		});
	});

	describe('使用fullconfig创建3列Collection', function() {
		var config = null;

		beforeEach(function() {
			config =  [{
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
			}];

			columns = new ColumnCollection(config);
		});

		it("使用config始化Collection数量正确", function() {
			expect(columns.length).toBe(3);
		});

		it("序列化的json匹配contructor参数", function() {
			var json = columns.toJSON();
			expect(json).toEqual(config);
		})

		it("collection中都是ColumnModel对象", function() {
			columns.forEach(function(item) {
				expect(item.constructor).toEqual(ColumnModel);
			});
		});
	});

});


describe('测试RowModel', function() {
	var config = null;
	var collection = null;

	beforeEach(function() {
		config =  [{
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
		}];

		collection = new ColumnCollection(config);
	});

	afterEach(function() {

	});

	describe('默认构造行为', function() {
		var model = null;

		beforeEach(function() {
			model = new RowModel();
		});

		afterEach(function() {
			model = null;
		});

		it("默认数据必须是这样:{index: 0, columnCount:3, layout: 'fit',  columns: []}",
			function() {
				expect(model.constructor === RowModel);
				expect(model.get('index')).toBe(0);
				expect(model.get('columnCount')).toBe(3);
				expect(model.get('layout')).toBe('fit');

				var columns = model.get('columns');
				expect(columns.constructor === Array);
			});

		it("测试setColumns & getColumns", function() {
			var changedSpy = jasmine.createSpy('chanagedSpy');	
			model.bind('change:columns', changedSpy);

			model.setColumns(collection);
			expect(changedSpy).toHaveBeenCalled();

			var ret = model.getColumns();
			expect(ret).toBe(collection);
			expect(ret.toJSON()).toEqual(config);

			var json = model.toJSON();
			expect(json).toEqual({
				index: 0,
				columnCount: 3,
				layout: 'fit',
				columns: config
			});

		});

	});
	
	describe('full parameters构造', function() {
		var fullConfig = null;
		var model = null;
	
		beforeEach(function() {
			fullConfig = {index: 1, columnCount:3, layout: 'fit',  
				columns: config };	

			model = new RowModel(fullConfig); 	
		});

		it('确定初始化后，各项参数正确', function() {
			expect(model.get('index')).toEqual(1);
			expect(model.get('columnCount')).toEqual(3);
			expect(model.get('layout')).toEqual('fit');
			expect(model.get('columns')).toEqual(config);
			
			var cols = model.getColumns();
			expect(cols.constructor).toEqual(ColumnCollection);
			expect(cols.parent).toBe(model);
			expect(cols.length).toEqual(3);
		});
		
		it('columns中都是FieldModel对象', function() {
			var columns = model.getColumns();
			columns.forEach(function(item) {
				expect(item.constructor).toEqual(ColumnModel);

				var field = item.getContent();
				expect(field.constructor).toEqual(FieldModel);
			});
		});
	});
});

describe('测试RowCollection', function() {
	
	describe('使用fullconfig创建RowCollection', function() {
		var fullConfig = null;
		var full = null;

		beforeEach(function() {
			fullConfig = [{
				index: 0,
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
			}]; // end full config

			full = new RowCollection(fullConfig);
		});// end beforeEach
		
		it('构造基本结构正确', function() {
			expect(full.constructor).toEqual(RowCollection);	
			expect(full.length).toBe(2);
		});

		it('每个item都是item对象,并且每个item.getColumns都是ColumnCollection',
			function() {
				
				full.forEach(function(item) {
					expect(item.constructor).toEqual(RowModel);

					var columns = item.getColumns();
					expect(columns.constructor).toEqual(ColumnCollection);
					expect(columns.length).toBe(3);
				});

			});

		it('RowCollection下的ColumnCollection的item都是ColumnModel', function() {
			
			full.forEach(function(item) {
				var columns = item.getColumns();
				expect(columns.length).toBe(3);

				columns.forEach(function(col) {
					expect(col.constructor).toEqual(ColumnModel);	
				});
			});
		});
	});// end fullconfig describe

});

describe('测试FormModel', function() {

	var model = null;
	var rowsConfig = null;
	var formConfig = null;

	beforeEach(function() {
		model = new FormModel();

		rowsConfig = [{
			index: 0,
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
		}];

		formConfig = {
			id: 'news-form',
			defaults: {
				layout: 'fit',
				labelWidth: 80, //px
			},
			rows: rowsConfig
		};
	});

	afterEach(function() {
		model = null;
		rowsConfig = null;
		formConfig = null;
	});

	describe('使用默认构造方法构造', function() {

		it("默认数据必须是这样:{id:'', defaults:{layout: 'fit',labelWidth: '80',rows: []}",
			function() {

				expect(model.constructor === FormModel);
				expect(model.get('id')).toEqual('');
				expect(model.get('defaults')).toEqual({
					layout: 'fit',
					labelWidth: 80
				});
				expect(model.get('rows')).toBeDefined();

				var rows = model.get('rows');
				expect(rows.constructor === Array);
			});
		

		it("测试setRows & getRows", function() {
			var changedSpy = jasmine.createSpy('chanagedSpy');	
			model.bind('change:rows', changedSpy);
			
			var collection = new RowCollection(rowsConfig);
			model.setRows(collection);
			expect(changedSpy).toHaveBeenCalled();

			var ret = model.getRows();
			expect(ret.constructor).toEqual(RowCollection);
			expect(ret).toBe(collection);
		});
	});

	describe('使用full config初始化', function() {
		var full = null;
		beforeEach(function() {
			full = new FormModel(formConfig);
		});

		afterEach(function() {
			full = null;
		});
	
		it('确定初始化后，各项参数正确', function() {
			expect(full.constructor === FormModel);
			expect(full.get('id')).toEqual('news-form');
			expect(full.get('defaults')).toEqual({
				layout: 'fit',
				labelWidth: 80
			});
			expect(full.get('rows')).toBeDefined();

			var rows = full.get('rows');
			expect(rows.constructor === Array);
			expect(rows.length).toBe(1);

		});

		it('getRows能获取RowCollection对象', function() {
			var rows = full.getRows();
			expect(rows).toBeDefined();
			expect(rows.length).toBe(1);
			expect(rows.constructor).toEqual(RowCollection);
		});

		it('rows中都是RowModel对象', function() {
			var rows = full.getRows();
			expect(rows.length).toBe(1);

			rows.forEach(function(item) {
				expect(item.constructor).toEqual(RowModel);

				var columns = item.getColumns();
				expect(columns.constructor).toEqual(ColumnCollection);
				expect(columns.length).toBe(3);

				var col = columns.at(0);
				expect(col).toBeDefined();
				expect(col.constructor).toEqual(ColumnModel);

				var field = col.getContent();
				expect(field).toBeDefined();
				expect(field.constructor).toEqual(FieldModel);
			});
		});
	});
});


