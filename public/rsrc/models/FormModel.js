define([
	'backbone',
    'm/RowModel',
	'./RowCollection',
	'./emptyrow'	
], function(Backbone, RowModel, RowCollection, emptyRowJson) {
		
	var FormModel = Backbone.Model.extend({
		defaults: function() {
			return {
				id: '',
				defaults: {
					layout: 'fit',
					labelWidth: 80, //px
				},
				rows: []
			};
		},
		initialize:	function() {
            
			var r_json = this.get('rows');

			this.rows = new RowCollection(r_json);
		},
		addRow: function() {
			var index = this.rows.size();
			var json = emptyRowJson(index);	
			this.rows.add([
				json
			]);
		},
        addProperty: function(name, label) {
            var length = this.rows.length; 

            if(length == 0) {
                console.log('add row in addProperty of FormModel');
                this.addRow();
            }

            var index = this.rows.length - 1;
            var row = this.rows.at(index);

            var cols = row.getColumns();
            var widthSpace = cols.widthSpace();

            if(widthSpace < 0.25) {
                this.addRow(); 
            }
            
            var lastRow = this.rows.at(this.rows.length - 1);
            console.log('add property to columns ...');
            row.getColumns().appendCell(name, label); 
        },
		removeAt: function(index) {
			this.rows.removeAt(index);
		},
		removeSelected: function() {
			this.rows.removeSelected();
		},
		removeLastRow: function() {
			this.rows.pop();
		},
		updateAttrs: function() {
			console.log('update form model attrs');
			var json = this.rows.toJSON();

			this.set({
				rows: json
			});
		},
		setRows: function(rowsCollection) {
			this.rows = rowsCollection;
			this.rows.parent = this;

			this.updateAttrs();
		},
		getRows: function() {
			return this.rows;
		}
	});

	return FormModel;
});


