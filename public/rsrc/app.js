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

		var propForm = new PropertyFormView();
		propForm.render();

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
				var currentRow = model.getRows().at(row);
				var currentColumn = currentRow.getColumns().at(column);
				var fieldModel = currentColumn.getContent();	
				
				propForm.loadData(fieldModel);
			}
		});
		
		router = new Workspace;
		Backbone.history.start();
	});
});


