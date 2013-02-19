requirejs.config({
	baseUrl:'rsrc/',
	paths: {
		"jquery": "../assets/components/jquery/jquery",
		"moment": "../assets/components/moment/moment",
		"underscore": "../assets/components/underscore/underscore",
		"backbone": "../assets/components/backbone/backbone",
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
		"tmpl": "./templates"
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

var loads = [
	'./app',
	'v/FieldView',
	'v/SelectFieldView',
	'v/DateFieldView',
	'v/TimelengthView'
];

requirejs(loads, function() {

});
