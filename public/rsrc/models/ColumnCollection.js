define([
	'backbone',
	'./ColumnModel'
], function(Backbone, ColumnModel) {

	var ColumnCollection = Backbone.Collection.extend({
		model: ColumnModel,
		comparator: function() {
			return this.get('index');
		},
        widthSpace: function() {
            var width = 1.0;
            this.forEach(function(col) {
                width -= col.get('width');
            });

            console.log('width space: ' + width);
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
