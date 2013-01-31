var TimelengthView = FieldView.extend({
	tagName: 'div',
	className: 'cell input-append bootstrap-timepicker-component controls',
	template: read_tmpl('#tmpl-timelength'),
	render: function() {
		var json = this.model.toJSON();
		var html = this.template(json);
	
		this.$el.html(html);
		this.cellBody = this.$el;
		this.cellBody.addClass('bootstrap-timepicker-component');

		this.label = this.$('label');
		this.inputTag =  this.$('input');

		return this;
	},
	onDomReady: function() {
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
