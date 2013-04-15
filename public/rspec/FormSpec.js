define([
	'm/FieldModel',
	'm/ColumnModel',
	'm/ColumnCollection',
	'm/RowModel',
	'm/RowCollection',
	'm/FormModel',
	'v/FormView',
	'm/emptyrow'
], function(FieldModel, ColumnModel, ColumnCollection, RowModel,
		RowCollection, FormModel, FormView, emptyRow) {

	return describe('测试FormModel & View', function() {

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

			it("addRow添加新行，并且this.rows触发add事件", function() {
				var rowList = model.getRows();
				expect(rowList.constructor === RowCollection);
				expect(rowList.size() == 0);
				var changedSpy = jasmine.createSpy('chanagedSpy');	

				rowList.bind('add', changedSpy);
				var data = emptyRow();	
				model.addRow(data);
				expect(changedSpy).toHaveBeenCalled();

				expect(rowList.size() == 1);
			});

			it("removeLastRow删除最后一行，并且this.rows触发delete事件", 
					function() {
				var data = emptyRow();	
				model.addRow(data);

				var rowList = model.getRows();
				expect(rowList.size()).toEqual(1);

				var changedSpy = jasmine.createSpy('chanagedSpy');	
				rowList.bind('remove', changedSpy);
				model.removeLastRow();
				expect(changedSpy).toHaveBeenCalled();

				expect(rowList.size()).toEqual(0);
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
				expect(rows.length).toBe(2);

			});

			it('getRows能获取RowCollection对象', function() {
				var rows = full.getRows();
				expect(rows).toBeDefined();
				expect(rows.length).toBe(2);
				expect(rows.constructor).toEqual(RowCollection);
			});

			it('rows中都是RowModel对象', function() {
				var rows = full.getRows();
				expect(rows.length).toBe(2);

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

			it('FormModel.toJSON()跟fullConfig一致', function() {
				var ret = full.toJSON();
				expect(ret).toEqual(formConfig);
			});
		});


		describe('测试FormView', function() {
			var formView = null;

			beforeEach(function() {
				full = new FormModel(formConfig);
				formView = new FormView({
					model: full
				});

				var el = formView.render().el;

				$('body').append('<div id="bbd"></div>');
				$('#bbd').append(el);
			});

			afterEach(function() {
				formView.remove();
				$('#bbd').remove();
			});
			
			it('formView.rowModels,是RowCollection对象，并且有2行', function() {
				expect(formView.rowModels).toBeDefined();
				expect(formView.rowModels.constructor).toEqual(RowCollection);
				expect(formView.rowModels.length).toBe(2);
			});

			it('formView.rowViews, 是Array对象，并且有2个', function() {
				expect(formView.rowViews).toBeDefined();
				expect(formView.rowViews.constructor).toEqual(Array);
				expect(formView.rowViews.length).toBe(2);
			});

			it('formView.formView, 是form dom的 jquery wrapper', function() {
				expect(formView.form).toBeDefined();
				expect(formView.form.attr('method')).toEqual('post');
			});

			it('渲染后的dom结构应该是div.form-wrapper>form | div.clear', function() {
				var el = formView.render().el;
				var jel = $(el);

				expect(jel).toHaveClass('form-wrapper');
				expect(jel).toContain('form');
				expect(jel).toContain('div.clear');
				
				var jform = jel.find('form');
				expect(jform.attr('id')).toEqual('news-form');
				expect(jform).toContain('div.row-3');
			});

			it('添加行后，view应该新建行', function() {
				formView.render();
				var jrows = formView.$el.find("div[class^='row']");
				var numBefore = jrows.length;

				var data = emptyRow();
				formView.model.addRow(data);
				var numAfter = formView.$el.find("div[class^='row']").length;
				expect(numAfter).toEqual(numBefore + 1);
			});

			it('删除行后, view应该减少行', function() {
				formView.render();
				var jrows = formView.$el.find("div[class^='row']");
				var numBefore = jrows.length;

				formView.model.removeLastRow();
				var numAfter = formView.$el.find("div[class^='row']").length;
				expect(numAfter).toEqual(numBefore - 1);
			});
		});
	});


});


