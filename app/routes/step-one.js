import Ember from 'ember';

export default Ember.Route.extend({
    needs: ["editor", "baskets"],

	model: function(){
		var store = this.store;
		return Ember.RSVP.hash({
			products: store.find('product'),
			categories: store.find('category'),
           // svgs: store.find('svg'),
            baskets: store.find('basket'),
            editors: store.find('editor'),
		});
	},

  	setupController: function(controller, model) {
     	this._super(controller, model);
        var svg = model.svg, that = this;

      //model.editor = editor;
     	model.categories.forEach(function(category){
  			var products = category.get("products");
  			if(!products || !products.content.length){
  				category.set("is_active", false);
  			}
  		});
      //this.controllerFor('svgs').set('model', model.svgs);

        this.set("model", model);
        this.set("controller", controller);

        this.controllerFor('baskets').set('model', model.baskets);
   		this.controllerFor('categories').set('model', model.categories);
   		this.controllerFor('products').set('model', model.products);

  	},
    actions: {
      chooseProduct: function(){
        alert("Choose product");
      },
      setupEditor: function(){
          this.setupEditor();
      }
    },
    setupEditor : function() {
        //do some checks to ensure the model is complete either from URL params or predefined data from the previous page
        var that = this, editController = that.get("controllers.editor"), editorModel = editController.get("model"), method = that.get("method"), width = that.get("width"), height = that.get("height"), measurement = that.get("measurement"), check = method || model.get("method") ? true : false;
        check = check && (width || model.get("width")) ? true : false;
        check = check && (height || model.get("height")) ? true : false;
        check = check && (measurement || model.get("measurement")) ? true : false;
        check = check && (width || model.get("width")) ? true : false,
        basketModel;
        //if no data error
        if (!check) {
            that.call("error", "Some data is missing!", "missingData");
            return false;
        }
        //no model then
        alert("WTF");
    }
});
