define([
	'jquery',
	'backbone',
	'm/FormModel',
	'm/PlainConfig',
	'm/SystemConfigModel',
    'm/ConfigCollection',
    'm/ToolboxCollection',
	'v/FormView',
	'./data',
	'v/PropertyFormView',
	'v/LayoutView',
	'v/SaveFormView',
    'v/ChooseConfigsView',
    'v/ToolboxView',
    'text!tmpl/news_tmpls.js',
    'text!tmpl/topics_tmpls.js'
], function($, Backbone, 
		FormModel, PlainConfig, SystemConfigModel, 
        ConfigCollection, ToolboxCollection,
		FormView, 
		config,
		PropertyFormView, LayoutView, SaveFormView,
        ChooseConfigsView, ToolboxView,
        news_tmpl, topics_tmpl) {

    var newsTools = JSON.parse(news_tmpl);
    var topicsTools = JSON.parse(news_tmpl);
	
    window.toolboxView = new ToolboxView();

	var configModel = new SystemConfigModel();
	window.saveFormView = new SaveFormView({
		model: configModel
	});
	window.saveFormView.render();
	
	function resetForm () {
        if(window.chooseView != undefined) {
            window.chooseView.remove();
        }

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

		$('#btnNewNews').click(function(e) {
			console.log('new news tmpl ...');
            Backbone.history.navigate('#new/news', {trigger: true});
		});

		$('#btnNewTopics').click(function(e) {
			console.log('new topics tmpl...');
            Backbone.history.navigate('#new/topics', {trigger: true});
		});

		$('#btnNewFrom').click(function(e) {
			console.log('new from exist tmpl...');
            Backbone.history.navigate('#new/from', {trigger: true});
		});

		$('#btnSave').click(function(e) {
			console.log('saving...');
			window.saveFormView.show();
		});


		var Workspace = Backbone.Router.extend({
			routes: {
                'new/': 'create',
				'new/news': 'createNews',
				'new/topics': 'createTopics',
				'new/from': 'showTmpls',
				'new/by/:guid': 'createForm',
				'edit/:guid': 'editForm',
				'cell/:row/:column': 'editCell',
                'fields/add/:name-:label': 'appendCell'
			},
            appendCell: function(name, label) {
                console.log('add cell');
                console.log(name);
                console.log(label);
            },
            create: function() {
				var guid = '5105E398-01B1-AF50-4459-24F6F186836E';
				this.navigate('edit/' + guid, {
					trigger: true
				});

				resetForm();

				configById(guid, function(plainConfig) {
					drawCanvas(plainConfig);
                    $('#configGuid').val('');
				});
            },
			createForm: function(guid) {
				resetForm();

                if(window.chooseView != undefined) {
                    window.chooseView.remove();
                }

				configById(guid, function(plainConfig) {
					drawCanvas(plainConfig);
                    $('#configGuid').val('');
				});
			},
			createNews: function() {
				console.log('news...');
                resetForm();
                
                window.toolboxView.load(newsTools);
			},
			createTopics: function() {
				console.log('topics..')
                resetForm();

                window.toolboxView.load(topicsTools);
			},
			showTmpls: function() {
                $.getJSON(SC.list, {}, function(array) {
                    console.log('load system config list ...');
                    console.log(array);

                    var cn = new ConfigCollection(array);
                    window.chooseView = new ChooseConfigsView({
                        model: cn
                    });
					var el = chooseView.render();
					$('#formcanvas').html(el);
                });
			},
			editForm: function(guid) {
				resetForm();

				configById(guid, function(plainConfig) {
					drawCanvas(plainConfig);
				});
			},
			editCell: function(row, column) {
				if(window.formModel == undefined
						|| window.formModel.getRows() == undefined) {
					this.navigate('#new', {
						trigger: true
					});

					return;
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


