import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ["application", "editor"],
	actions: {
		toggleVisible: function(){
			this.toggleVisible();
    	},
		selectProduct: function(product){
			this.get('controllers.editor').send('loadProductSVGFromURL',product.get("svg.plan"));

		}
	
	},
	chooseProduct: function(){
		alert("@Hello");
	},
	toggleVisible: function(){
		var that = this;
		var categories = that.get("controllers.categories");
		categories.hideMenu();

		that.get("model").set("is_visible", !that.get("model").get("is_visible"));
	}
});
