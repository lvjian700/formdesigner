define([
	'backbone',
	'./RowModel'
], function(Backbone, RowModel) {
	
	var RowCollection = Backbone.Collection.extend({
		model: RowModel,
        comparator: function(now, next) {
            var nowIndex = now.get('index');
            var nextIndex = next.get('index');

            if (nowIndex > nextIndex) return 1;
            if (nowIndex < nextIndex) return -1;

            return 0;
        },
		/**
		 * @return Array{RowModel}
		 */
		findSelected: function() {
			var selectedItems = this.where({
				selected: true
			});

			return selectedItems
		},
		removeSelected: function() {
			var items = this.findSelected();
			if(items == undefined || items.length == 0) {
				return;
			}
			this.remove(items);
		}
	});

	return RowCollection;
});
