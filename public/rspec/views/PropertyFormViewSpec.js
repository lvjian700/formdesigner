define([
	'jquery',
	'm/FieldModel',
	'v/PropertyFormView'
], function($, FieldModel, PropertyFormView) {
	
	describe('测试PropertyFormView', function() {
		var editor = new PropertyFormView();
		var model = new FieldModel({
			id: 'title_field',
			name: 'title',
			label: '标题',
			type: 'text',
			required: false 
		});;
		editor.render();
		editor.loadData(model);

		it('初始化成功', function() {
			expect(editor.nameInput).not.toBeUndefined();
			expect(editor.nameInput.attr('name')).toEqual('name');
			expect(editor.labelInput.attr('name')).toEqual('label');
			expect(editor.typeSelect.attr('name')).toEqual('type');
			expect(editor.requiredCheck.attr('name')).toEqual('required');
		});

		it('加载FieldModel数据', function() {
			expect(editor.nameInput.val()).toEqual('title');
			expect(editor.labelInput.val()).toEqual('标题');
			expect(editor.typeSelect.val()).toEqual('text');
			var check = editor.requiredCheck.attr('checked');
			expect(check == undefined || check == false)
				.toEqual(true);
		});

		it('改变dom数据会更新model内容', function() {

			var changedSpy = jasmine.createSpy('change');
			model.bind('change', changedSpy);

			editor.nameInput.val('createdate');
			editor.nameInput.change();
			expect(changedSpy).toHaveBeenCalled();

			expect(model.getName()).toEqual('createdate');
			expect(model.get('id')).toEqual('createdate_field');
		});
	});
});


