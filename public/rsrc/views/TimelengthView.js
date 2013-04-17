define([
	'jquery',
	'./Core', './FieldView',
	'text!tmpl/timelength_field.html',
	'bootstrap-time'

], function($, Core, FieldView, tmpl) {

	var TimelengthView = FieldView.extend({
		tagName: 'div',
		className: 'form-cell input-append bootstrap-timepicker-component controls',
		template: Core.read_tmpl(tmpl),
		onRender: function() {
			this.inputTag.timepicker({
				showSeconds: true,
				showFrames: true,
				fps: 25, 
				frameStep: 5,
				showMeridian: false,
				defaultTime: 'value'
			});
		}
	});

	Fields.reg('timelength', TimelengthView);

	return TimelengthView;
});

