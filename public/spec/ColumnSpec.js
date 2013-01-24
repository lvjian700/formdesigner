describe("测试ColumnModel", function() {

	var model = null;

	beforeEach(function() {
		model = new ColumnModel();
	});

	afterEach(function() {
		model = null;
	});

	it("默认数据必须是这样:{index: 0, colspan:1, content: FieldModel}",
		function() {
			expect(model.get('index')).toBe(0);
			expect(model.get('colspan')).toBe(1);
			expect(model.constructor === ColumnModel);

			var content = model.get('content');
			expect(content.constructor === FieldModel);
		});
	
	it("嵌套Model的序列化和json格式一致",
		function() {
			var json = model.toJSON();
			expect(json).toEqual({
				index: 0,
				colspan: 1,
				content: {
					id: '',
					name: '',
					label: '',
					type: 'text',
					value: '',// 可能是object
					required: false
				}
			});

		});

	it("测试setContent & getContent",
		function() {
			var newField = new FieldModel({
				id:'title_field',
				name: 'title',
				label: 'Title'
			});
			
			var changedSpy = jasmine.createSpy('changedSpy');
			model.bind('change:content', changedSpy);

			model.setContent(newField);
			expect(changedSpy).toHaveBeenCalled();

			var ret = model.getContent();
			expect(ret).toBe(newField);

			var json = model.toJSON();
			expect(json).toEqual({
				index: 0,
				colspan: 1,
				content: {
					id:'title_field',
					name: 'title',
					label: 'Title',
					type: 'text',
					value: '',// 可能是object
					required: false
				}
			});
		});
});

