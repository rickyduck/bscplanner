import Ember from 'ember';
//Apply the mixin for dimensions
import DimensionsMixin from "editor-ember/mixins/dimensions";

export default
Ember.View.extend(DimensionsMixin, {
    controller : "editor",
    editorController : Em.computed.alias("controller.controllers.editor"),
    classNames : ["step-one"],
    didInsertElement : function() {
        var that = this, $el = this.$(), height = $("body").height() - ($el.find("header").outerHeight() + $el.find("footer").outerHeight()) - 300, width = $el.width() - 550,
        editorModel = that.get("editorController.model"),
        physicalDimensions = {
          width : editorModel.get("width"),
          height : editorModel.get("height"),
          measurement : editorModel.get("measurement")
        },
        cssDimensions = {
            width : width,
            height : height
        };
        $el.find("#workarea").width(width);
        $el.find("#wf").height(height);
        $el.find("#svgcanvas").css(cssDimensions);
        $el.find("#canvasBackground rect").hide();
        //Below is defined in editor-ember/mixins/dimensions
        that.applyCssDimensions(cssDimensions);
        that.applyPhysicalDimensions(physicalDimensions);
        that.translateDimensions();
    //    that.get("editorController").send("applyMultiplier", that.multiplier);
    },

    actions : {
        undoPath : function() {
            var svgEditor = this.get("controller.model.svgEditor");
            svgEditor.canvas.pathActions.toEditMode($("#svgcanvas path")[0]);
            svgEditor.canvas.pathActions.undoPath();
        }
    }
});
