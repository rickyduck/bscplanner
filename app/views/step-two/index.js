import Ember from 'ember';

export default Ember.View.extend({
  actions: {
    showSaveOverlay: function(){
      this.$().find(".saveOverlay").fadeIn();
    },
    cancelSave: function(){
      this.$().find(".saveOverlay").fadeOut();
    },
    saveEditor: function(){
      this.get("controller.editorController").send("saveEditor");

    }
  }
});
