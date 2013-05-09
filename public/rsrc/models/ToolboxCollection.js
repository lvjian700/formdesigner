define([
    'backbone',
    'm/ToolboxModel'
], function(Backbone, ToolboxModel) {
    
    var ToolboxCollection = Backbone.Collection.extend({
        model: ToolboxModel 
    });

    return ToolboxCollection;
});
