define([
	'jquery',
	'backbone',
	'm/FormModel',
	'm/PlainConfig',
	'm/SystemConfigModel',
	'v/FormView',
	'./data',
	'v/PropertyFormView',
	'v/LayoutView',
	'v/SaveFormView'
], function($, Backbone, 
		FormModel, PlainConfig, SystemConfigModel,
		FormView, 
		config,
		PropertyFormView, LayoutView, SaveFormView) {

	var configModel = new SystemConfigModel();
	window.saveFormView = new SaveFormView({
		model: configModel
	});
	window.saveFormView.render();
	
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
			window.saveFormView.loadData(data.body);
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
			window.saveFormView.show();
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
				if(window.formModel === undefined) {
					this.navigate('#new', {
						trigger: true
					});
				}
				
				var currentRow = window.formModel.getRows().at(row);
				if(currentRow == undefined) {
					this.navigate('#new', {
						trigger: true
					});
					return;
				}

				var currentColumn = currentRow.getColumns().at(column);
				if(currentColumn == undefined) {
					this.navigate('#new', {
						trigger: true
					});
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


