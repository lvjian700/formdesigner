define([
	'backbone',
	'./RowModel'
], function(Backbone, RowModel) {
	
	var RowCollection = Backbone.Collection.extend({
		model: RowModel,
        comparator: function(now, next) {
            var nowIndex = now.get('index');
            var nextIndex = now.get('index');

            if (nowIndex > nextIndex) return 1;
            if (nowIndex < nextIndex) return -1;

            return 0;
        }
	});

	return RowCollection;
});
