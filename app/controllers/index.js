import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['method','width','height','measurement'],
    needs: ['editor'],
    method: null,
    width: null,
    height: null,
    measurement: null,
	initialize: function(){
		console.log(this);
	},
	actions: {
		chooseProduct: function(){
			alert("Choose product");
		},
		chooseMethod: function(method){
		    this.set("method", method);
		    this.transitionToRoute('index.dimensions');
		}
	},
	chooseProduct: function(){
			alert("Choose product");
		}
});
