define([
	'backbone',
	'm/SystemConfigModel'
], function(Backbone, SystemConfigModel) {
	
	var ConfigCollection = Backbone.Collection.extend({
		model: SystemConfigModel,
		comparator: function(now, next) {
			var nowType = now.configType;
			var nextType = next.configType;

			if(nowType > nextType) return 1;
			if(nowType < nextType) return -1;

			var nowOrder = now.orderNum;
			var nextOrder = next.orderNum;

			if(nowOrder > nextOrder) return 1;
			if(nowOrder < nextOrder) return -1;

			return 0;
		},
		news: function() {
			var tmpls = this.where({
				configType: 10
			});

			return tmpls
		},
		topics: function() {
			var tmpls = this.where({
				configType: 12
			});

			return tmpls;
		},
	});


	return ConfigCollection;
});


