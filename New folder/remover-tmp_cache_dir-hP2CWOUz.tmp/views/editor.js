import Ember from 'ember';

export default Ember.View.extend({
	svgEditor: null,
	didInsertElement: function(){
	   this.get('controller').send("saveSvgEditor");

	}
});
