describe('测试views/core.js', function() {
	
	var Reg = null;

	beforeEach(function() {
		Reg = new FieldViews();
	});

	afterEach(function() {
		Reg.clear();
	});

	describe('Reg基本测试', function() {
		it('ViewCore.js默认提供一个Fields-FieldViews', function() {
			expect(Fields).toBeDefined();
			expect(Fields.constructor).toEqual(FieldViews);
		});

		it('FieldViews 有正确的prototype', function() {
			expect(Reg.constructor).toEqual(FieldViews);
			expect(Fields.constructor).toEqual(FieldViews);
		});
	});

	describe('测试Reg注册', function() {

		it('Reg.reg跟据类型注册view class, Field.unreg可以取消注册', function() {
			Reg.reg('text', FieldView);
			expect(Reg.getCls('text')).toBeDefined();
			expect(Reg.getCls('text')).toEqual(FieldView);

			Reg.unreg('text');
			var empty = Reg.getCls('text');
			expect(empty).toBeUndefined();
		});

	});

	describe('测试Reg.create', function() {
		beforeEach(function() {
			Reg.reg('text', FieldView);	
			Reg.reg('select', SelectFieldView);
		});

		it('Reg.create, 跟据model.type创建text field view', function() {
			var model = new FieldModel({
				id : 'model_field',
				name: 'model',
				type: 'text',
				value: '',
				required: false
			});

			var view = Reg.create({
				model: model
			});
			view = view.render();

			expect(view).toBeDefined();
			expect(view.constructor).toEqual(FieldView);

			expect(view.label).toBeDefined();
			expect(view.inputTag).toBeDefined();
			expect(view.inputTag.attr('id')).toEqual('model_field');
			expect(view.inputTag[0].tagName.toLowerCase()).toEqual('input');
		});

		it('Reg.create, 创建select view', function() {
			
			var model = new FieldModel({
				id : 'model_field',
				name: 'model',
				type: 'select',
				value: '',
				required: false
			});

			var view = Reg.create({
				model: model
			});
			view = view.render();

			expect(view).toBeDefined();
			expect(view.constructor).toEqual(SelectFieldView);

			expect(view.label).toBeDefined();
			expect(view.inputTag).toBeDefined();
			expect(view.inputTag.attr('id')).toEqual('model_field');
			expect(view.inputTag[0].tagName.toLowerCase()).toEqual('select');
		});
	});
});
