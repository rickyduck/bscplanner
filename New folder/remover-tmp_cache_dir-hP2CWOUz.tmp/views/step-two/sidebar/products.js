import Ember from 'ember';

export default Ember.View.extend({
    needs: ["step-two/sidebar"],
    selectedCategory: Ember.computed.alias("controller.controllers.step-two/sidebar.selectedCategory"),
    tagName: "ul",
    classNames: ['products'],
    
    templateName: "step-two/sidebar/products",
    
    didInsertElement: function(){
        this.updateHeight();
        
    },
    updateHeight: function(){
        var that = this, $el = that.$(), $lis = $el.closest("ul.top").find("li.ember-view");
        $el.height($el.height() - ($lis.height()*$lis.length));
    }
});
