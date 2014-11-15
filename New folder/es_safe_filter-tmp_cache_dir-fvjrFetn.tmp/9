import Ember from 'ember';

export default Ember.Controller.extend({
	itemController: 'category',
	hideMenu: function(){
		var that = this;
		that.get('model').forEach(function(category){
			console.log(category);
			category.set("is_visible",false);
		});
	},
	actions: {
		chooseProduct: function(){
			alert("Choose product");
		},
		toggleVisible: function(){
			this.toggleVisible();
    	}
	},
	toggleVisible: function(){
		var that = this;
		that.hideMenu();

		that.get("model").set("is_visible", !that.get("model").get("is_visible"));
	}
	
});
