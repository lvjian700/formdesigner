define([
	'jquery',
	'm/FormModel',
	'v/FormView',
	'./data',

], function($, FormModel, FormView, config) {
	$(function() {

		var model = new FormModel(config);
		var view = new FormView({model:model});
		var el = view.render().el;

		$('#formcanvas').append(el);
	});
});


