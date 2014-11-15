import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		toggleVisible: function(){
			this.toggleVisible();
    	},
		chooseProduct: function(){
			alert("Choose product");
		}
	
	},
});
