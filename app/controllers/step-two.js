import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['editor'],
    editorModel: Ember.computed.alias("controllers.editor.model"),
    editorController: Ember.computed.alias("controllers.editor"),
    selectedCategory: null,
    editorName: moment().format("H:mma, Do MMM YYYY"),
    actions: {
        setupEditor: function(){
            this.setupEditor();
        },
        saveEditor: function(){
          var editorModel = this.get("editorModel");
          console.log(editorModel.get("name"));
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
