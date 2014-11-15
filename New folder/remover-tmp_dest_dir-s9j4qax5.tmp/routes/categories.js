import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		// var that = this;		
		// that.store.find("product")
		this.store.find('product');
		var categories = (this.store.find('category'));
		return categories;
		// return categories;
	},
	setupController: function(controller, model) {
     	this._super(controller, model);
     	
     	model.forEach(function(category){
			var products = category.get("products");
			if(!products || !products.content.length){
				category.set("is_active", false);
			}
		});
   		
  	},
  	connectOutlets: function(router, context) {
  		debugger;
        var editorController = router.get('editor');
    }
});
