define([
	'jquery',
	'm/FieldModel',
	'v/TimelengthView'

], function($, FieldModel, TimelengthView) {

	return describe('TimelengthView测试', function() {

		var fieldModel , fieldView = null;

		beforeEach(function() {
			$('body').append('<div id="bbd"></div>');	
			fieldModel = new FieldModel({
				id: 'timelength_field',
				name: 'timelength',
				label: 'Video Length',
				type: 'timelength',
				required: false	
			});

			fieldView = new TimelengthView({
				model: fieldModel
			});
			
			var el = fieldView.render().el;
			$('#bbd').append(el);
		});

		afterEach(function() {
			fieldView.remove();
			$('#bbd').remove();
		});
		
		it('TimelengthView已被注册成timelength类型', function() {
			var cls = Fields.getCls('timelength');
			expect(cls).toBeDefined();
			expect(cls).toEqual(TimelengthView);
		});

		it('包含bootstrap-picker组建的样式', function() {
			expect(fieldView.$el).toHaveClass('controls');
			expect(fieldView.$el).toHaveClass('input-append');
			expect(fieldView.$el).toHaveClass('bootstrap-timepicker-component');

			expect(fieldView.inputTag).toHaveClass('timepicker-default');
		});

		it('修改model.value, 会同步更新input', function() {
			var val = '22:22:22:22';
			fieldModel.setValue(val);

			var ret = fieldView.inputTag.val();
			expect(ret).toEqual(val);
		});

		it('view.inputTag值变动，会修改model中的值', function() {
			var val = '22:22:22:22';
			fieldView.inputTag.val(val).change();	

			var newVal = fieldView.model.getValue();
			expect(newVal).toEqual(val);

			var changedSpy = jasmine.createSpy('changedSpy');
			fieldView.model.on('change:value', changedSpy);
			fieldView.inputTag.val('33:33:33:33').change();	

			expect(changedSpy).not.toHaveBeenCalled();
		});
	});
});
