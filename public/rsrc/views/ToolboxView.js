define([
    'jquery', 'underscore', 'backbone',
    'm/ToolboxModel', 'm/ToolboxCollection',
    'v/Core', 
	'text!tmpl/toolbox.html',
	'text!tmpl/toolbox_item.html'
], function($, _, Backbone,
    ToolboxModel, ToolboxCollection,
    Core, 
	tmpl,
	item_tmpl) {

	var itemc_fun = Core.read_tmpl(item_tmpl);

    function read_name (idAttr) {
        var name = idAttr.split('-')[1];
        return name;
    }

    function to_id (name) {
        return '#tb-' + name;
    }

    var ToolboxView = Backbone.View.extend({
		id: 'toolbox',
		tagName: 'ul',
		className: 'tools',
        template: Core.read_tmpl(tmpl),
        events: {
			"click .toolbox-item>a": "toCanvas"
        },
        initailize: function() {
        },
        render: function() {
            this.$el.empty();
			if(this.model == undefined) {
				return this;
			}

			var json = this.model.toJSON();
			var html = this.template({
				data: json
			});

			this.$el.html(html);
			
			return this;
        },
        load: function(json) {
            this.model = new ToolboxCollection(json);
						
            this.model.bind('add', this.onAdd, this);
            this.model.bind('remove', this.onRemoved, this);

			return this;
        },
        toCanvas: function(e) {
			e.preventDefault();
            
            var id = e.target.id; 
            var name = read_name(id);

            var choosed = this.model.where({
                name: name
            })[0];

            var url = ['fields/add/', 
				choosed.get('name'), 
				'-', choosed.get('label')
			].join('');

			if(Backbone.history) {
				Backbone.history.navigate(url, {trigger: true});
			}
            
            this.model.remove(choosed);

            return false;
        },
        add: function(name, label) {
            this.model.preAdd(name, label);
        },
        onAdd: function(toolbox, toolboxes, options) {
            var itemJson = toolbox.toJSON();
            var itemHtml = itemc_fun(itemJson);

            this.$el.prepend(itemHtml);
        },
        onRemoved: function(toolbox, toolboxes, options) {
			console.log('on remove...');
            var name = toolbox.get('name');
			console.log(name);
            var selector = to_id(name);
			console.log(selector);
			
            this.$(selector).parent().remove();
        }
    });


    return ToolboxView;
});
