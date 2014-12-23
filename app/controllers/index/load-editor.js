import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['editor'],
  actions : {
    loadEditor: function(editor){
      var editorController = this.get("controllers.editor");
      editorController.send("loadEditor", editor);

    },
    deleteEditor: function(editor){
      if(window.confirm("Are you sure?")){
        editor.deleteRecord();
        editor.save();
      }
    }
  }
});
