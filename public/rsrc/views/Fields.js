define(['./FieldView'], function(FieldView) {

	function FieldViews() {
		this.f_types = {};
	};

	FieldViews.prototype.reg = function (fieldType, viewCls) {
		this.f_types[fieldType] = viewCls;
	};
	FieldViews.prototype.unreg = function (fieldType, viewCls) {
		this.f_types[fieldType] = viewCls;
	};
	FieldViews.prototype.getCls = function(fieldType) {
		return this.f_types[fieldType];
	};
	FieldViews.prototype.clear = function() {
		this.f_types = {};
	};
	FieldViews.prototype.create = function(options) {
		var f_type = options.model.get('type');
		var cls = this.getCls(f_type);

		if(cls === undefined) {
			return null;
		}

		var view = new cls(options);	

		return view;
	};

	var Fields = new FieldViews();

	return Fields;
});

