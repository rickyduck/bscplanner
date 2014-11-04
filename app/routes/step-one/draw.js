import Ember from 'ember';

export default
Ember.Route.extend({
    needs : ['editor', 'step-one'],

    renderTemplate : function(controller, model) {
        var that = this;
        var stepOne = that.controllerFor('step-one');
        that._super(controller, model);
        var categories = that.controllerFor('categories');
        //that.render('sidebar', {into: 'step-one', outlet: 'categories'});
        var products = that.controllerFor('products');
        //that.render('products', {into: 'step-one', outlet: 'products'});
        that.render('editor', {
            into : "step-one.draw",
            outlet : 'editor'
        });
        that.render('step-one.sidebar.draw', {
            into : 'step-one.draw',
            outlet : 'sidebar'
        });
        //   this.transitionTo('/categories');
        stepOne.send("setupEditor");
        //    this.render('editor', {into: 'index', outlet: 'editor'});
    }
});
