import Ember from 'ember';

export default Ember.View.extend({
  savingState: Ember.computed.alias('controller.editorController.savingState'),
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
  },
  savingStateObserver: function(){
    var that = this, $el = that.$(), savingState = that.get("savingState");
    if(savingState === "saved"){
      $el.find(".saveOverlay").fadeOut();
      $el.find(".saveSuccessful").fadeIn(function(){
        $(this).delay(2000).fadeOut();
      });
    }
  }.observes("savingState")
});
