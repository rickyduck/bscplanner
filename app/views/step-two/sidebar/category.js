import Ember from 'ember';

export default Ember.View.extend({
    needs: ['step-two'],
    tagName: "li",
    controller: "category",
    click: function(){
        var sidebar = this.get("controller.controllers.step-two/sidebar");
        sidebar.set("selectedCategory", this.get("controller.model"));
        
    }
});