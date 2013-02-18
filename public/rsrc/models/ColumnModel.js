define(['backbone', 'm/FieldModel'], function(Backbone, FieldModel) {

	var ColumnModel = Backbone.Model.extend({ 
		defaults: function() {
			return {
				index: 0,
				colspan: 1,
				content: {
					id: '',
					name: '',
					label: '',
					type: 'text',
					value: '',// 可能是object
					required: false
				}
			};
		},
		initialize: function() {
			var c_json = this.get('content');
			this.content = new FieldModel(c_json);
			this.content.parent = this;

			var json = this.content.toJSON();
			this.set({
				content: json
			}, { silence: true });
		},
		setContent: function(fieldModel) {
			this.content = fieldModel;
			this.content.parent = this;

			var json = this.content.toJSON();
			this.set({
				content: json
			});
		},
		getContent: function() {
			return this.content;
		}
	});

	return ColumnModel;
});
