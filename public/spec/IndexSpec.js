describe("测试FieldModel", function() {

	var field = false;

	describe

	beforeEach(function() {
		field = new FieldModel();
	});

	afterEach(function() {
		field = false;
	});

	it("默认数据必须是这样:{type: \'text\', required: false}",
		function() {
			expect(field.get('type'))
				.toEqual('text');

			expect(field.isRequired())
				.toEqual(false);
		});

	it("setName()方法需要修改id, 修改后的格式应该是: ${name}_field.",
		function() {
			field.setName('fieldName');

			expect('fieldName').toEqual(
				field.getName() 
			);

			expect('fieldName_field').toEqual(
				field.get('id') 
			);
		});

	it("使用构造方法创建对象应该覆盖defaults",
		function() {
			
			var textField = new FieldModel({
				id: 'title_field',
				name: 'title'
			});
		
			var type = textField.get('type');
			expect(type).toBeDefined();
			expect(type).toEqual('text');
			
			expect(textField.isRequired()).toEqual(false);
		});
});

describe("测试FieldView", function() {
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
		$('#bbd').remove();
		fieldView.remove();
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

		it("Render Template包含.cell, label和input等基本结构", 
			function() {
				var el = fieldView.render().el;
				var jel = $(el);
				expect(jel).toBe('div.cell');
				expect(jel).toContain('label');	
				expect(jel).toContain('input:text');	
			});
	});

	describe("渲染到dom后", function() {
			
	});
});

describe("SelectFieldModel测试", function() {
	var select = false;

	beforeEach(function() {
		select = new SelectFieldModel();
	});

	afterEach(function() {
		select = false;
	});

	it("默认数据必须是这样: {type:\'select', value:\'\'}", 
		function() {
			
			expect(select.get('type'))
				.toEqual('select')

			expect(select.getValue())
				.toEqual('');
		});
});

