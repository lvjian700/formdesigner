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
    var topicsTools = JSON.parse(topics_tmpl);
	
	var configModel = new SystemConfigModel();
	window.saveFormView = new SaveFormView({
		model: configModel
	});
	window.saveFormView.render();
	
	function resetForm () {
        if(window.chooseView != undefined) {
            window.chooseView.remove();
        }

		if(window.toolboxView) {
			toolboxView.remove();
		}

        window.toolboxView = new ToolboxView();

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

            var type = data.body.configType;
            var exists = PlainConfig.notInToolbox(data.body.configValue);
            console.log('exists: ' + exists.length);

            var all = [];
            if(data.body.configType == 10) {
                all = newsTools;
            } else if(data.body.configType == 12) {
                all = topicsTools;
            }
            console.log('all length:' + all.length);

            var toolboxData = _.filter(all, function(item) {

                for(var i = 0; i < exists.length; i++) {
                    var exist = exists[i];
                    if(item.name == exist.name) {
                        return false
                    }
                }

                return true;
            });

            console.log(toolboxData);

            var el = window.toolboxView.load(toolboxData).render().el;
            $('#left-panel').append(el);
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

		$('#btnList').click(function(e) {
			console.log('new from exist tmpl...');
            Backbone.history.navigate('list', {trigger: true});
		});

		$('#btnSave').click(function(e) {
			console.log('saving...');
			window.saveFormView.show();
		});


		var Workspace = Backbone.Router.extend({
			routes: {
				'new/news': 'createNews',
				'new/topics': 'createTopics',
				'list': 'showTmpls',
				'new/by/:guid': 'createForm',
				'edit/:guid': 'editForm',
                'del/:guid': 'delById',
				'cell/:row/:column': 'editCell',
                'fields/add/:name-:label': 'appendCell',
                'fields/del/:name-:label': 'removeCell'
			},
            appendCell: function(name, label) {
                console.log('add cell to model');
                if(window.formView == undefined ||
                    window.formView.model == undefined) {

                    this.navigate('list', {
                        trigger: true
                    });

                    return;
                }
                
                window.formView.clearCellSelect();
                window.formView.model.addProperty(name, label);
            },
            removeCell: function(name, label) {
                console.log('del cell from canvas. add the deleted one to toolbox.');
                window.formView.clearCellSelect();
                toolboxView.model.preAdd(name, label);
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
				
                var el = window.toolboxView.load(newsTools).render().el;
				$('#left-panel').append(el);

                drawCanvas('');
			},
			createTopics: function() {
				console.log('topics..');
                resetForm();

                var el = window.toolboxView.load(topicsTools).render().el;
				$('#left-panel').append(el);	

                drawCanvas('');
			},
            delById: function(guid) {
                var _this = this;
                $.post(SC.del, {configGuid: guid}, function(ret) {
                    _this.showTmpls();
                });
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
					
					$('#left-panel').append(el);
				});
			},
			editCell: function(row, column) {
				if(window.formModel == undefined
						|| window.formModel.getRows() == undefined) {
                    $('#btnList').click();
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


