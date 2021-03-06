import Ember from 'ember';

export default Ember.View.extend({
    classNames: ['full-height'],
	didInsertElement: function(){
		var height = $(window).innerHeight();
		var $this = this.$();
		$this.height(height);
	    var $aside = $this.find("aside.left");
	    var $lis = $aside.find("menu > ul > li");
	    var heightLi = $lis.first().height() * $lis.length;
	    $lis.find("ul").height(height-heightLi-$lis.first().height())
	  }
});
