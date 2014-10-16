import Ember from 'ember';

export default Ember.Controller.extend({
	initialize: function(){
		console.log(this);
	},
	actions: {
		chooseProduct: function(){
			alert("Choose product");
		}
	},
	chooseProduct: function(){
			alert("Choose product");
		}
});
