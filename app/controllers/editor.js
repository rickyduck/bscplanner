import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: 'application',
    contentBinding: 'controllers.application.editor',
	svgCanvas: null,
	saveSvgEditor: function(svgObj){
		this.set('svgCanvas', svgObj);
	},
	loadProductSVGFromURL: function(url){
		var that = this;
		var svgCanvas = that.get("svgCanvas");
		$.ajax({
			'url': url,
			'dataType': 'text',
			cache: false,
			success: function(str) {
				svgCanvas.setSvgString(str);
			},
			error: function(xhr, stat, err) {
				if(xhr.status != 404 && xhr.responseText) {
					svgCanvas.setSvgString(xhr.responseText);
				} else {
					$.alert(uiStrings.notification.URLloadFail + ": \n"+err+'', cb);
				}
			}
		});
	},
	loadProductSVG: function(product){
		var that = this;
		var svgCanvas = that.get("svgCanvas");
		svgCanvas.loadSvgString(svgedit.utilities.decode64(product));
	},
	init: function(){
		alert("Editor initialized");
	}
});
