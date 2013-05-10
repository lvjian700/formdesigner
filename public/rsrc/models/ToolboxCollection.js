define([
    'backbone',
    'm/ToolboxModel'
], function(Backbone, ToolboxModel) {
    
    var ToolboxCollection = Backbone.Collection.extend({
        model: ToolboxModel,
		preAdd: function(name, label) {
			this.add([{
				name: name,
				label: label
			}], {
				at: 0
			});
		},
		notIn: function(array) {
			var unused = this.reject(function(item) {
				var name = item.get('name');

				for (var i = 0; i < array.length; i++) {
					var existed = array[i];

					if(name == existed.name) {
						return true;
					}
				};

				return false;
			});
			
			return unused;
		}
    });

    return ToolboxCollection;
});
