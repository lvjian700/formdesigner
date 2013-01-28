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

describe('测试Rowview', function() {
	var model, view = null;	
    var fullModel, fullView = null;

	var rowConfig = {
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
    };

	beforeEach(function() {
		$('body').append('<div id="bbd"></div>');
		model = new RowModel();
		view = new RowView({
			model: model
		});

        fullModel = new RowModel(rowConfig);    
        fullView = new RowView({
            model: fullModel
        });
	});

	afterEach(function() {
		view.remove();
        fullView.remove();
		$('#bbd').remove();
	});

    describe('尚未渲染到dom', function() {
        describe('默认构造方法',  function() {
            it('this.columnModels为空', function() {
                expect(view.columnModels).toBeDefined(); 
                expect(view.columnModels.constructor)
                    .toEqual(ColumnCollection);
                expect(view.columnModels.length)
                    .toBe(0);
            });

            it('this.columnViews为[]', function() {
                expect(view.columnViews).toBeDefined();
                expect(view.columnViews.constructor)
                    .toEqual(Array);
                expect(view.columnViews.length).toBe(0);
            });

            it('创建的div需要包含.row-{columnCount}的css样式', function() {

                var el = view.render().el;
                var jel = $(el);

                expect(jel).toHaveClass('row-3');
            });

        });

        describe('使用fullconfig构造', function() {
			
			it('this.columnModels有3列元素，并且是ColumnCollection对象', function() {
                expect(fullView.columnModels).toBeDefined(); 
                expect(fullView.columnModels.constructor)
                    .toEqual(ColumnCollection);
                expect(fullView.columnModels.length)
                    .toBe(3);

				fullView.columnModels.each(function(item) {
					expect(item.constructor).toEqual(ColumnModel);
				});
			});

            it('this.columnViews为Array, 并且有三个ColumnView对象', function() {
                expect(fullView.columnViews).toBeDefined();
                expect(fullView.columnViews.constructor)
                    .toEqual(Array);
                expect(fullView.columnViews.length).toBe(3);

				_.each(fullView.columnViews, function(item) {
					expect(item.constructor).toEqual(ColumnView);
				});
            });

        });
    });


    describe('渲染到dom后', function() {
        
		beforeEach(function() {
			var renderedEl = fullView.render().el;
			$('#bbd').append(renderedEl);
		});
		
		it('渲染后的结构应该是: div.row-3>div.col-1>div.cell', function() {
			var el = fullView.render().el;
			var jel = $(el);

			expect(jel).toHaveClass('row-3');
			expect(jel).toContain('div.col-1');

			var jcols = jel.find('col-1');

			jcols.each(function(i, n) {
				expect(n).toJaveClass('col-1');
				expect(n).toContain('div.cell');

				jcell = n.find('div.cell');
				expect(jcell).toContain('label');
				expect(jcell).toContain('input:text');
			});
		});
    });

});
