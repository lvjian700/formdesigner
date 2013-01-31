// layout_views.js
// dependences:
//	core.js
//		Fields
//
var ColumnView = Backbone.View.extend({
	tagName: 'div',
	events: {

	},

	initialize: function () {
		var colspan = this.model.get('colspan');
		var cls = 'col-' + colspan;
		this.$el.addClass(cls);

		this.model.bind('change:content', this.contentUpdated, this);
		this.model.bind('change:colspan', this.colspanUpdated, this);
		
		var fieldModel = this.model.getContent();

		this.contentView = Fields.create({
			model: fieldModel
		});
		this.contentView.parent = this;
	},
	render: function () {
		var contentEl = this.contentView.render().el;
		this.$el.html(contentEl);

		return this;
	},
	getTemplate: function() {
		var el = this.render().el;
		return $('<p></p>').append(el).html();
	},
	contentUpdated: function(e) {
		this.clearView();
		
		var fieldModel = this.model.getContent();
		this.contentView = new FieldView({
			model: fieldModel
		});
		this.contentView.parent = this;

		this.render();
	},
	clearView: function() {
		this.contentView.remove();	
		this.$el.empty();
	},
	colspanUpdated: function(e) {
		var preview = this.model.previous('colspan');
		var preCls = 'col-' + preview;
		
		var colspan = this.model.get('colspan');
		var cls = 'col-' + colspan;

		this.$el.addClass(cls).removeClass(preCls);
	}
});

var RowView = Backbone.View.extend({
    tagName: 'div',
    events: {
    },
    initialize: function() {
        var count = this.model.get('columnCount');
        var cls = 'row-' + count;
        this.$el.addClass(cls);

		var layout = this.model.get('layout');
		this.$el.addClass(layout);

        this.columnModels = this.model.getColumns();
        this.columnViews = [];
            
        this.columnModels.forEach(function(colModel) {
            var colView = new ColumnView({
                model: colModel
            });
            colView.parent = this;      
            this.columnViews.push(colView);
        }, this);
    },
    render: function() {
        _.each(this.columnViews, function(colView) {
            var colEl = colView.render().el;
            this.$el.append(colEl);
        }, this);

		this.model.bind('change:columnCount', this.columnCountUpdated, this);
        return this;
    },
	getTemplate: function() {
		var el = this.render().el;
		return $('<p></p>').append(el).html();
	},
    clearView: function() {
        _.each(this.columnViews, function(col) {
            col.remove();
        }, this);

        this.$el.empty();
    },
	columnCountUpdated: function() {
		var pre = this.model.previous('columnCount');
		var count = this.model.get('columnCount');

		this.$el.removeClass('row-' + pre)
			.addClass('row-' + count);
	},
    columnAdded: function() {
    },
    columnDeleted: function() {
    },
    columnUpdated: function() {
    }
});

var FormView = Backbone.View.extend({
	tagName: 'div',
	className: 'form-wrapper fit',
	template: read_tmpl('#tmpl-form'),	
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






