import Ember from 'ember';

export default
Ember.ObjectController.extend({
    needs : ['index', 'step-one', 'baskets'],
    //config for the editor
    modelError: null,
    editorName: "Test!",
    svgPlanString: null,
    svgElementSelector: null,
    svgElement: null,
    zoomLevel: 1,
    config : {
        controller: null,
        svgElementSelector: "#svgeditor",
        canvas_expansion : 1,
        dimensions : ["100%", "100%"],
        physicalDimensions: [0, 0],
        initFill : {
            color : 'fff',
            opacity : 0
        },
        initStroke : {
            width : 3,
            color : '000',
            opacity : 1
        },
        initOpacity : 1,
        imgPath : 'editor/images/',
        extPath : 'editor/extensions/',
        jGraduatePath : 'editor/jgraduate/images/',
        extensions : ["grid"],
        initTool : 'select',
        wireframe : true,
        colorPickerCSS : false,
        gridSnapping : true,
        gridColor : "#000",
        baseUnit : 'px',
        snappingStep : 1,
        showRulers : false,
        show_outside_canvas : false,
        no_save_warning : true,
        initFont : 'Helvetica, Arial, sans-serif'
    },
    actions : {
        saveSvgEditor: function(){
            this.saveSvgEditor();
        },
        checkModel: function(){

            this.checkModel();
        },
        nextStep: function(){
            this.nextStep();
        },
        toggleWireframe : function() {
            this.toggleWireframe();
        },
        changeZoom : function(zoom) {
            this.changeZoom(zoom);
        },
        setMode : function(mode) {
            this.setMode(mode);
            //alert("Editor");
        },
        undoPath: function(){
            this.undoPath();
        },
        clear : function() {
            this.clear();
        },
        getSvg : function(type) {
            this.getSvg(type);
        },

        //Basket functions
        addBasket: function(editor){

        },

        addBasketProduct: function(product) {
            this.addBasketProduct(product);
        },
        loadSvgPlanString: function(){
            this.loadSvgPlanString();
        }
    },


    checkModel: function(){
        var that = this;
        var model = that.get("model");
        if(!(model.get("width") && model.get("height") && model.get("method") && model.get("measurement"))){
            that.set("modelError", true);
            that.send("handleError", {id:"missingData", controller: that, model: model});
        }else{
            that.set("modelError",false);
        }

    },
    //should probably rename the function to "stepTwo()".
    nextStep : function() {
        var that = this, model = that.get("model"), svgEditr, svgString;
        if(model.get("method") === "draw") {
          svgEditor = that.get("svgEditor"), svgString = svgEditor.canvas.getSvgString() ;
          model.set("svgPlanString", svgedit.utilities.encode64(svgString));
        }
        model.set("step",2);
        //At the moment we're saving to localStorage. This should be changed to the REST API for logged in users (?)'
        model.save();
        that.transitionToRoute("/step-two");
    },

    setSvgCanvasMeasurements : function() {
        var that = this;
        var svgEditor = that.get("svgEditor");
        if (svgEditor) {
            //On the next step we need to get the pixel dimensions.
            svgEditor.measurements = {
                width : that.get("width"),
                height : that.get("height"),
                method : that.get("method"),
                measurement : that.get("measurement")
            };
        }
    }.observes('width', 'height', 'measurement'),
    changeZoom : function(zoom) {
      var that = this, svgEditor = that.get("svgEditor"), curZoom = svgEditor.canvas.getZoom();

        if(zoom === "increase"){
          zoom = curZoom + 0.1;
        }else if(zoom === "decrease"){
          zoom = curZoom - 0.1;
        }
        svgEditor.canvas.setZoom(zoom);
        that.set("zoomLevel", Math.floor((zoom-1)*10)) ;
    },
    //here we check for
    increaseDisabled: function(){
      return this.get("zoomLevel") === 10;
    }.property("zoomLevel"),
    decreaseDisabled: function(){
      return this.get("zoomLevel") === 1;
    }.property("zoomLevel"),
    toggleWireframe : function() {
        this.set("wireframe", !this.get("wireframe"));
    },
    clear : function() {
        var svgEditor = this.get("svgEditor");
        svgEditor.canvas.clear();
    },
    undoPath: function(){
        this.get("svgEditor").canvas.pathActions.undoPath();
    },
    setMode : function(mode) {
        var that = this;
        var svgEditor = that.get('svgEditor');
        svgEditor.canvas.setStrokePaint('000000');
        svgEditor.canvas.setStrokeWidth(1);
        svgEditor.canvas.setMode(mode);
    },
    saveSvgEditorBind : function() {
        //set the config controller to this

        var that = this, model = that.get("model"), svgEditor = that.get("svgEditor"),config = that.get("config"), svgPlanString, svgElementSelector = that.get("svgElementSelector"), svgElement = that.get("svgElement"),
        max, rectWidth,rectHeight, rectPercentage, rectXBuffer, rectYBuffer ;
        if(!model){
            //fallback
            that.store.find("editor", {editing: true}).then(function(editor){
                if(editor.content.length){
                    that.set("content", editor.content[0]);
                    that.saveSvgEditorBind();
                }else{
                    alert("Can't find active editor model");
                }
            });
            return false;
        }
        svgPlanString = model.get("svgPlanString");
        if(!svgElementSelector){
            return false;
        }

        if((!svgElement && !svgEditor) && svgElementSelector){
            //If the target element exists, but element doesn't, setup '
            config.controller = that;
            config.svgElementSelector = svgElementSelector;
            that.set("config", config);

        //This is quite archaic and an anti-pattern. Returning the javascript object is not efficient and breaks the ethos.
            svgEditor = window.createEditor(config);
            that.checkModel();
            that.set('svgEditor', svgEditor);
            that.setSvgCanvasMeasurements(config);

            that.set("svgElement", $(svgElementSelector));
           // that.set("svgElem", that.$().find(svgElementSelector));
        }else if(svgElementSelector && svgElement && svgEditor){
            //Already initialized, replace targetElement
            $(svgElementSelector).replaceWith(svgElement);
        }
        if(model.get("step") === 2){
            if(model.get("method") === "rectangle"){
              //here we have to translate the pixel dimensions into the physical dimensions. How can  we do this?
              // First of all, get the width and height of the canvas area.
              console.log(config.dimensions);
              console.log({width:model.get("width"), height: model.get("height")});
              //var tidyuo
              var widthAspect = config.dimensions[0] / model.get("width");
              var heightAspect = config.dimensions[1] / model.get("height");
              //not too sure if this is right. If
              // if width of the css is
              //apply buffers for visual
              rectXBuffer = config.dimensions[0]*0.2;
              rectYBuffer = config.dimensions[1]*0.2;
              if(widthAspect < heightAspect){
                rectWidth = config.dimensions[0] - rectXBuffer;
                rectPercentage = model.get("width") / model.get("height");
                //Allow a gap so we can place the rectangle in the middle of the planner

                rectHeight =  (rectWidth * rectPercentage);

              }else{
                rectHeight = config.dimensions[1] - rectYBuffer;
                //get the percentage difference of the measurement height / width
                rectPercentage = model.get("height") / model.get("width");

                rectWidth = (rectHeight * rectPercentage);

              }
              var containerPhysicalDimensions = {
                width: (config.dimensions[0] / rectWidth) * model.get("width"),
                height: (config.dimensions[1] / rectHeight) * model.get("height")
              };
              that.set("config.physicalDimensions", containerPhysicalDimensions);
              //As this is the
              svgEditor.canvas.addSvgElementFromJson({
                "element": "rect",
                "curStyles": true,
                "attr": {
                  "x": (rectXBuffer/2),
                  "y": (rectYBuffer/2),
                  "width": rectWidth,
                  "height": rectHeight,
                  "id": svgEditor.canvas.getNextId(),
                  "opacity": 1
                }
              });
            }else if(model.get("method") === "draw"){
                svgEditor.canvas.setSvgString(svgedit.utilities.decode64(svgPlanString));
            }
        }
    }.observes("svgElementSelector"),

    loadProductSVGFromURL : function(product) {
        var that = this, model = that.get("model");
        var svgEditor = that.get("svgEditor");
        $.ajax({
            'url' : product.get("svg.plan"),
            'dataType' : 'text',
            cache : false,
            success : function(str) {
                var measurementMultiplier = 0;
                //now we have to modify the width / height of the svg to match that of the container for scaling
                var $svg =  $(str);
                var physicalDimensions = that.get("config.physicalDimensions");
                var cssDimensions = that.get("config.dimensions");
                var productDimensions = product.get("dimensions");
                //WE NEED TO REMEMBER THAT ALL PRODUCT DIMENSIONS ARE IN MM
                if(model.get("measurement") === "cm"){
                  //this should be upgraded to a  more efficient measurement matrix.
                  measurementMultiplier = 10;
                }
                var widthPercentage = (productDimensions.width/measurementMultiplier) / physicalDimensions.width;
                var heightPercentage = (productDimensions.height/measurementMultiplier) / physicalDimensions.height;
                var cssWidth = cssDimensions[0] * widthPercentage;
                var cssHeight = cssDimensions[1] * heightPercentage;
                $svg.attr("width", cssWidth);
                $svg.attr("height", cssHeight);
                svgEditor.canvas.importSvgString($('<div>').append($svg.clone()).html());

            },
            error : function(xhr, stat, err) {
                if (xhr.status != 404 && xhr.responseText) {
                    svgEditor.setSvgString(xhr.responseText);
                } else {
                    $.alert(uiStrings.notification.URLloadFail + ": \n" + err + '', cb);
                }
            }
        });
    },
    addBasketProduct : function(product){
        var that = this, editorModel = that.get("model"), existingItem = false;
        // check whether product already exists within items. This could probably be done better than a forEach.
        editorModel.get("basket").then(function(basketModel){
            basketModel.get("basketItems").then(function(basketItems){
                if(basketItems.length){
                    basketItems.forEach(function(basketItem){
                        if(basketItem.get("product.id") === product.get("id")){
                            basketItem.set("quantiy", basketItem.get("quantity")+1);
                            basketItem.save();
                            existingItem = true;
                        }

                    });
                }
                //If we need to create a model, do it below.
                if(!existingItem){
                    that.store.createRecord("basket-item",{
                        product: product,
                        quantity: 1
                    }).save().then(function(basketItemModel){
                        basketItems.addObject(basketItemModel);
                        that.loadProductSVGFromURL(product);
                    });
                    //add to the collection

                }
            });
        });
    },
    //the product SVG is passed from add Product or ...
    loadProductSVG : function(productSVG) {
        var that = this;
        var svgEditor = that.get("svgEditor");
        svgEditor.svgCanvas.importSvgString(svgedit.utilities.decode64(productSVG));
    },
    loadSvgPlanString : function() {
        //Load the svg plan from the model. Saved as base64.
        var that = this;
        var model = that.get("model");
        var svgEditor = that.get("svgEditor");
        var svgPlanString = model.get("svgPlanString");
        if(!svgPlanString){
            alert("Empty SVG Plan String");
        }else{
            svgEditor.canvas.setSvgString(svgedit.utilities.decode64(svgPlanString));
        }
    },
    init : function() {
        //alert("Editor initialized");
    }
});
