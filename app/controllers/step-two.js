import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['editor'],
    actions: {
        setupEditor: function(){
            this.setupEditor();
        }
    },
    setupEditor: function(){
        var that = this, editorController = that.get("controllers.editor"), model = editorController.get("model"), svgEditor = editorController.get("svgEditor");
        model.set("step",2);
        if(!model){
            model = that.store.find("editor", "temp");
            if(!model){
                that.transitionToRoute("/");
            }else{
                editorController.set("model", model);
            }
        }
    }
});
