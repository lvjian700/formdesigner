define([
], function() {
	function emptyRowJson (rowIndex) {
		var rowsCfg = {
			index: rowIndex,
			layout: 'fit',
            selected: false,
			columns: []
		};

		return rowsCfg;
	}
	
	return emptyRowJson;
});



