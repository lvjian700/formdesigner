define([
	'jquery',
	'backbone'
], function($, Backbone) {
	
	var SystemConfigModel = Backbone.Model.extend({
		defaults: function() {
			return {
				configGuid: '',
				configName: '新建配置',
				configType: 0,
				orderNum: 0,
				configValue: '',
				preceptName: ''
			};
		},
		initialize: function() {
		}
	});
});


