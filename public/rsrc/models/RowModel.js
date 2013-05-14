define([
	'backbone',
	'./ColumnCollection'
], function(Backbone, ColumnCollection) {

	var RowModel = Backbone.Model.extend({
		defaults: function() {
			return {
				index: 0,
				layout: 'fit',
				selected: false,
				columns: []
			};
		},
		initialize:	function() {
			if(this.get('selected') == undefined) {
				this.set({
					selected: false
				}, { silent: true});
			}

			var c_json = this.get('columns');
			this.columns = new ColumnCollection(c_json);
			this.columns.parent = this;
			
			this.updateAttrs();
            this.columns.bind('add', this.updateAttrs, this);
            this.columns.bind('remove', this.onRemoved, this);
		},
		
		updateAttrs: function() {
            this.columns.resetIndexAttr();
            var json = this.columns.toJSON();

			this.set({
				columns: json
			}, { silence: true });
		},
		onRemoved: function() {
			console.log('on column removed...');
			if(this.columns.length == 0) {
				console.log('destroy empty row');
				this.destroy();
				return;
			}
			
			this.updateAttrs();
		},
		setColumns: function(columnCollection) {
			this.columns = columnCollection;
			this.columns.parent = this;
			
			this.updateAttrs();
		},
		getColumns: function() {
			return this.columns;
		}
	});

	return RowModel;
});
