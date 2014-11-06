import Ember from 'ember';

export default Ember.View.extend({
    svgEditor: null,
    controller: "editor",
    actions: {
        deletePlan: function(){
            this.get("controller").send("clear");
        },
        nextStep: function(type){
            this.get("controller").send("nextStep",type);
        }
    },
    didInsertElement: function(){
       this.get('controller').send("saveSvgEditor");

    }
});
