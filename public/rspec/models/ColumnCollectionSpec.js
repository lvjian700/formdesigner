define([
	'm/ColumnModel',
	'm/ColumnCollection'	
], function(ColumnModel, ColumnCollection) {
	
	return describe('测试ColumnCollection', function() {

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
});


