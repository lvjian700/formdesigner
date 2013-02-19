define([
	'backbone',
	'./ColumnModel'
], function(Backbone, ColumnModel) {

	var ColumnCollection = Backbone.Collection.extend({
		model: ColumnModel,
		comparator: function() {
			return this.get('index');
		}
	});

	return ColumnCollection;
});
