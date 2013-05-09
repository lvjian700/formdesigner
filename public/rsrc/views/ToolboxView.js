define([
    'jquery', 'underscore', 'backbone',
    'm/ToolboxModel', 'm/ToolboxCollection',
    'v/Core', 'text!tmpl/toolbox_item.html'
], function($, _, Backbone,
    ToolboxModel, ToolboxCollection,
    Core, tmpl) {

    function read_name (idAttr) {
        var name = idAttr.split('-')[1];
        return name;
    }

    function to_id (name) {
        return '#tb-' + name;
    }

    var ToolboxView = Backbone.View.extend({
        el: '#toolbox',
        template: Core.read_tmpl(tmpl),
        events: {
        },
        initailize: function() {
        },
        render: function() {
            this.$el.empty();
            var _this = this;
			
            this.model.forEach(function(item) {
                var itemJson = item.toJSON();
                var itemHtml = _this.template(itemJson);
                _this.$el.append(itemHtml);				
            });
			
			this.$('li>a').click(function(e) {
				_this.toCanvas(e);
			});
        },
        load: function(json) {
			console.log('load toolbox collection...');
            this.model = new ToolboxCollection(json);
						
            this.model.bind('add', this.onAdd, this);
            this.model.bind('remove', this.onRemoved, this);

            this.render();
        },
        toCanvas: function(e) {
			e.preventDefault();
            
            var id = e.target.id; 
            var name = read_name(id);

			console.log(this.model);
            var choosed = this.model.where({
                name: name
            })[0];

            var url = ['fields/add/', choosed.get('name'), '-', choosed.get('label')].join('');
			console.log(url);
            Backbone.history.navigate(url, {trigger: true});
            
            this.model.remove(choosed);

            return false;
        },
        add: function(name, label) {
            this.model.add([{
                name: name,
                label: label
            }]);
        },
        onAdd: function(toolbox, toolboxes, options) {
            var itemJson = toolbox.toJSON();
            var itemHtml = _this.template(itemJson);
            this.$el.append(itemHtml);
        },
        onRemoved: function(toolbox, toolboxes, options) {
			console.log('on remove...');
            var name = toolbox.get('name');
			console.log(name);
            var selector = to_id(name);
			console.log(selector)
			
            this.$(selector).parent().remove();
        }
    });


    return ToolboxView;
});
