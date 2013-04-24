define([
	'jquery',
	'backbone',
	'm/FormModel',
	'm/PlainConfig',
	'v/FormView',
	'./data',
	'v/PropertyFormView',
	'v/LayoutView'
], function($, Backbone, FormModel, PlainConfig, FormView, config,
		PropertyFormView, LayoutView) {
	
	function resetForm () {
		window.propForm.reset();	
		if(window.formView != undefined) {
			window.formView.undelegateEvents();
			window.formView.remove();
			window.formView = undefined;
		}
		
		if(window.formModel != undefined) {
			window.formModel = undefined;
		}
	}

	function loadPlainConfig (guid, callback) {
		$.getJSON('plain/configs/' + guid, {}, function(data) {
			callback(data.content);
		});
	}

	function initializeCanvas (plainConfig) {
		// body...

		var newsConfig = PlainConfig.convert(plainConfig);
		var formConfig = {
			id: 'news-form-index',
			defaults: {
				layout: 'fit',
				labelWidth: 80 //px
			},
			rows: newsConfig 
		};

		window.formModel = new FormModel(formConfig);
		window.formView = new FormView({model:window.formModel});

		var el = window.formView.render().el;
		$('#formcanvas').append(el);
	}

	$(function() {
		var appLayout = new LayoutView();
		appLayout.render();

		window.propForm = new PropertyFormView();
		propForm.render();


		$('#btnAddRow').click(function(e) {
			window.model.addRow();
		});

		$('#btnRemoveRow').click(function(e) {
			console.log('remove last row');	
			window.model.removeLastRow();
		});

		$('#btnSave').click(function(e) {
			console.log('saving...');
			var rowsJson = window.formModel.getRows().toJSON();
			var content = PlainConfig.generate(rowsJson);

			var body = {
				content: content
			};
			$.post('plain/configs/123', body, function() {
				console.log('post success...');
			});
		});


		var Workspace = Backbone.Router.extend({
			routes: {
				'new': 'createForm',
				'edit': 'editForm',
				'cell/:row/:column': 'editCell'
			},
			createForm: function() {
				resetForm();
				loadPlainConfig('123', function(plainConfig) {
					initializeCanvas(plainConfig);
				});
			},
			editForm: function() {
				resetForm();
				loadPlainConfig('123', function(plainConfig) {
					initializeCanvas(plainConfig);
				});
			},
			editCell: function(row, column) {
				var currentRow = window.formModel.getRows().at(row);
				if(currentRow == undefined) {
					return;
				}

				var currentColumn = currentRow.getColumns().at(column);
				if(currentColumn == undefined) {
					return;
				}

				if(currentColumn.get('selected') == false) {
					currentColumn.set({
						selected: true
					});
				}

				var fieldModel = currentColumn.getContent();	

				propForm.loadData(fieldModel, currentColumn);
			}
		});
		
		router = new Workspace;
		Backbone.history.start();
	});
});


