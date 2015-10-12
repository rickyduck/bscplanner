import Ember from 'ember';
import DimensionsMixin from "editor-ember/mixins/dimensions";

export default Ember.View.extend(DimensionsMixin, {
    svgEditor: null,
    controller: "editor",
    isMouseDown: false,
    increaseDisabled: function(){
      return this.get("controller.zoomLevel") === 10;
    },
    decreaseDisabled: function(){

      return this.get("controller.zoomLevel") === 1;
    },
    svgElementSelector: "#svgEditor",
    dimensions: null,
    mouseDown: function(event){
      //we need this for the mouse move function
        this.set("isMouseDown", true);
    },
    mouseUp: function(event){
        this.set("isMouseDown", false);
    },
    checkCollide: function(){
      var that = this, controller = that.get("controller"), svgCanvas = controller.get("svgEditor.canvas"), currentDrawing = controller.get("currentDrawing"), svgPlanElement = controller.get("svgPlanElement"), current, elemBox, planBox;
      //check if there's a current layer and also ensure the plan svg element exists
      if(currentDrawing.getCurrentLayer() && svgPlanElement){
        elemBox = currentDrawing.getCurrentLayer().getBoundingClientRect();
        planBox = svgPlanElement.getBoundingClientRect();
        if(elemBox.top > planBox.top - 5 && elemBox.top < planBox.top + 5){
          //alert("TOP");
          svgCanvas.setRotationAngle(0);
        }
        if(elemBox.left > planBox.left - 5 && elemBox.left < planBox.left + 5){
          //alert("LEFT");
          svgCanvas.setRotationAngle(270);
        }
        if(Math.floor(elemBox.bottom) === Math.floor(planBox.bottom)){
          //alert("BOTTOM");
          svgCanvas.setRotationAngle(180);
        }
        if(Math.floor(elemBox.right) === Math.floor(planBox.right)){
        //  alert("RIGHT");
          svgCanvas.setRotationAngle(90);
        }
      }
    },
    mouseMove: function(event){
      //check whether mousedown has been set.
      if(this.get("isMouseDown")){
        Ember.run.debounce(this, this.checkCollide, 200);

      }


    },
    didInsertElement : function() {
        var elementAction, $el = this.$(), height = $("body").height() - ($el.find("header").outerHeight() + $el.find("footer").outerHeight()) - 400, width = $el.width() - 550, controller = this.get("controller"), config = controller.get("config"), id = $el.closest('.ember-view').attr('id'), svgElementSelector = "#"+id+" "+this.svgElementSelector ;
        config.dimensions = [width, height];
        this.set("dimensions", config.dimensions);
        controller.set("config", config);
      //  $el.find("#workarea").width(width);
        $el.find("#wf").height(height);
        $el.find(".info").height(height + 40);
        $el.find("#svgcanvas").css({
            width : width,
            height : height
        });
        controller.set("svgElementSelector", svgElementSelector);
        this.testMixin();
        //elementAction = controller.send("saveSvgEditor");
    },

});
