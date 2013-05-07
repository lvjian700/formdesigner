define([
	'm/SystemConfigModel',
	'v/SaveFormView'
], function(SystemConfigModel, SaveFormView) {

	function tag (jel) {
		return jel[0].tagName.toLowerCase();
	}

	describe('测试SaveFormView', function() {
		var model = new SystemConfigModel();
		var view = new SaveFormView({
			model: model
		});
		view.render();

		it('初始化获取个input的引用', function() {
			expect(tag(view.form)).toEqual('form');	
			expect(tag(view.guid)).toEqual('input');	
			expect(tag(view.name)).toEqual('input');	
			expect(tag(view.type)).toEqual('select');	
			expect(tag(view.orderNum)).toEqual('input');	

			expect(view.value).not.toBeUndefined();
			expect(tag(view.value)).toEqual('input');	
			expect(tag(view.preceptName)).toEqual('input');	
		});
	});
});


