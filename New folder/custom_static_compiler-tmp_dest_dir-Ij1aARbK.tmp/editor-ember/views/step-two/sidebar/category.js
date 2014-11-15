import Ember from 'ember';

export default Ember.View.extend({
    needs: ['step-two'],
    tagName: "li",
    controller: "category",
    selectedCategory: Ember.computed.alias("controller.controllers.step-two/sidebar.selectedCategory"),
    classNameBindings: ['isOpen:open'],
    isOpen: function(){
        //this is messy. render doesn't allow passing of extra parameters so 
        var that = this;
       
        return (that.get("selectedCategory.id") === that.get("controller.model.id"));
    }.property("selectedCategory"),
    click: function(){
        var sidebar = this.get("controller.controllers.step-two/sidebar");
        sidebar.set("selectedCategory", this.get("controller.model"));
        
    }
});