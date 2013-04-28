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

	function configById (guid, callback) {
		$.getJSON(Configs.systemConfig.get, {configGuid: guid}, function(data) {
			var form = $('#config-form')[0];
			for(var name in data.body) {
				if(form[name] == undefined) {
					continue;
				}

				form[name].value = data.body[name];
			}

			callback(data.body.configValue);
		});
	}

	function drawCanvas (plainConfig) {
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
			window.formModel.addRow();
		});

		$('#btnRemoveRow').click(function(e) {
			console.log('remove last row');	
			window.formModel.removeLastRow();
		});
		$('#btnRemoveSelected').click(function() {
			console.log('remove row selected');
			window.formModel.removeSelected();
		});

        $('#btnNew').click(function(e) {
            console.log('new ...');
            Backbone.history.navigate('#new', {trigger: true});
        });

		$('#btnSave').click(function(e) {
			console.log('saving...');
			var rowsJson = window.formModel.getRows().toJSON();
			var content = PlainConfig.generate(rowsJson);

			var body = {
				content: content
			};
			$.post(Configs.systemConfig.save, body, function() {
				console.log('post success...');

			});
		});


		var Workspace = Backbone.Router.extend({
			routes: {
				'new': 'createForm',
				'edit/:guid': 'editForm',
				'cell/:row/:column': 'editCell'
			},
			createForm: function() {
				var guid = '5105E398-01B1-AF50-4459-24F6F186836E';
				this.navigate('edit/' + guid, {
					trigger: true
				});
				/*
				resetForm();
				configById(guid, function(plainConfig) {
					drawCanvas(plainConfig);
				});
				*/
			},
			editForm: function(guid) {
				resetForm();
				configById(guid, function(plainConfig) {
					drawCanvas(plainConfig);
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


