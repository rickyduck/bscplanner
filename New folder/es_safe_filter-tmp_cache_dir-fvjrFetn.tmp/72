import Ember from 'ember';

export default Ember.View.extend({
	tagName: "li",
	classNameBindings: ['isActive:open'],
	isActive: false,
	templateName: "category",
	click: function(e){
		e.preventDefault();
		//alert("hello");
		this.set("isActive", !this.get("isActive"));
	}
});
