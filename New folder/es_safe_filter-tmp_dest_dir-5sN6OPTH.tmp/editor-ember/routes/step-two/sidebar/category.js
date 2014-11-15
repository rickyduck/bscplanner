import Ember from 'ember';

export default Ember.Route.extend({
    needs: ['step-two/products'],
    renderTemplate: function(controller,model){
        var that = this;
        that.controllerFor("step-two/products").set("model",model.products);
        that.render('products', {
            controller: 'step-two.sidebar.products',
            into: 'step-two.sidebar',
            outlet: 'category' 
        });
    }
});
