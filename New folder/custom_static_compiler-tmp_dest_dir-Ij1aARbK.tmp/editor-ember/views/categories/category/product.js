import Ember from 'ember';

export default Ember.View.extend({
	tagName: 'li',
	didInsertElement: function(){
		console.log("product");
		console.log(this);
	}
});
