import Ember from 'ember';

export default Ember.Route.extend({
    needs: ['editor'],
    model: function(params){
        var editor = this.get('controllers.editor');
        editor.set(params);
        return params;
    },
    
    renderTemplate: function(controller, model) {
        this._super(controller, model);
        var categories = this.controllerFor('categories');
        //this.render('sidebar', {into: 'step-one', outlet: 'categories'});
        var products = this.controllerFor('products');
        //this.render('products', {into: 'step-one', outlet: 'products'});
      this.render('editor', {into: "step-one.draw", outlet:'editor'});
      this.render('step-one.sidebar.draw', {into:'step-one.draw', outlet:'sidebar'});
   //   this.transitionTo('/categories');
  //    this.render('editor', {into: 'index', outlet: 'editor'});
    }
});
