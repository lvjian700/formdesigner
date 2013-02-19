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
});


