define([
	'jquery',
	'underscore',
	'backbone',
	'm/FieldModel'
], function($, _, Backbone, FieldModel) {
	
	var PropertyFormView = Backbone.View.extend({
		el: '#prop-form',
		events: {
			'change': 'updateModel',
			'click #ck-required': 'updateModel',
            'click #delCell': 'delCell',
            'click #btnMove': 'moveCell'
		},
		initialize: function() {
		},
		render: function() {
			this.widthInput = this.$('#ipt-width');
			this.nameInput = this.$('#ipt-name');
			this.labelInput = this.$('#ipt-label');
			this.typeSelect = this.$('#sel-type');
			this.requiredCheck = this.$('#ck-required');

            this.delBtn = this.$('#delCell');

            this.rowInput = this.$('#ipt-row');
            this.columnInput = this.$('#ipt-column');

			return this.el;
		},
		loadData: function(field, column, row) {
			this.fieldModel = field;
			this.columnModel = column;
            this.rowModel = row;

			this.widthInput.val(this.columnModel.get('width'));
			
			this.nameInput.val(this.fieldModel.getName());
			this.labelInput.val(this.fieldModel.getLabel());
			this.typeSelect.val(this.fieldModel.get('type'));

			var required = this.fieldModel.isRequired();
			this.requiredCheck.attr('checked', required);

            this.rowInput.val(row.get('index'));
            this.columnInput.val(column.get('index'));
		},

        delCell: function() {
            console.log('del cell...');
            var name = this.fieldModel.getName();
            var label = this.fieldModel.getLabel();
            var index = this.columnModel.get('index');

            this.columnModel.destroy();

            this.reset();

            var url = ['fields/del/',
                name, '-', label].join('');
            Backbone.history.navigate(url, {
                trigger: true
            });
        },
        moveCell: function() {
            var r = this.rowInput.val();
            var c = this.columnInput.val();

            r = parseInt(r);
            c = parseInt(c);

            var url = ['move/', 
                this.rowModel.get('index'), '/',
                this.columnModel.get('index'), '/',
                'to/',
                r, '/',
                c
            ].join('');

            Backbone.history.navigate(url, {
                trigger: true
            });
        },

		updateModel: function() {
			var width = this.widthInput.val();
			var numberWidth = parseFloat(width);
			this.columnModel.set({width: numberWidth});

			var name = this.nameInput.val();
			this.fieldModel.setName(name);

			var label = this.labelInput.val();
			this.fieldModel.setLabel(label);

			var type = this.typeSelect.val();
			this.fieldModel.set({type: type});

			var required = this.requiredCheck.attr('checked');
			required = required == undefined ? false : true;
			this.fieldModel.setRequired(required);
		},
		reset: function() {
			this.fieldModel = undefined;
			this.columnModel = undefined;
			this.$el[0].reset();
		}
	});

	return PropertyFormView;
});


