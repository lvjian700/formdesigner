define(['models/SelectFieldModel'], function(SelectFieldModel) {

	return describe("SelectFieldModel测试", function() {

		var select = false;

		beforeEach(function() {
			select = new SelectFieldModel();
		});

		afterEach(function() {
			select = false;
		});

		it("默认数据必须是这样: {type:\'select', value:\'\'}", 
			function() {
				
				expect(select.get('type'))
					.toEqual('select')

				expect(select.getValue())
					.toEqual('');
			});
	});

});
