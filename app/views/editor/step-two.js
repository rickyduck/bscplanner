import Ember from 'ember';

export default Ember.View.extend({
    svgEditor: null,
    controller: "editor",
    svgElementSelector: "#svgEditor",

    didInsertElement : function() {
        var elementAction, $el = this.$(), height = $("body").height() - ($el.find("header").outerHeight() + $el.find("footer").outerHeight()) - 400, width = $el.width() - 550, controller = this.get("controller"), config = controller.get("config"), id = $el.closest('.ember-view').attr('id'), svgElementSelector = "#"+id+" "+this.svgElementSelector ;
        config.dimensions = [width, height];
        controller.set("config", config);
        $el.find("#workarea").width(width);
        $el.find("#wf").height(height);
        $el.find(".info").height(height + 40);
        $el.find("#svgcanvas").css({
            width : width,
            height : height
        });
        controller.set("svgElementSelector", svgElementSelector);
        //elementAction = controller.send("saveSvgEditor");

    }
});
