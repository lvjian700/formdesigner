define([
	'jquery',
	'm/ColumnModel',
	'm/ColumnCollection',
	'v/ColumnView',
	'm/RowModel',
	'v/RowView'

], function($, ColumnModel, ColumnCollection, ColumnView,
		RowModel, RowView) {

	return describe('测试RowView', function() {
		var model, view = null;	
		var fullModel, fullView = null;

		var rowConfig = {
			index: 0,
			columnCount: 3,
			layout: 'fit',
			selected: false
			columns: [{
				index: 0,
				colspan: 1,
				selected: false
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
				selected: false
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
				selected: false
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
				
				it('改变model.columnCount,会更新div.row-*的css样式', function() {
					var el = view.render().el;
					var jel = $(el);

					expect(jel).toHaveClass('row-3');

					view.model.set({columnCount: 2});
					expect(view.$el).not.toHaveClass('row-3');
					expect(view.$el).toHaveClass('row-2');
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

			it('model.selected初始化状态为true时，显示背景色', function() {
				var selectedModel = new RowModel(fullModel.toJSON());
				selectedModel.set({
					selected: true
				});
				var selectedView = new RowView({
					model: selectedModel
				});
				expect(selectedView.model.get('selected')).toEqual(true);

				var el = selectedView.render().el;
				expect(el).toHaveClass('row-selected');
			});

			it('修改model.selected状态会改变行背景色', function() {
				fullView.render().el;
				fullView.model.set({
					selected: true
				});
				expect(fullView.el).toHaveClass('row-selected');

				fullView.model.set({
					selected: false 
				});
				expect(fullView.el).not.toHaveClass('row-selected');

			});
		});

	});
});


