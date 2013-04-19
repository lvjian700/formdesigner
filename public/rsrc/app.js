define([
	'jquery',
	'backbone',
	'm/FormModel',
	'v/FormView',
	'./data',
	'v/PropertyFormView'
], function($, Backbone, FormModel, FormView, config,
		PropertyFormView) {
	$(function() {
		var model = new FormModel(config);
		var view = new FormView({model:model});
		var el = view.render().el;

		var propertyForm = new PropertyFormView();

		$('#formcanvas').append(el);

		$('#btnAddRow').click(function(e) {
			model.addRow();
		});

		$('#btnRemoveRow').click(function(e) {
			console.log('remove last row');	
			model.removeLastRow();
		});

		var Workspace = Backbone.Router.extend({
			routes: {
				'cell/:row/:column': 'editCell'
			},
			editCell: function(row, column) {
				console.log('editing cell');
				var column = model.getRows().at(row)
					.getColumns().at(column);
				var fieldModel = column.getContent().model;	
				console.log(fieldModel);	
				

			}
		});
	});
});


