define([
	'jquery',
	'm/FieldModel',
	'm/ColumnModel',
	'v/PropertyFormView'
], function($, FieldModel, ColumnModel, PropertyFormView) {
	
	describe('测试PropertyFormView', function() {
		var editor = new PropertyFormView();
		var model = new FieldModel({
			id: 'title_field',
			name: 'title',
			label: '标题',
			type: 'text',
			required: false 
		});;

		var column = new ColumnModel({
			index: 0,
			width: 0.5,
			selected: false,
			content: model.toJSON()
		});
		editor.render();
		editor.loadData(model, column);

		it('初始化成功', function() {
			expect(editor.widthInput).not.toBeUndefined();
			expect(editor.widthInput.attr('name')).toEqual('width');

			expect(editor.nameInput).not.toBeUndefined();
			expect(editor.nameInput.attr('name')).toEqual('name');

			expect(editor.labelInput.attr('name')).toEqual('label');

			expect(editor.typeSelect.attr('name')).toEqual('type');

			expect(editor.requiredCheck.attr('name')).toEqual('required');
		});

		it('加载FieldModel&ColumnModel数据', function() {
			expect(editor.widthInput.val()).toEqual('0.5');
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

			var columnChangedSpy = jasmine.createSpy('change');
			column.bind('change', columnChangedSpy);

			editor.widthInput.val(0.25);
			editor.widthInput.change();
			expect(columnChangedSpy).toHaveBeenCalled();
			expect(column.get('width')).toEqual(0.25);
		});
	});
});


