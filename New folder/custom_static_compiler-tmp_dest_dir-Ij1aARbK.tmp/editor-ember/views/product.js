import Ember from 'ember';

export default Ember.View.extend({
	tagName: "li",
	click: function(evt) {
		//prevent close of menu
		evt.stopPropagation();
		this.get('controller').send('selectProduct', this.get("product"));
	},
	init: function() {
		//generate random ID because this isn't a real product
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ ) {
	      text += possible.charAt(Math.floor(Math.random() * possible.length));
	    }

	    this.set('elementId', text);
	}
});
