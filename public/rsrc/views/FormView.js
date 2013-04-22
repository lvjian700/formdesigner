define([
	'jquery',
	'underscore',
	'backbone',
	'm/FormModel',
	'./Core',
	'text!tmpl/form_layout.html',
	'./RowView'

], function($, _, Backbone, FormModel, Core, tmpl, RowView ) {

	var FormView = Backbone.View.extend({
		tagName: 'div',
		className: 'form-wrapper fit',
		template: Core.read_tmpl(tmpl),	
		events: {
		},
		initialize: function() {
			var r_json = this.model.get('rows');
			this.rowModels = this.model.getRows();
			this.rowViews = [];		

			this.rowModels.forEach(function(row) {
				var rowView = new RowView({
					model: row
				});
				rowView.parent = this;
				this.rowViews.push(rowView);
			}, this);
			
			this.rowModels.bind('add', this.addRow, this);
			this.rowModels.bind('remove', this.removeRow, this);
		},
		render:	function() {
			var tmpl = this.template(this.model.toJSON());
			this.$el.html(tmpl);

			this.form = this.$el.find('form');

			_.each(this.rowViews, function(row) {
				var rowEl = row.render().el;
				this.form.append(rowEl);
			}, this);

			return this;
		},
		getTemplate: function() {
			var el = this.render().el;
			return $('<p></p>').append(el).html();
		},
		clearCellSelect: function() {
			this.rowModels.forEach(function(rowModel) {
				rowModel.getColumns().forEach(function(columnModel) {
					columnModel.set({selected: false});
				});
			});
		},
		clearRowSelect: function() {
			this.rowModels.forEach(function(rowModel) {
				rowModel.set({selected: false});
			});
		},
		addRow: function(row, rows, options) {
			var rowView = new RowView({
				model: row
			});
			this.rowViews.push(rowView);
			this.form.append(rowView.render().el);
		},
		removeRow: function(row, rows, options) {
			var rowView = this.rowViews.pop();
			rowView.remove();
		}
	});

	return FormView;
});
