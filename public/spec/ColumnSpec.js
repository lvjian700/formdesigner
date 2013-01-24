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

	it('使用json直接初始化ColumnModel', 
		function() {
			var config = {
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
			};

			var column = new ColumnModel(config);
			var json = column.toJSON();
			expect(json).toEqual(config);

			var content = column.getContent();
			expect(content.constructor === FieldModel);
			expect(content.parent === column);
		});

});

describe('测试ColumnView', function() {
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
		
		it('创建column div需要包含.col-*的css样式',
			function() {
				var el = view.render().el;
				var jel = $(el);	
				
				expect(jel).toHaveClass('col-1');
				expect(jel).toContain('div.cell');
			});

	});


	describe('渲染到dom后', function() {
		beforeEach(function() {
			var renderedEl = view.render().el
			$('#bbd').append(renderedEl);
		});

		it('更新model.colspan后, 调用colspanUpdate更新class',
			function() {
				var el = view.render().el;
				var jel = $(el);	
				
				expect(jel).toHaveClass('col-1');
				expect(jel).toContain('div.cell');
				
				model.set({colspan: 2});
				expect(view.$el).toHaveClass('col-2');
				expect(view.$el).toContain('div.cell');
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
				
				expect(jel).toHaveClass('col-1');
				expect(jel).toContain('div.cell');

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

















