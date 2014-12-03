import Ember from 'ember';

export default Ember.Mixin.create({
    physicalDimensions: Ember.Object.create({
      width: 0,
      height: 0,
      measurement: ""
    }),
    cssDimensions: Ember.Object.create({
      width: 0,
      height: 0
    }),
    multiplier: Ember.Object.create({
      width: 0,
      height: 0
    }),

    translateDimensions: function(){
      //here we will work out the differences
      var that = this, cssDimensions = that.get("cssDimensions"), physicalDimensions = that.get("physicalDimensions"), multiplier = that.get("multiplier"),
      cssWidth = cssDimensions.get("width"), cssHeight = cssDimensions.get("height"),
      physicalWidth = physicalDimensions.get("width"), physicalHeight = physicalDimensions.get("height"),
      measurementMultiplier = physicalDimensions.get("measurement") === "cm" ? 10 : 1,
      multiplierWidth, multiplierHeight;


      //check that all dimensions are set
      if(cssWidth > 0 && cssHeight > 0 && physicalWidth > 0 && physicalHeight > 0){
        //work out the difference between the editor width in pixels and the defined with in MM / CM
        multiplierWidth = (physicalWidth*measurementMultiplier)/cssWidth;
        multiplierHeight = (physicalHeight*measurementMultiplier)/cssHeight;
        multiplier.setProperties({
          width: multiplierWidth,
          height: multiplierHeight
        });
        console.log(multiplier);
      }
    },
    applyPhysicalDimensions: function(physicalDimensions){
      var that = this, physicalDimensionsObj = that.get("physicalDimensions");
      physicalDimensionsObj.setProperties(physicalDimensions);
      this.set("physicalDimensions", physicalDimensionsObj);

    },
    applyCssDimensions: function(cssDimensions){
      var that = this, cssDimensionsObj = that.get("cssDimensions");
      cssDimensionsObj.setProperties(cssDimensions);
      this.set("cssDimensions", cssDimensionsObj);
    },
    testMixin: function(){
        //alert("This is the mixin");
    }
});
