import Ember from 'ember';

export default Ember.View.extend({
    tagName: "aside",
    showing: false,
    actions: {
      toggleSidebar: function(){
        var showing = this.get("showing"), $toolbar = this.$();
        if(!showing){
          $toolbar.animate({left: "0px"});
          this.set("showing",true);
        }else{
          //too many hard coded values
          $toolbar.animate({left: "-275px"});
          this.set("showing",false);
        }
      }
    },
    classNames: ["left"]
});
