var TimelengthView = FieldView.extend({
	tagName: 'div',
	className: 'cell input-append bootstrap-timepicker-component controls',
	template: read_tmpl('#tmpl-timelength'),
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
