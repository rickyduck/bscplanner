import Ember from 'ember';

export default
Ember.Controller.extend({
    needs : ["editor"],
    queryParams : ['method', 'width', 'height', 'measurement', 'wireframe'],
    method : null,
    width : null,
    height : null,
    measurement : null,
    wireframe: null,
    actions : {
        error : function(error, transition) {
            
                // error substate and parent routes do not handle this error
                return this.transitionTo(transition);
            

            // Return true to bubble this event to any parent route.
            return true;
        }, 
        setupEditor: function(){
            this.setupEditor();
        }
    },
    setupEditor : function() {
        //do some checks to ensure the model is complete either from URL params or predefined data from the previous page
        var that = this, editorController = that.get("controllers.editor"), model = editorController.get("model"), wireframe = that.get("wireframe"), method = that.get("method"), width = that.get("width"), height = that.get("height"), measurement = that.get("measurement"), check = method || model.get("method") ? true : false;
        check = check && (width || model.get("width")) ? true : false;
        check = check && (height || model.get("height")) ? true : false;
        check = check && (measurement || model.get("measurement")) ? true : false;
        check = check && (width || model.get("width")) ? true : false;
        if(wireframe == null) wireframe = false;
        that.set("wireframe",wireframe); 
        //if no data error
        if (!check) {
            that.call("error", "Some data is missing!", "missingData");
            return false;
        }
        //no model then
        if(!model.get("width")){
             var editor = that.store.createRecord('editor', {
                id: "temp",
                width: width, 
                height: height, 
                measurement: measurement,
                method: method,
                wireframe: wireframe
            });
            //update controller
            editorController.set("model", editor);
            
           // editorController.call("saveSvgEditor");
        }
    }
});
