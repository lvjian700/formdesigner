define([
	'm/SystemConfigModel',
	'm/ConfigCollection'
], function(SystemConfigModel, ConfigCollection) {
	
	describe('测试ConfigCollection', function() {
		var datas = [{
				configGuid: '',
				configName: '新建配置',
				configType: 10,
				orderNum: 1,
				configValue: '',
				preceptName: ''
		}, {
				configGuid: '',
				configName: '新闻2',
				configType: 10,
				orderNum: 2,
				configValue: '',
				preceptName: ''
		}, {
				configGuid: '',
				configName: '选题配置',
				configType: 12,
				orderNum: 0,
				configValue: '',
				preceptName: ''
		}];
	
		var cn = false;

		beforeEach(function() {
			cn = new ConfigCollection(datas);
		});

		afterEach(function() {
			cn = false;
		});

		it('初始化数据类型以及数据一致', function() {
			expect(cn.constructor).toEqual(ConfigCollection);
			expect(cn.length).toBe(3);
			var json = cn.toJSON();
			expect(json).toEqual(datas);
		});
		
		it('过滤news', function() {
			var newsConfigs = cn.news();
			expect(cn.length).toBe(3);
			expect(newsConfigs.length).toBe(2);
		});

		it('过滤topics', function() {
			var topics = cn.topics();
			expect(cn.length).toBe(3);
			expect(topics.length).toBe(1);
		});
	});
});


