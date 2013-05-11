define([
	'm/emptyrow'	,
    'm/RowModel'
], function(emptyrow, RowModel) {

	return describe('测试emptyRowJson是否能够返回正确数值', function() {
		
		it('index 1', function() {
			var index = 1;
			var ret = emptyrow(index);
            expect(ret.index).toEqual(1);

            expect(ret.columns).not.toBeUndefined();
            expect(ret.columns.length).toBe(0);
		});

        it('构造空Row', function() {
            var json = emptyrow(0);
            var row = new RowModel(json);

            expect(row.get('index')).toBe(0);

            var cols = row.getColumns();
            expect(cols).not.toBeUndefined();
            expect(cols.length).toBe(0);
        });
	});
});


