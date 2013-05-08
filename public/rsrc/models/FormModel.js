define([
	'backbone',
    'm/RowModel',
	'./RowCollection',
	'./emptyrow'	
], function(Backbone, RowModel, RowCollection, emptyRowJson) {
		
	var FormModel = Backbone.Model.extend({
		defaults: function() {
			return {
				id: '',
				defaults: {
					layout: 'fit',
					labelWidth: 80, //px
				},
				rows: []
			};
		},
		initialize:	function() {
            
			var r_json = this.get('rows');

			this.rows = new RowCollection(r_json);
		},
		addRow: function() {
			var index = this.rows.size();
			var json = emptyRowJson(index);	
			this.rows.add([
				json
			]);
		},
		removeAt: function(index) {
			this.rows.removeAt(index);
		},
		removeSelected: function() {
			this.rows.removeSelected();
		},
		removeLastRow: function() {
			this.rows.pop();
		},
		updateAttrs: function() {
			console.log('update form model attrs');
			var json = this.rows.toJSON();

			this.set({
				rows: json
			});
		},
		setRows: function(rowsCollection) {
			this.rows = rowsCollection;
			this.rows.parent = this;

			this.updateAttrs();
		},
		getRows: function() {
			return this.rows;
		}
	});

	return FormModel;
});


