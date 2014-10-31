import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){ 
		var store = this.store;
		return Ember.RSVP.hash({
			products: store.find('product'),
			categories: store.find('category'),
      svgs: store.find('svg')
      
      
		});
	},
	
  	setupController: function(controller, model) {
     	this._super(controller, model);
      var svg = model.svg;
      
      //model.editor = editor;
     	model.categories.forEach(function(category){
  			var products = category.get("products");
  			if(!products || !products.content.length){
  				category.set("is_active", false);
  			}
  		});
      //this.controllerFor('svgs').set('model', model.svgs);
      var editor = this.store.createRecord('editor', {svg:model.svgs.objectAt(0)});
      model.editor = editor;
      this.set("model", model);
      this.controllerFor('editor').set('model', editor);
   		this.controllerFor('categories').set('model', model.categories);
   		this.controllerFor('products').set('model', model.products);
  	},
    actions: {
      chooseProduct: function(){
        alert("Choose product");
      }
    }
});
