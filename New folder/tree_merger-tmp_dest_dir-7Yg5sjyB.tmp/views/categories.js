import Ember from 'ember';

export default Ember.View.extend({
	
	didInsertElement: function(){
		var height = $(window).innerHeight();
		var $this = this.$();
	    var $aside = $this.find("aside.left");
	    var $lis = $aside.find("menu > ul > li");
	    var heightLi = $lis.first().height() * $lis.length;
	    $lis.find("ul").height(height-heightLi-$lis.first().height())
	  },
	actions: {
		chooseProduct: function(){
			alert("Choose product");
		}
	}
});
