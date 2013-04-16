define([
	'm/emptyrow'	
], function(emptyrow) {

	return describe('测试emptyRowJson是否能够返回正确数值', function() {
		
		it('index 1', function() {
			var index = 1;
			var ret = emptyrow(index);

			expect(ret).toEqual({
				index: 1,
				layout: 'fit',
				columns: [{
					index: 0,
					width: 0.33,
					content: {
						id: 'creater_field',
						name: 'creater',
						label: '作者',
						type: 'text',
						value: '',
						required: true
					}
				}, {
					index: 1,
					width: 0.33,
					content: {
						id: 'createTime_field',
						name: 'createTime',
						label: '创建时间',
						type: 'text',
						value: '',
						required: true
					}
				}, {
					index: 2,
					width: 0.33,
					content: {
						id: 'videoLength_field',
						name: 'videoLength',
						label: '视频长度',
						type: 'text',
						value: '',
						required: false
					}
				}]
			});
		});
	});
});


