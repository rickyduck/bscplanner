import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function(){
		console.log(this);
	}
});
