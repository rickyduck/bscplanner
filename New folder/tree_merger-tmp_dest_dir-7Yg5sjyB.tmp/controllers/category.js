import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['step-two.sidebar'],
	isVisible: false,
	test:true,
	actions: {
		toggleVisible: function(){
			this.toggleVisible();
    	},
		chooseProduct: function(){
			this.chooseProduct();
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