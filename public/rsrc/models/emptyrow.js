define([
], function() {
	function emptyRowJson (rowIndex) {
		var rowsCfg = {
			index: rowIndex,
			layout: 'fit',
			columns: []
		};

		return rowsCfg;
	}
	
	return emptyRowJson;
});



