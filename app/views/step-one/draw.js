import Ember from 'ember';

export default
Ember.View.extend({
    controller : "editor",
    classNames : ["step-one"],
    didInsertElement : function() {
        var $el = this.$(), height = $("body").height() - ($el.find("header").outerHeight() + $el.find("footer").outerHeight()) - 300, width = $el.width() - 550;
        $el.find("#workarea").width(width);
        $el.find("#wf").height(height);
        $el.find("#svgcanvas").css({
            width : width,
            height : height
        });
        $el.find("#canvasBackground rect").hide();
    },
    actions : {
        undoPath : function() {
            var svgEditor = this.get("controller.model.svgEditor");
            svgEditor.canvas.pathActions.toEditMode($("#svgcanvas path")[0]);
            svgEditor.canvas.pathActions.undoPath();
        }
    }
});
