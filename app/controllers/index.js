import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['method','width','height','measurement'],
    needs: ['editor'],
    method: Ember.computed.alias("controllers.editor.method"),
    width: Ember.computed.alias("controllers.editor.width"),
    height: Ember.computed.alias("controllers.editor.height"),
    measurement: Ember.computed.alias("controllers.editor.measurement"),
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
