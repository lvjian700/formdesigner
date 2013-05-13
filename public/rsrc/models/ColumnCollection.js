define([
	'backbone',
	'./ColumnModel'
], function(Backbone, ColumnModel) {

	var ColumnCollection = Backbone.Collection.extend({
		model: ColumnModel,
		comparator: function() {
			return this.get('index');
		},
		resetIndexAttr: function() {
			// 重新设置index
			this.forEach(function(item, index, list) {
				if(item.get('index') <= index) {
					return;
				}

				item.set({index: index}, {silent: true});
			});

		},
        removeAt: function(index) {
			if(index < 0 || index > this.length - 1) {
				return;
			}
			var item = this.at(index);
			this.remove(item);
			this.resetIndexAttr();
        },
        widthSpace: function() {
            var width = 1.0;
            this.forEach(function(col) {
                width -= col.get('width');
            });

            return width;
        },
        appendCell: function(name, label) {
            // 计算index
            var index = this.length;

            var json = {
                index: index,
                width: 0.25,
                selected: false,
                content: {
                    id: name + '_field',
                    name: name,
                    label: label,
                    type: 'text',
                    value: '',
                    required: false
                }
            };
            
            var column = new ColumnModel(json);
            // 添加列
            this.add([column]);
        }
	});

	return ColumnCollection;
});
