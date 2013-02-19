define([
	'./Core',
	'./FieldView',
	'text!tmpl/select_field.html',
	'jquery-select2'

], function(Core, FieldView, tmpl) {

	var SelectFieldView = FieldView.extend({
		template: Core.read_tmpl(tmpl),
		events: {
			'change select': "onChanged"	
		},
		onRender: function() {
			this.inputTag =  this.$('select');
			this.inputTag.select2({
				width: 'resolve'
			});
		}
	});

	Fields.reg('select', SelectFieldView);
	
	return SelectFieldView;
});
