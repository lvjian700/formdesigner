describe("My first Test for FormDesigner", function() {
	var field = new FieldModel;

	it("ok",	function() {
		expect('text').toEqual(
			field.get('type') );
	});
});


