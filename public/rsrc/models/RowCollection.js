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
		resetIndexAttr: function() {
			// 重新设置index
			this.forEach(function(item, index, list) {
				if(item.get('index') <= index) {
					return;
				}

				item.set({index: index});
			});
		},
		/**
		 * @param index {int} 删除只定行, start at 0
		 */
		removeAt: function(index) {
			if(index < 0 || index > this.length - 1) {
				return;
			}
			var item = this.at(index);
			this.remove(item);
			this.resetIndexAttr();
		},
		/**
		 * @return Array{RowModel}
		 */
		findSelected: function() {
			var selectedItems = this.where({
				selected: true
			});

			return selectedItems;
		},
		removeSelected: function() {
			var items = this.findSelected();
			if(items == undefined || items.length == 0) {
				return;
			}
			this.remove(items);
			this.resetIndexAttr();
		},
		toFullJson: function() {
			this.forEach(function(row) {
				row.updateAttrs();
			});
			
			return this.toJSON();
		}
	});

	return RowCollection;
});
