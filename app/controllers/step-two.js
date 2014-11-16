import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['editor'],
    selectedCategory: null,
    
    actions: {
        setupEditor: function(){
            this.setupEditor();
        }
    },
    setupEditor: function(){
        var that = this, editorController = that.get("controllers.editor"), editorModel = editorController.get("model") || that.get("model.editor"), svgEditor = editorController.get("svgEditor");
       
        // editorModel.set("step",2);
        // editorModel.set("editing", true);
        // editorController.set("model", editorModel);
//         
    }
});
