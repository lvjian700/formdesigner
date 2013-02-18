define([
	'underscore'	
], function(_) {

	return {
		read_tmpl: function(html) {
			return _.template(html);
		}
	};
});
