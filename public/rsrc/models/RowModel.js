define([
	'backbone',
	'./ColumnCollection'
], function(Backbone, ColumnCollection) {

	var RowModel = Backbone.Model.extend({
		defaults: function() {
			return {
				index: 0,
				columnCount: 3,
				layout: 'fit',
				columns: []
			};
		},
		initialize:	function() {
			var c_json = this.get('columns');
			this.columns = new ColumnCollection(c_json);
			this.columns.parent = this;

			var json = this.columns.toJSON();
			this.set({
				columns: json
			}, { silence: true });
		},
		setColumns: function(columnCollection) {
			this.columns = columnCollection;
			this.columns.parent = this;

			var json = this.columns.toJSON();
			this.set({
				columns: json
			});
		},
		getColumns: function() {
			return this.columns;
		}
	});

	return RowModel;
});
