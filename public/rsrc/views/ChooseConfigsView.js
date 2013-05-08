define([
	'jquery', 'underscore', 'backbone',
	'm/SystemConfigModel', 'm/ConfigCollection',
	'v/Core', 
	'text!tmpl/tmpls_list.html'
], function($, _, Backbone,
	SystemConfigModel, ConfigCollection,
	Core, tmpl) {
	
	var ChooseConfigView = Backbone.view.extend({
		tagName: 'div',
		className: 'tmpls-list',
		template: Core.read_tmpl(tmpl),
		events: {
		},
		initailize: function() {
		},
		render: {
			var array = this.model.toJSON();
			var html = this.template(array);

			this.$el.html(html);
			
			return this.el;
		}
	});

	return ChooseConfigView;
});


