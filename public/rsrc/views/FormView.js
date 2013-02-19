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
		}
	});

	return FormView;
});
