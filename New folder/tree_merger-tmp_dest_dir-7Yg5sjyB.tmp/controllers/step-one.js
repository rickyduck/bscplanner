import Ember from 'ember';

export default
Ember.Controller.extend({
    needs : ["editor", "index", "baskets"],
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
        var that = this, index = that.get("controllers.index"), editorController = that.get("controllers.editor"), editorModel = editorController.get("model"), 
        //basketModel checks for editorModel first
        basketsController = that.get("controllers.baskets"),
        basketModel = editorModel?editorModel.get("basketModel"):null, updateBasket = basketModel?false:true,
        //setup variables - queryString or IndexController
        wireframe = that.get("wireframe"), 
        method = that.get("method")?that.get("method"):index.get("method"),
        width = that.get("width")?that.get("width"):index.get("width"), 
        height = that.get("height")?that.get("height"):index.get("height"), 
        measurement = that.get("measurement")?that.get("measurement"):index.get("measurement");
        //delete temp basket to start again
        
        
        
            //find duplicate for this editor (temp)
            
            
        
        //no model then
        if(!editorModel){
            
             editorModel = that.store.createRecord('editor', {
                id: "temp",
                basket: null,
                width: width, 
                height: height, 
                measurement: measurement,
                method: method,
                wireframe: wireframe,
                step: 1,
                editing: true
            });
            basketsController.send("deleteBaskets", {editor: editorModel});
            basketModel = that.store.createRecord('basket', {
                editor: editorModel
            }).save().then(function(basketModel){
                editorModel.set("basket", basketModel);
            //update controller
                editorModel.save().then(function(model){
                    editorController.set("model", model);
                });
            });
            
            
        }else{
            basketsController.send("deleteBaskets", {editor: editorModel});
            that.store.createRecord('basket', {
                editor: editorModel
            }).save().then(function(basketModel){
                editorModel.set("basket", basketModel).save();
            });
            
            
        //Initiate the check 
            editorController.send("checkModel");
        }
    }
});
