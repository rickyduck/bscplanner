import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['index', 'editor'],
    width: Ember.computed.alias("controllers.editor.width"),
    height: Ember.computed.alias("controllers.editor.height"),
    method: Ember.computed.alias("controllers.editor.method"),
    measurement: Ember.computed.alias("controllers.editor.measurement"),
    actions: {
        chooseProduct: function(){
            alert("Choose product");
        },
        chooseMethod: function(method){
            this.get("controllers.index").send("setMethod", method);
            this.transitionToRoute('index.dimensions');
        },
        submitDimensions: function(){
            var that = this;
            var svgEditor = this.get("controllers.editor.svgEditor");
            Ember.run.next(function(){
                that.transitionToRoute('step-one.'+that.get("method"),  {
                    width: that.get("width"), 
                    height: that.get("height"), 
                    measurement: that.get("measurement")
                });
           });
        }
    },
});
