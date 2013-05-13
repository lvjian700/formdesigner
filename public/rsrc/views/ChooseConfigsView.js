define([
	'jquery', 'underscore', 'backbone',
	'm/SystemConfigModel', 'm/ConfigCollection',
	'v/Core', 
	'text!tmpl/tmpls_list.html'
], function($, _, Backbone,
	SystemConfigModel, ConfigCollection,
	Core, tmpl) {
	
	var ChooseConfigView = Backbone.View.extend({
		tagName: 'div',
		className: 'tmpls-list',
		template: Core.read_tmpl(tmpl),
		events: {
		    'click .choose-del': 'deleteConfirm'	
		},
		initailize: function() {
			
		},
		render: function() {
			var array = this.model.toJSON();
			var html = this.template({
                data:array
            });

			this.$el.html(html);
			
			return this.el;
		},
        deleteConfirm: function(e) {
            return window.confirm('确认删除配置?');
        }
	});

	return ChooseConfigView;
});


