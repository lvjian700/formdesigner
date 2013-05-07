define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
	
	var SaveFormView = Backbone.View.extend({
		el: '#save-model',
		events: {
			'click #btnCancelSave': 'close',
			'click #btnSaveConfig': 'post'
		},
		initialize: function() {

			this.form = this.$('#config-form');

			this.guid = this.$('#configGuid');
			this.name = this.$('#configName');
			this.type = this.$('#configType');
			this.orderNum = this.$('#orderNum');
			this.value = this.$('#configValue');
			this.preceptName = this.$('#preceptName');

			this.model.bind('change', this.render, this);
		},
		render: function() {
			this.guid.val(this.model.get('configGuid'));	
			this.name.val(this.model.get('configName'));
			this.type.val(this.model.get('configType'));
			this.orderNum.val(this.model.get('orderNum'));
			this.value.val(this.model.get('configValue'));

			this.preceptName.val(this.model.get('preceptName'));

			return this.el;
		},
		show: function() {
			this.$el.modal('show');
		},
		loadData: function(json) {
			console.log('load data..');
			console.log(json);
			this.model.set(json);
		},
		close: function(e) {
			if(e && e.preventDefault) {
				e.preventDefault();
			}
			this.$el.modal('hide');

		},
		post: function(e) {
			if(e && e.preventDefault) {
				e.preventDefault();	
			}

			this.model.set({
				configGuid: this.guid.val(),
				configName: this.name.val(),
				configType: this.type.val(),
				configValue: this.value.val(),
				orderNum: this.orderNum.val(),
				preceptName: this.preceptName.val()
			});
			
			var _this = this;
			var data = this.model.toJSON()
			console.log('posting data...');
			console.log(data);

			$.post(Configs.systemConfig.post, data, function(resp) {
				_this.close();	
			});
		}
	});

	return SaveFormView;
});


