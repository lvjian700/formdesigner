define([
	'backbone',
	'./RowCollection'

], function(Backbone) {
	
	var FormModel = Backbone.Model.extend({
		defaults: function() {
			return {
				id: '',
				defaults: {
					layout: 'fit',
					labelWidth: 80, //px
				},
				rows: []
			}	
		},
		initialize:	function() {
			var r_json = this.get('rows');
			this.rows = new RowCollection(r_json);
			this.rows.parent = this;

			var json = this.rows.toJSON();
			this.set({
				rows: json
			}, { silence: true });
		},
		setRows: function(rowsCollection) {
			this.rows = rowsCollection;
			this.rows.parent = this;

			var json = this.rows.toJSON();
			this.set({
				rows: json
			});
		},
		getRows: function() {
			return this.rows;
		}
	});

	return FormModel;
});


