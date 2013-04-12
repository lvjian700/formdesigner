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

		$('#btnAddRow').click(function(e) {
			model.addRow();
		});

		$('#btnRemoveRow').click(function(e) {
			console.log('remove last row');	
			model.removeLastRow();
		});
	});
});


