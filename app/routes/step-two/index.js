import Ember from 'ember';

export default
Ember.Route.extend({
    needs : ['editor', 'step-two'],
    categories: null,
    products: null,
    model: function(model){
        this.set("products", this.store.find("product"));
        this.set("categories", this.store.find("category"));
        return model; 
    },
    renderTemplate : function(controller, model) {
        var that = this;
        var stepTwoController = that.controllerFor("step-two");
        var editorController = that.controllerFor("editor");
        that._super(controller, model);
        var editorSetup = stepTwoController.send("setupEditor");
        //that.render('products', {into: 'step-one', outlet: 'products'});
       
        that.render('editor.step-two', {
            controller: 'editor',
            into : "step-two.index",
            outlet : 'editor'
        });
        // that.render('step-one.sidebar.draw', {
            // into : 'step-one.draw',
            // outlet : 'sidebar'
        // });
        //   this.transitionTo('/categories');
       // stepOne.send("setupEditor");
        //    this.render('editor', {into: 'index', outlet: 'editor'});
    }
});
