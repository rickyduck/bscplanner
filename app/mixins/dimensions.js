import Ember from 'ember';

export default Ember.Mixin.create({
    physicalDimensions: Ember.Object.extend({
      width: 0,
      height: 0,
      measurement: ""
    }),
    cssDimensions: Ember.Object.extend({
      width: 0,
      height: 0
    }),
    multiplier: Ember.Object.extend({
      width: 0,
      heigh: 0
    }),

    translateDimensions: function(){
      //here we will work out the differences
      var that = this, cssDimensions = that.get("cssDimensions"), physicalDimensions = that.get("physicalDimensions"), multiplier = that.get("multiplier"),
      cssWidth = cssDimensions.get("width"), cssHeight = cssDimensions.get("height"),
      physicalWidth = physicalDimensions.get("width"), physicalHeight = physicalDimensions.get("height");


      //check that all dimensions are set
      if(cssWidth > 0 && cssHeight > 0 && physicalWidth > 0 && physicalHeight > 0){
        //work out the difference between the editor width in pixels and the defined with in MM / CM
        multiplierWidth = ((cssWidth - physicalWidth) / cssWidth) * 100;
        multiplierHeight = ((cssHeight - physicalHeight) / cssHeight) * 100;
        multiplier.setProperties({
          width: multiplierWidth,
          height: multiplierHeight
        });
        console.log(multiplier);
      }
    }.observes("physicalDimensions", "cssDimensions"),
    applyPhysicalDimensions: function(physicalDimensions){
      var that = this, physicalDimensionsObj = that.get("physicalDimensions");
      physicalDimensionsObj.setProperties(physicalDimensions);
      this.set("physicalDimensions", physicalDimensionsObj);
    },
    applyCssDimensions: function(cssDimensions){
      var that = this, cssDimensionsObj = that.get("cssDimensions");
      this.set("cssDimensions", cssDimensions);
    },
    testMixin: function(){
        alert("This is the mixin");
    }
});
