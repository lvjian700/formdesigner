requirejs.config({
	baseUrl:'rsrc/',
	paths: {
		"jquery": "../assets/components/jquery/jquery",
		"moment": "../assets/components/moment/moment",
		"underscore": "../assets/components/underscore/underscore",
		"backbone": "../assets/components/backbone/backbone-min",
		"text": "../assets/components/text/text",

		/* bootstrap.js & plugins*/
		"boostrap": "../assets/components/bootstrap/js/bootstrap.min",
		"bootstrap-date": "../assets/components/boostrap-datepicker/bootstrap-datepicker",
		"bootstrap-time": "../assets/components/boostrap-timepicker/bootstrap-timepicker",
		
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
		'boostrap-date': ['bootstrap'],
		'boostrap-time': ['boostrap'],

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
	'jquery', 'jasmine-jquery',

], function($, jasmine) {

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
		specs.push('spec/models/ColumnModelSpec');

		$(function() {
			requirejs(specs, function() {
				jasmineEnv.execute();
			});
		});
	}
);
