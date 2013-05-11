define([
	'jquery', 'underscore',
	'm/ToolboxModel', 'm/ToolboxCollection',
	'v/ToolboxView',
	'text!tmpl/news_tmpls.js', 
	'text!tmpl/topics_tmpls.js'
], function($, _,
	ToolboxModel, ToolboxCollection,
	ToolboxView,
	news_tmpls,
	topics_tmpls) {
	
	return describe('测试ToolboxView', function() {
		var news = JSON.parse(news_tmpls);
		var tbv = false;

		beforeEach(function() {
			tbv = new ToolboxView();	
		});

		afterEach(function() {
			tbv.remove();
		});

		afterEach(function() {
			tbv.remove();
		});

		it('初始化,未只定model的情况下render', function() {
			expect(tbv.$el.attr('id')).toEqual('toolbox');
			expect(tbv.model).toBeUndefined();
			tbv.render();

			expect(tbv.$el.html()).toEqual('');
		});
		
		it('指定model之后render, 渲染toolbox item', function() {
			tbv.load(news).render();
			expect(tbv.model).not.toBeUndefined();
			expect(tbv.el).toContain('li.toolbox-item>a');
		});
		
		it('add方法可以在头部插入数据, 并且更新dom', function() {
			tbv.load(news).render();
			var addSpy = jasmine.createSpy('add');
			tbv.model.bind('add', addSpy);

			var length = tbv.model.length;

			tbv.add('test_name', '测试字段');
			expect(addSpy).toHaveBeenCalled();
			expect(tbv.model.length).toEqual(length + 1);

			var first = tbv.model.at(0);
			expect(first.get('name')).toEqual('test_name');
			expect(first.get('label')).toEqual('测试字段');

			var el = tbv.$('li>a').first();
			expect(el.attr('id')).toEqual('tb-test_name');
		});

		it('toCanvas触发remove事件删除dom', function() {
			tbv.load(news).render();
			var removedSpy = jasmine.createSpy('remove');
			tbv.model.bind('remove', removedSpy);
			
			var length = tbv.$('li>a').length;

			tbv.$('li>a:first').click();
			expect(removedSpy).toHaveBeenCalled();	
		
			expect(tbv.$('li>a').length).toEqual(length - 1);
		});

	});

});


