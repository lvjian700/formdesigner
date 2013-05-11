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
            
        describe('测试添加接口', function() {
            var config =  [{
					index: 0,
					width: 0.25,
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
					width: 0.25,
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
					width: 0.25,
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
            var cc = false;
            var ec = false;

            beforeEach(function() {
                cc = new ColumnCollection(config);
                ec = new ColumnCollection([]);
            });

            afterEach(function() {
                cc = false;
                ec = false;
            });
            
            it('widthSpace()返回当前空余宽度', function() {
                expect(ec).not.toBeUndefined();
                expect(ec.length).toBe(0);
                expect(ec.widthSpace()).toEqual(1.0);

                expect(cc.length).toBe(3);
                expect(cc.widthSpace()).toBe(0.25);
            });

            it('appendCell()追加cell', function() {
                expect(ec.length).toBe(0);
                ec.appendCell('newColumn', '新列');
                expect(ec.length).toBe(1);

                var c = ec.at(0);
                expect(c.get('index')).toEqual(0);
                expect(c.get('width')).toEqual(0.25);
                expect(c.get('selected')).toBe(false);

                var field = c.getContent();
                expect(field.get('name')).toEqual('newColumn');
                expect(field.get('label')).toEqual('新列');
            });

        });
	});
});


