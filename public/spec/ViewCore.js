describe('测试views/core.js', function() {

	describe('测试Fields注册', function() {

		it('Fields.reg跟据类型注册view class, Field.unreg可以取消注册', function() {
			Fields.reg('text', FieldView);
			expect(Fields.getCls('text')).toBeDefined();
			expect(Fields.getCls('text')).toEqual(FieldView);

			Fields.unreg('text');
			var empty = Fields.getCls('text');
			expect(empty).toBeUndefined();
		});

	});

	describe('测试Fields.createView', function() {
		beforeEach(function() {
			Fields.reg('text', FieldView);	
			Fields.reg('select', SelectFieldView);
		});

		afterEach(function() {
			Fields.clearRegs();	
		});

		it('Fields.createView, 跟据model.type创建text field view', function() {
			var model = new FieldModel({
				id : 'model_field',
				name: 'model',
				type: 'text',
				value: '',
				required: false
			});

			var view = Fields.createView({
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

		it('Fields.createView, 创建select view', function() {
			
			var model = new FieldModel({
				id : 'model_field',
				name: 'model',
				type: 'select',
				value: '',
				required: false
			});

			var view = Fields.createView({
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
