require.config({
	baseUrl:'src/',
	paths: {
		"tmpl": "./templates",
		"jquery": "../assets/components/jquery/jquery",
		"moment": "../assets/components/moment/moment",
		"underscore": "../assets/components/underscore/underscore",
		"backbone": "../assets/components/backbone/backbone-min",
		"text": "../assets/components/text/text.js"
	},
	shim: {
        'underscore': {
          exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require(['jquery', 'models/FieldModel', 'models/SelectFieldModel'], 
	
	function($, FieldModel, SelectFieldModel) {
		//the jquery.alpha.js and jquery.beta.js plugins have been loaded.
		$(function() {
			var f = new FieldModel();
			console.log(f.toJSON());

			var s = new SelectFieldModel();
			console.log(s.toJSON());
		});
	}
);
