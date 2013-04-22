define([
	'jquery',
	'backbone',
	'm/FormModel',
	'm/PlainConfig',
	'v/FormView',
	'./data',
	'v/PropertyFormView',
	'text!tmpl/news_config.txt'
], function($, Backbone, FormModel, PlainConfig, FormView, config,
		PropertyFormView, plainConfig) {

	$(function() {
		var newsConfig = PlainConfig.convert(plainConfig);
		var formConfig = {
			id: 'news-form-index',
			defaults: {
				layout: 'fit',
				labelWidth: 80, //px
			},
			rows: newsConfig 
		};

		var model = new FormModel(formConfig);
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
				console.log('edit...');
				var currentRow = model.getRows().at(row);
				var currentColumn = currentRow.getColumns().at(column);
				var fieldModel = currentColumn.getContent();	
				console.log(fieldModel);
				
				propForm.loadData(fieldModel);
			}
		});
		
		router = new Workspace;
		Backbone.history.start();
	});
});


