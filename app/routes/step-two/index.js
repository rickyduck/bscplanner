import Ember from 'ember';

export default
Ember.Route.extend({
    needs : ['editor', 'step-two'],
    categories : null,
    products : null,
    model : function(model) {
        var that = this;
        var products = this.store.find("product");
        var categories = this.store.find("category");
        var editorController = that.controllerFor("editor");
        

        return {
            products : products,
            categories : categories,
            editor : that.store.getById("editor", "temp")
        };
    },
    setupController : function(controller, model) {
        var that = this;
        that.store.find("editor", {
            editing : true
        }).then( function(editor) {
            if (editor.content.length) {
                that.controllerFor("editor").set("model", editor.content[0]);
            }
        });
    },
    renderTemplate : function(controller, model) {
        var that = this;
        var stepTwoController = that.controllerFor("step-two");
        var editorController = that.controllerFor("editor");
        that._super(controller, model);
        //that.render('products', {into: 'step-one', outlet: 'products'});

        that.render('editor.step-two', {
            controller : 'editor',
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
