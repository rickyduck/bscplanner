import Ember from 'ember';

export default Ember.View.extend({
    needs: ["step-two/sidebar"],
    selectedCategory: Ember.computed.alias("controller.controllers.step-two/sidebar.selectedCategory"),
    tagName: "ul",
    classNames: ['products'],
    classNameBindings: ['isVisible:open'],
    templateName: "step-two/sidebar/products",
    isVisible: function(){
        //this is messy. render doesn't allow passing of extra parameters so 
        var that = this;
        var categoryId = that.get("controller.model.firstObject.categories.firstObject.id");
        return (that.get("selectedCategory.id") === categoryId);
    }.property("selectedCategory"),
    didInsertElement: function(){
        this.updateHeight();
        
    },
    updateHeight: function(){
        var that = this, $el = that.$(), $lis = $el.closest("ul.top").find("li.ember-view");
        $el.height($el.height() - ($lis.height()*$lis.length));
    }
});
