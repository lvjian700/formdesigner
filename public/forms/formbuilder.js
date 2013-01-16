(function(window) {
	var formbuilder = {
		base: '',
		main: {
			html: 'form.html'
		},
		config: function(opts) {
			$.extend(this, opts);
		},
		load: function($target, module) {
			var url = [this.base, 'forms', module,
				this.main.html].join("/");
			console.log(url);
			$target.load(url,  function() {
				console.log('load success');
			});
		}
	};

	window.fb = formbuilder;
})(window);
