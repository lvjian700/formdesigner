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
			layout: 'fit',
			selected: false,
			columns: [{
				index: 0,
				width: 1.0,
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

			});

			
		});


		describe('渲染到dom后', function() {
			
			beforeEach(function() {
				var renderedEl = fullView.render().el;
				$('#bbd').append(renderedEl);
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
			
			it('渲染后的结构应该是: div.form-row>div.form-column>div.form-cell', function() {
				var el = fullView.render().el;
				var jel = $(el);

				expect(jel).toHaveClass('form-row');
				expect(jel).toContain('div.form-column');

				var jcols = jel.find('column');

				jcols.each(function(i, n) {
					expect(n).toJaveClass('column');
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
				expect(el).toHaveClass('form-row-selected');
			});

			it('修改model.selected状态会改变行背景色', function() {
				fullView.render().el;
				fullView.model.set({
					selected: true
				});
				expect(fullView.el).toHaveClass('form-row-selected');

				fullView.model.set({
					selected: false 
				});
				expect(fullView.el).not.toHaveClass('form-row-selected');

			});
		});

	});
});


