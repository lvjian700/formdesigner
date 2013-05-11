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
            var width = 0.0;
            this.forEach(function(col) {
                width += col.get('width');
            });

            return 1.0 - width;
        },
        appendCell: function(name, label) {
            console.log('append cell to columns ...');
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
            console.log('append success.');
        }
	});

	return ColumnCollection;
});
