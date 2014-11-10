import Ember from 'ember';

export default
Ember.Controller.extend({
    needs : ["editor", "index"],
    queryParams : ['method', 'width', 'height', 'measurement', 'wireframe'],
    method : null,
    width : null,
    height : null,
    measurement : null,
    wireframe: true,
    actions : {
        
        setupEditor: function(){
            this.setupEditor();
        }
    },
    renderTemplate: function(){
        alert("ello");  
    },
    setupEditor : function() {
        //do some checks to ensure the model is complete either from URL params or predefined data from the previous page
        var that = this, index = that.get("controllers.index"), editorController = that.get("controllers.editor"), model = editorController.get("model"), 
        //setup variables - queryString or IndexController
        wireframe = that.get("wireframe"), 
        method = that.get("method")?that.get("method"):index.get("method"),
        width = that.get("width")?that.get("width"):index.get("width"), 
        height = that.get("height")?that.get("height"):index.get("height"), 
        measurement = that.get("measurement")?that.get("measurement"):index.get("measurement");
    
        //no model then
        if(!model){
             model = that.store.createRecord('editor', {
                id: "temp",
                width: width, 
                height: height, 
                measurement: measurement,
                method: method,
                wireframe: wireframe,
                step: 1,
                editing: true
            });
            //update controller
            model.save().then(function(model){
                editorController.set("model", model);
            });
            
        }else{
        //Initiate the check 
            editorController.send("checkModel");
        }
    }
});
