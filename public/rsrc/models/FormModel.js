define([
	'backbone',
	'./RowCollection',
	'./emptyrow'	
], function(Backbone, RowCollection, emptyRowJson) {
		
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
			console.log('initialize form model');
			console.log(r_json);

			this.rows = new RowCollection(r_json);
			this.rows.parent = this;

			var json = this.rows.toJSON();
			this.set({
				rows: json
			}, { silence: true });
		},
		addRow: function() {
			var index = this.rows.size();
			var json = emptyRowJson(index);	
			this.rows.add([
				json
			]);
		},
		removeLastRow: function() {
			this.rows.pop();
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


