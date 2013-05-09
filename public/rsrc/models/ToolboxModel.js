define([
    'backbone'
], function(Backbone) {

    var ToolboxModel = Backbone.Model.extend({
        defaults: function() {
            return {
                name: '',
                label: ''
            };
        }
    });

    return ToolboxModel;
});
