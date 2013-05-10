requirejs.config({
	baseUrl:'rsrc/',
	paths: {
		"jquery": "../assets/components/jquery/jquery",
		"moment": "../assets/components/moment/moment",
		"underscore": "../assets/components/underscore/underscore",
		"backbone": "../assets/components/backbone/backbone-min",
		"text": "../assets/components/text/text",

		/* bootstrap.js & plugins*/
		"bootstrap": "../assets/components/bootstrap/js/bootstrap.min",
		"bootstrap-date": "../assets/components/bootstrap-datepicker/bootstrap-datepicker",
		"bootstrap-time": "../assets/components/bootstrap-timepicker/js/bootstrap-timepicker",
		
		/*jquery plugins*/
		"jquery-select2": "../assets/components/select2/select2.min",
		
		/* source code aliase */
		"m": "./models",
		"v": "./views",	
		"tmpl": "./templates",
		
		/* jasmine test */
		"spec": "../rspec",
		"jasmine": "../assets/components/jasmine/jasmine",
		"jasmine-html": "../assets/components/jasmine/jasmine-html",
		"jasmine-jquery": "../assets/components/jasmine/jasmine-jquery"
	},
	shim: {
        'underscore': {
          exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

		'bootstrap': ['jquery'],
		'bootstrap-date': ['bootstrap'],
		'bootstrap-time': ['bootstrap'],

		'jquery-select2': ['jquery'],

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
		}
    }
});

requirejs([
	'jquery', 'backbone',
	'jasmine-jquery',
], function($, Backbone, jasmine) {

		var jasmineEnv = jasmine.getEnv();
		jasmineEnv.updateInterval = 1000;

		var htmlReporter = new jasmine.HtmlReporter();

		jasmineEnv.addReporter(htmlReporter);

		jasmineEnv.specFilter = function(spec) {
			return htmlReporter.specFilter(spec);
		};

		var specs = [];

		specs.push('spec/models/emptyrowSpec');
		specs.push('spec/models/PlainConfigSpec');

		specs.push('spec/models/FieldModelSpec');
		specs.push('spec/views/FieldViewSpec');
		specs.push('spec/models/SelectFieldModelSpec');
		specs.push('spec/views/SelectFieldViewSpec');
		specs.push('spec/views/TimelengthFieldViewSpec');

		specs.push('spec/models/ColumnModelSpec');
		specs.push('spec/models/ColumnCollectionSpec');
		specs.push('spec/views/ColumnViewSpec');

		specs.push('spec/models/RowModelSpec');
		specs.push('spec/models/RowCollectionSpec');
		specs.push('spec/views/RowViewSpec');

		specs.push('spec/models/ConfigCollectionSpec');

		specs.push('spec/FormSpec');
		specs.push('spec/views/PropertyFormViewSpec');
		specs.push('spec/views/SaveFormViewSpec');

		specs.push('spec/models/ToolboxSpec');
		specs.push('spec/views/ToolboxViewSpec');


		$(function() {
			requirejs(specs, function() {
				jasmineEnv.execute();
			});
		});
	}
);
