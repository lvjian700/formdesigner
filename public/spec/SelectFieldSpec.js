/*
   SelectFieldSpec.js
   SelectFieldModel组件的测试
  */
describe("SelectFieldView 测试", function() {
	var fieldModel , fieldView = null;

	beforeEach(function() {
		$('body').append('<div id="bbd"></div>');	
		fieldModel = new SelectFieldModel({
			id: 'actor_field',
			name: 'actor',
			label: '角色'
		});

		fieldView = new SelectFieldView({
			model: fieldModel
		});
	});

	afterEach(function() {
		fieldView.remove();
		$('#bbd').remove();
	});

	it('SelectFieldView 注册了select类型', function() {
		var cls = Fields.getCls('select');
		expect(cls).toBeDefined();
		expect(cls).toEqual(SelectFieldView);
	});

	describe("尚未渲染到dom", function() {
		
		it("View中model的初始化状态, type:select, name:actor, label: 角色", 
			function() {
				var model = fieldView.model;

				expect(model).toBeDefined();		
				expect(model.get('type')).toEqual('select');			
				expect(model.get('name')).toEqual('actor');			
				expect(model.get('label')).toEqual('角色');			
			});

		it("Render Template包含.cell, label和select等基本结构", 
			function() {
				var el = fieldView.render().el;
				var jel = $(el);

				expect(jel).toBe('div.cell');
				expect(jel).toContain('label');	
				expect(jel).toContain('select');	
			});
		it("getTemplate返回string格式的html",
			function() {
				var html = fieldView.getTemplate();	
				jasmine.any('string');

				var jel = $(html);
				expect(jel).toBe('div.cell');
				expect(jel).toContain('label');	
				expect(jel).toContain('select');	
			});	
	});

	describe("渲染到dom后", function() {
		beforeEach(function() {
			var renderedEl = fieldView.render().el
			$('#bbd').append(renderedEl);
		});

		
		it("更新model.value后,调用valueUpdated方法更新dom", 
			function() {
				fieldModel.setValue('2');

				var domVal = fieldView.inputTag.val();
				expect(domVal).toEqual('2');

				var selected = fieldView.inputTag.find('option:selected');
				expect(selected.attr('value')).toEqual('2');
				expect(selected.text()).toEqual('司机');
			});

		it("dom值改变后(onchanged),修改model.value, 并且不触发model的change:value事件",
			function() {
				fieldView.inputTag.val('3').change();	
				
				var newVal = fieldView.model.getValue();
				expect(newVal).toEqual('3');

				var selected = fieldView.inputTag.find('option:selected');
				expect(selected.attr('value')).toEqual('3');
				expect(selected.text()).toEqual('总编辑');

				var changedSpy = jasmine.createSpy('changedSpy');
				fieldView.model.on('change:value', changedSpy);

				fieldView.inputTag.val('1').change();	

				expect(changedSpy).not.toHaveBeenCalled();
			});
		
		it("model调用setName修改name后，修改label.for & select.id & name 属性", 
			function() {
				fieldView.model.setName('column');

				var label_for = fieldView.label.attr('for');
				expect(label_for).toEqual('column_field');
				
				var input_id = fieldView.inputTag.attr('id');
				expect(input_id).toEqual('column_field');

				var input_name = fieldView.inputTag.attr('name');
				expect(input_name).toEqual('column');
			});
	});
});















