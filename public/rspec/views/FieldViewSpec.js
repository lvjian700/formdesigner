define(['jquery','m/FieldModel', 'v/FieldView'], 
	function($, FieldModel, FieldView) {

	return describe("测试FieldView", function() {
		var fieldModel, fieldView = null;

		beforeEach(function() {
			$('body').append('<div id="bbd"></div>');
			fieldModel = new FieldModel({
				id: 'name_field',
				name: 'name',
				label: '姓名'
			});

			fieldView = new FieldView({
				model : fieldModel
			});
			
		});

		afterEach(function() {
			fieldView.remove();
			$('#bbd').remove();
		});
		
		describe("尚未渲染到dom", function() {
			it("View中model的初始化状态, type:text, name:name, label: 姓名", 
				function() {
					var model = fieldView.model;

					expect(model).toBeDefined();		
					expect(model.get('type')).toEqual('text');			
					expect(model.get('name')).toEqual('name');			
					expect(model.get('label')).toEqual('姓名');			
				});

			it("Render Template包含.form-cell, label和input等基本结构", 
				function() {
					var el = fieldView.render().el;
					var jel = $(el);

					expect(jel).toBe('div.form-cell');
					expect(jel).toContain('label');	
					expect(jel).toContain('input:text');	
				});
			it("getTemplate返回string格式的html",
				function() {
					var html = fieldView.getTemplate();	
					jasmine.any('string');

					var jel = $(html);
					expect(jel).toBe('div.form-cell');
					expect(jel).toContain('label');	
					expect(jel).toContain('input:text');	
				});	
		});

		describe("渲染到dom后", function() {
			beforeEach(function() {
				var renderedEl = fieldView.render().el
				$('#bbd').append(renderedEl);

			});

			it("更新model.value后,调用valueUpdated方法更新dom", 
				function() {
					fieldModel.setValue('new value');

					var domVal = fieldView.inputTag.val();
					expect(domVal).toEqual('new value');
				});

			it("dom值改变后(onchanged),修改model.value, 并且不触发model的change:value事件",
				function() {
					fieldView.inputTag.val('user input').change();	
					
					var newVal = fieldView.model.getValue();
					expect(newVal).toEqual('user input');

					var changedSpy = jasmine.createSpy('changedSpy');
					fieldView.model.on('change:value', changedSpy);

					fieldView.inputTag.val('user input').change();	

					expect(changedSpy).not.toHaveBeenCalled();
				});
			
			it("model调用setName修改name后，修改label.for & input.id & name 属性", 
				function() {
					fieldView.model.setName('newTitle');

					var label_for = fieldView.label.attr('for');
					expect(label_for).toEqual('newTitle_field');
					
					var input_id = fieldView.inputTag.attr('id');
					expect(input_id).toEqual('newTitle_field');

					var input_name = fieldView.inputTag.attr('name');
					expect(input_name).toEqual('newTitle');
				});

			it('used状态为false的字段不显示', function() {
				
			})
		});
	});
});
