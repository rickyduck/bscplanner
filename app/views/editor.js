import Ember from 'ember';

export default Ember.View.extend({
	svgEditor: null,
	didInsertElement: function(){
		var curConfig = {
		  canvas_expansion: 1, 
		  dimensions: [1080,700], 
		  initFill: {color: 'fff', opacity: 0},
		  initStroke: {width: 1.5, color: '000', opacity: 1},
			initOpacity: 1,
			imgPath: 'editor/images/',
			extPath: 'editor/extensions/',
			jGraduatePath: 'editor/jgraduate/images/',
			extensions: ["grid"],
			initTool: 'select',
			wireframe: true,
			colorPickerCSS: false,
			gridSnapping: true,
			gridColor: "#000",
			baseUnit: 'px',
			snappingStep: 10,
			showRulers: false,
			show_outside_canvas: false,
			no_save_warning: true,
			initFont: 'Helvetica, Arial, sans-serif'
		};
		this.get('controller').send("saveSvgEditor", window.svgEditor);
	},
	click: function(){
		alert("ClicK");
	}
});
