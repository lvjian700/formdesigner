requirejs.config({
	baseUrl:'rsrc/',
	paths: {
		"jquery": "../assets/components/jquery/jquery",
		"moment": "../assets/components/moment/moment",
		"underscore": "../assets/components/underscore/underscore",
		"backbone": "../assets/components/backbone/backbone-min",
		"text": "../assets/components/text/text",
		"boostrap": "../assets/components/bootstrap/js/bootstrap.min",
		"jquery-select2": "../assets/components/select2/select2.min",
		
		"m": "./models",
		"v": "./views",	
		"tmpl": "./templates",

		"jasmine": "../assets/components/jasmine/jasmine",
		"jasmine-html": "../assets/components/jasmine/jasmine-html",
		"jasmine-jquery": "../assets/components/jasmine/jasmine-jquery",
		"spec": "../rspec"
	},
	shim: {
        'underscore': {
          exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
		'jasmine': {
			exports: 'jasmine'
		},
		'jasmine-html': {
			deps: ['jasmine'],
			exports: 'jasmine'
		},
		'jasmine-jquery': {
			deps: ['jquery', 'jasmine-html'],
			exports: 'jasmine'
		},
		'bootstrap': ['jquery'],
		'jquery-select2': ['jquery']
    }
});

requirejs(['jquery', 'models/FieldModel', 'models/SelectFieldModel',
		'views/FieldView', 'views/Fields', 'jasmine-jquery'], 
	
	function($, FieldModel, SelectFieldModel, FieldView, Fields, jasmine) {

		var jasmineEnv = jasmine.getEnv();
		jasmineEnv.updateInterval = 1000;

		var htmlReporter = new jasmine.HtmlReporter();

		jasmineEnv.addReporter(htmlReporter);

		jasmineEnv.specFilter = function(spec) {
			return htmlReporter.specFilter(spec);
		};

		var specs = [];

		specs.push('spec/models/FieldModelSpec');
		specs.push('spec/views/FieldViewSpec');
		specs.push('spec/models/SelectFieldModelSpec');
		specs.push('spec/views/SelectFieldViewSpec');

		$(function() {
			requirejs(specs, function() {
				jasmineEnv.execute();
			});
		});
	}
);
