define([
	'm/FieldModel',
	'm/ColumnModel',
	'm/ColumnCollection',
	'm/RowModel',
	'm/RowCollection'

], function(FieldModel, ColumnModel, ColumnCollection, 
		RowModel, RowCollection) {
	
	return describe('测试RowCollection', function() {
		
		describe('使用fullconfig创建RowCollection', function() {
			var fullConfig = null;
			var full = null;

			beforeEach(function() {
				fullConfig = [{
					index: 0,
					selected: true,
					layout: 'fit',
					columns: [{
						index: 0,
						width: 0.3,
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
							required: false
						}
					}]
				}, {
					index: 1,
					selected: false,
					layout: 'fit',
					columns: [{
						index: 0,
						width: 0.33,
						selected: false,
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
						width: 0.33,
						selected: false,
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
						width: 0.33,
						selected: false,
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


			it('测试findSelected', function() {
				var list = full.findSelected();
				expect(list.constructor).toEqual(Array);
				expect(list.length).toBe(1);

				var item = list[0];
				expect(item.constructor).toEqual(RowModel);
				expect(item.get('index')).toBe(0);
			});

			it('removeSelected删除选中行', function() {
				var removeSpy = jasmine.createSpy('remove');
				full.bind('remove', removeSpy);
				full.bind('remove', function(row, rows, options) {
					expect(options.index).toBe(0);
				});

				var changeSpy = jasmine.createSpy('change');
				var unselected = full.at(1);
				expect(unselected.constructor).toEqual(RowModel);
				unselected.bind('change:index', changeSpy);

				expect(unselected.get('index')).toBe(1);
				expect(unselected.get('selected')).toBe(false);

				full.removeSelected();

				expect(removeSpy).toHaveBeenCalled();
				expect(changeSpy).toHaveBeenCalled();

				expect(full.length).toBe(1);
				expect(unselected.get('index')).toBe(0);
			});
		});// end fullconfig describe

	});
});


