define(['jquery','m/ColumnModel', 'v/ColumnView', 'm/FieldModel',
		'v/FieldView'], 
	function($, ColumnModel, ColumnView, FieldModel, FieldView) {

	return describe('测试ColumnView', function() {
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
			
			it('创建column div需要包含.form-column的css样式',
				function() {
					var el = view.render().el;
					var jel = $(el);	
					
					expect(jel).toHaveClass('form-column');
					expect(jel).toContain('div.form-cell');
				});

		});


		describe('渲染到dom后', function() {
			beforeEach(function() {
				var renderedEl = view.render().el
				$('#bbd').append(renderedEl);
			});

			it('更新model.width后, 调用widthUpdated更新style.width',
				function() {
					var el = view.render().el;
					var jel = $(el);	
					
					view.model.set({width: 0.5});
					var widthAttr = view.el.style.width;

					expect(widthAttr).toBe('450px');
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
					
					expect(jel).toHaveClass('form-column');
					expect(jel).toContain('div.form-cell');

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

});
