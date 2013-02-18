requirejs.config({
	baseUrl:'rsrc/',
	paths: {
		"tmpl": "./templates",
		"jquery": "../assets/components/jquery/jquery",
		"moment": "../assets/components/moment/moment",
		"underscore": "../assets/components/underscore/underscore",
		"backbone": "../assets/components/backbone/backbone-min",
		"text": "../assets/components/text/text"
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

requirejs(['jquery', 'models/FieldModel', 'models/SelectFieldModel',
		'views/FieldView', 'views/Fields'], 
	
	function($, FieldModel, SelectFieldModel, FieldView, Fields) {
		//the jquery.alpha.js and jquery.beta.js plugins have been loaded.
		$(function() {
			var f = new FieldModel();
			console.log(f.toJSON());
			f.set({label: 'haha'});

			var v = Fields.create({
				model: f
			});	

			$('body').append(v.render().el);

			var s = new SelectFieldModel();
			console.log(s.toJSON());
		});
	}
);
