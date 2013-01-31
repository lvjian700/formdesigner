function read_tmpl (tmplSelector) {
	return _.template( $(tmplSelector).html() )
}

var Fields =  {
	f_types: {},
	reg: function (fieldType, viewCls) {
		this.f_types[fieldType] = viewCls;
	},
	unreg: function(fieldType) {
		this.f_types[fieldType] = undefined;
	},
	getCls: function(fieldType) {
		return this.f_types[fieldType];			 
	},
	clearRegs: function() {
		this.f_types = {};
	},
	createView: function(options) {
		var f_type = options.model.get('type');
		var cls = this.getCls(f_type);
		var view = new cls(options);	

		return view;
	}
};
