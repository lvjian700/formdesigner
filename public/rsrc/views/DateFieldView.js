define([
	'jquery', 
	'moment',
	'./Core',
	'./FieldView',
	'text!tmpl/date_field.html',
	'bootstrap-date'
],function($, moment, Core, FieldView, tmpl) {
	
	var DateFieldView = FieldView.extend({
		className: 'cell input-append controls bootstrap-timepicker-component',
		template: Core.read_tmpl(tmpl),
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
