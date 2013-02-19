define(['v/Fields'], function(Fields) {

	return describe('测试views/core.js', function() {
		

		beforeEach(function() {
		});

		afterEach(function() {
			Fields.clear();
		});

		describe('Fields基本测试', function() {

			it('FieldViews 有正确的prototype', function() {
				expect(Fields.constructor).toEqual(FieldViews);
				expect(Fields.constructor).toEqual(FieldViews);
			});
		});

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

		describe('测试Fields.create', function() {
			beforeEach(function() {
				Fields.reg('text', FieldView);	
				Fields.reg('select', SelectFieldView);
			});

			it('Fields.create, 跟据model.type创建text field view', function() {
				var model = new FieldModel({
					id : 'model_field',
					name: 'model',
					type: 'text',
					value: '',
					required: false
				});

				var view = Fields.create({
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

			it('Fields.create, 创建select view', function() {
				
				var model = new FieldModel({
					id : 'model_field',
					name: 'model',
					type: 'select',
					value: '',
					required: false
				});

				var view = Fields.create({
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

});
