define([ 'backbone', './ColumnModel' ], function(Backbone, ColumnModel) {

	var ColumnCollection = Backbone.Collection.extend({
		model : ColumnModel,
		comparator : function(now, next) {
			var nowIndex = now.get('index');
			var nextIndex = next.get('index');

			if (nowIndex > nextIndex)
				return 1;
			if (nowIndex < nextIndex)
				return -1;

			return 0;
		},
		resetIndexAttr : function() {
			// 重新设置index
			this.forEach(function(item, index, list) {

				item.set({
					index : index
				});
			});
		},
		removeAt : function(index) {
			if (index < 0 || index > this.length - 1) {
				return;
			}
			var item = this.at(index);
			this.remove(item);
			this.resetIndexAttr();
		},
		insertAt : function(model, index) {
			index = parseInt(index);

			model.off();

			model.set({
				index : index,
				selected : false
			}, {
				silent : true
			});

			// 重新整理 index
			for ( var i = 0; i < this.length; i++) {
				var item = this.at(i);

				var c_index = item.get('index');

				if (c_index >= index) {
					var now_index = c_index + 1;
					item.set("index", now_index);
					
					console.log(item);
				}
			}

			var space = this.widthSpace();

			if (space >= 0.25) {
				console.log('add directly..');
				if (model.get('width') > 0.25) {
					model.set({
						width : 0.25
					});
				}

				console.log('insert model to target row');
				this.add([ model ], {
					at : index
				});

				return;
			}

			var size = this.length;
			var w = 1.0 / (size + 1);

			console.log('resize width...');
			this.forEach(function(item) {
				item.set({
					width : w
				});
			});

			model.set({
				width : w
			}, {
				silent : true
			});

			console.log('insert model to target row');
			this.add([ model.toJSON() ], {
				at : index
			});
			
		},
		widthSpace : function() {
			var width = 1.0;

			this.forEach(function(col) {
				width -= col.get('width');
			});

			return width;
		},
		appendCell : function(name, label) {
			// 计算index
			var index = this.length;

			var json = {
				index : index,
				width : 0.25,
				selected : false,
				content : {
					id : name + '_field',
					name : name,
					label : label,
					type : 'text',
					value : '',
					required : false
				}
			};

			var column = new ColumnModel(json);
			// 添加列
			this.add([ column ]);
		}
	});

	return ColumnCollection;
});
