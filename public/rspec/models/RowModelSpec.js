define([
	'm/FieldModel',
	'm/ColumnModel',
	'm/ColumnCollection',
	'm/RowModel',
], function(FieldModel,
    ColumnModel,
    ColumnCollection,
    RowModel) {
	
	return describe('测试RowModel', function() {
		var config = null;
		var collection = null;

		beforeEach(function() {
			config =  [{
				index: 0,
				width: 0.33,
				selected: false,
				content: {
					id: 'author_field',
					name: 'author',
					label: '作者',
					type: 'text',
					value: '',
					required: false,
					used: true
				}
			}, {
				index: 1,
				width: 0.33,
				selected: false,
				content: {
					id: 'createTime_field',
					name: 'createTime',
					label: '创建时间',
					type: 'text',
					value: '',
					required: false,
					used: true
				}
			}, {
				index: 2,
				width: 0.33,
				selected: false,
				content: {
					id: 'timeLength_field',
					name: 'timeLength',
					label: '时间长度',
					type: 'text',
					value: '',
					required: false,
					used: true
				}
			}];

			collection = new ColumnCollection(config);
		});

		describe('默认构造行为', function() {
			var model = false;

			beforeEach(function() {
				model = new RowModel();
			});

			afterEach(function() {
				model = false;
			});

			it("默认数据必须是这样:{index: 0, columnCount:3, layout: 'fit',  columns: []}",
				function() {
					expect(model.constructor === RowModel);
					expect(model.get('index')).toBe(0);
					expect(model.get('layout')).toBe('fit');

					var columns = model.get('columns');
					expect(columns.constructor === Array);
				});

			it('默认selected属性为false', function() {
				expect(model.get('selected')).toBe(false);
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
					selected: false,
					layout: 'fit',
					columns: config
				});

			});

		});
		
		describe('full parameters构造', function() {
			var fullConfig = null;
			var model = null;
		
			beforeEach(function() {
				fullConfig = {index: 1, layout: 'fit',  
					columns: config };	

				model = new RowModel(fullConfig); 	
			});

			it('确定初始化后，各项参数正确', function() {
				expect(model.get('index')).toEqual(1);
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

});


