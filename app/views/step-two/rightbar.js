import Ember from 'ember';

export default Ember.View.extend({
    showing: false,
    basket: false,
    tagName: "aside",
    classNames: ['toolbar'],
    templateName: "step-two/rightbar",
    actions: {
        toggleRightBar: function(){
            var showing = this.get("showing"), $toolbar = this.$();
            if(!showing){
                $toolbar.animate({right: "0px"});
                this.set("showing",true);
            }else{
                $toolbar.animate({right: "-100px"});
                this.set("showing",false);
                this.set("basket",false);
            }
        },
        toggleBasket: function(){
            this.set("basket",!this.get("basket"));
        }
    },
    refreshBasket: function(){
        this.rerender();
    }.observes("controller.editor.basket.basketItems")
});
