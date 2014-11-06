import Ember from 'ember';

export default Ember.View.extend({
    controller: "editor",
    actions: {
        undoPath : function() {
            var svgEditor = this.get("controller.model.svgEditor");
            svgEditor.canvas.pathActions.toEditMode($("#svgcanvas path")[0]);
            svgEditor.canvas.pathActions.undoPath();
        }
    }
});
