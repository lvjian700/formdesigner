define([
	'jquery', 
	'./Core', './Fields', 
	'./FieldView',
	'bootstrap-date'
],function($, Core, Fields, FieldView) {}
	
	var DateFieldView = FieldView.extend({
		className: 'cell input-append controls bootstrap-timepicker-component',
		template: read_tmpl('#tmpl-date'),
		events: {
			'changeDate input': "onChanged"
		},
		onRender: function() {
			this.inputTag.datepicker({
				showMeridian: false,
				showSeconds: true,
				secondStep: 30,
				defaultTime: 'value'
			});
		},
		remove: function() {
			this.inputTag.datepicker('destroy');
			FieldView.prototype.remove.call(this); 
		}
	});

	Fields.reg('date', DateFieldView);

	return DateFieldView;
});
