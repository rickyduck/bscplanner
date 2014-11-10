import Ember from 'ember';

export default
Ember.Route.extend({
    needs : ['editor', 'step-one'],
    setupController: function(controller, model) {
        var that = this;
        var stepOneController = that.controllerFor('step-one');
        var editorController = that.controllerFor("editor");
        that._super(controller, model);
        //that.render('products', {into: 'step-one', outlet: 'products'});
        if(editorController.get("modelError")){
            return Ember.RSVP.reject(e);
        }
    },
    renderTemplate : function(controller, model) {
        var that = this;
        var stepOneController = that.controllerFor('step-one');
        var editorController = that.controllerFor("editor");
        that._super(controller, model);
        var editorSetup = stepOneController.send("setupEditor");
        //that.render('products', {into: 'step-one', outlet: 'products'});
        if(editorController.get("modelError")){
            return Ember.RSVP.reject(e);
        }

        that.render('editor.draw', {
            controller: 'editor',
            into : "step-one.draw",
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
