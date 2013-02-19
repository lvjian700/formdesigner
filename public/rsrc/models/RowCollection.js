define([
	'backbone',
	'./RowModel'
], function(Backbone, RowModel) {
	
	var RowCollection = Backbone.Collection.extend({
		model: RowModel,
		comparator: function() {
			return this.get('index');
		}
	});

	return RowCollection;
});
