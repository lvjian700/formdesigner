define(['models/FieldModel'], function(FieldModel) {

	var SelectFieldModel = FieldModel.extend({
		defaults: function() {
			return {
				id: '',
				name: '',
				label: '',
				type: 'select',
				value: '',// 可能是object
				required: false
			};
		},
		initialize: function() {
		}
	});

	return SelectFieldModel;
});
