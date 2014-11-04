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
      },
      setupEditor: function(){
          this.setupEditor();
      }
    },
    setupEditor : function() {
        //do some checks to ensure the model is complete either from URL params or predefined data from the previous page
        var that = this, editController = that.get("controllers.editor"), model = editController.get("model"), method = that.get("method"), width = that.get("width"), height = that.get("height"), measurement = that.get("measurement"), check = method || model.get("method") ? true : false;
        check = check && (width || model.get("width")) ? true : false;
        check = check && (height || model.get("height")) ? true : false;
        check = check && (measurement || model.get("measurement")) ? true : false;
        check = check && (width || model.get("width")) ? true : false;
        //if no data error
        if (!check) {
            that.call("error", "Some data is missing!", "missingData");
            return false;
        }
        //no model then
        if(!model.get("width")){
             var editor = that.store.createRecord('editor', {
                id: "temp",
                width: width, 
                height: height, 
                measurement: measurement,
                method: method
            });
            //update controller
            editorController.set("model", editor);
            editorController.call("saveSvgEditor");
        }
    }
});
