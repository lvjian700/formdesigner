describe("FieldModel testing", function() {

	var field = false;
	
	beforeEach(function() {
		field = new FieldModel();
	});

	afterEach(function() {
		field = false;
	});

	it("Default value must be {type: \'text\', required: false}",
		function() {
			expect(field.get('type'))
				.toEqual('text');

			expect(field.isRequired())
				.toEqual(false);
		});

	it("setName() should change id, id should be ${name}_field.",
		function() {
			field.setName('fieldName');

			expect('fieldName').toEqual(
				field.getName() 
			);

			expect('fieldName_field').toEqual(
				field.get('id') 
			);
		});
});

describe("SelectModel Testing", function() {
	var select = false;

	beforeEach(function() {
		select = new SelectFieldModel();
	});

	afterEach(function() {
		select = false;
	});

	it("Default value must be {type:\'select', value:{val:\'\', text: \'\'}}", 
		function() {
			
			expect(select.get('type'))
				.toEqual('select')

			expect(select.getValue())
				.toEqual('');
		});
});

