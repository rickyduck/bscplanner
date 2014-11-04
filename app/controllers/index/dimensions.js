import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['index', 'editor'],
    
    width: Ember.computed.alias("controllers.index.width"),
    height: Ember.computed.alias("controllers.index.height"),
    method: Ember.computed.alias("controllers.index.method"),
    measurement: Ember.computed.alias("controllers.index.measurement"),
    actions: {
        chooseProduct: function(){
            alert("Choose product");
        },
        chooseMethod: function(method){
            //select rectangle / shape. 
            this.get("controllers.index").send("setMethod", method);
            //Move to dimensions page
            this.transitionToRoute('index.dimensions');
        },
        submitDimensions: function(){
            var that = this;
            //var svgEditor = this.get("controllers.editor.svgEditor");
            Ember.run.next(function(){
                var editor = that.store.createRecord('editor', {
                    width: that.get("width"), 
                    height: that.get("height"), 
                    measurement: that.get("measurement"),
                    method: that.get("method")
                });
                that.get("controllers.editor").set("model", editor);
                //that.transitionToRoute("index");
                that.transitionToRoute('step-one.draw');//+that.get("method"));
           });
        }
    },
});
