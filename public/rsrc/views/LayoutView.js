define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
	
	var LayoutView = Backbone.View.extend({
		el: 'body',
		events: {
		},
		initialize: function() {
			this.leftPanel = this.$('#left-panel');
			this.centerPanel = this.$('#center-panel');
			this.rightPanel = this.$('#right-panel');
		},
		render: function() {

		}
	});
	
	return LayoutView;
});


