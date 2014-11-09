import Ember from 'ember';

export default
Ember.ObjectController.extend({
    needs : ['index', 'step-one'],
    //config for the editor
    modelError: null,
    svgPlanString: null,
    config : {
        controller: null,
        canvas_expansion : 1,
        dimensions : ["100%", "100%"],
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
        snappingStep : 10,
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
        toggleWireframe : function() {
            this.toggleWireframe();
        },
        setMode : function(mode) {
            this.setMode(mode);
            //alert("Editor");
        },
        clear : function() {
            this.clear();
        },
        getSvg : function(type) {
            this.getSvg(type);
        },
        
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
    
    nextStep : function() {
        var that = this, svgEditor = that.get("svgEditor"), svgString = svgEditor.canvas.getSvgString();
        that.set("model.svgPlanString", svgString);
        that.transitionToRoute("/step-two");
    },
    setSvgCanvasMeasurements : function() {
        var that = this;
        var svgEditor = that.get("svgEditor");
        if (svgEditor) {
            svgEditor.measurements = {
                width : that.get("width"),
                height : that.get("height"),
                method : that.get("method"),
                measurement : that.get("measurement")
            };
        }
    }.observes('width', 'height', 'measurement'),
    toggleWireframe : function() {
        this.set("wireframe", !this.get("wireframe"));
    },
    clear : function() {
        var svgEditor = this.get("svgEditor");
        svgEditor.canvas.clear();
    },
    setMode : function(mode) {
        var that = this;
        var svgEditor = that.get('svgEditor');
        svgEditor.canvas.setStrokePaint('000000');
        svgEditor.canvas.setStrokeWidth(1);
        svgEditor.canvas.setMode(mode);
    },
    saveSvgEditor : function() {
        //set the config controller to this
        var that = this, model = that.get("model"), svgObj,config = that.get("config"), svgPlanString = model.get("svgPlanString");
        config.controller = that;
        that.set("config", config);
        if(model.get("step") === 2){
            
            if(!svgPlanString){
                
            }else{
                svgObj.loadFromString(svgedit.utilities.decode64(svgPlanString));
            }
        }
        
        svgObj = window.createEditor(config);
        that.checkModel();
        that.set('svgEditor', svgObj);
        that.setSvgCanvasMeasurements(config);
    },
    
    loadProductSVGFromURL : function(url) {
        var that = this;
        var svgEditor = that.get("svgEditor");
        $.ajax({
            'url' : url,
            'dataType' : 'text',
            cache : false,
            success : function(str) {
                svgEditor.canvas.importSvgString(str);
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
    loadProductSVG : function(product) {
        var that = this;
        var svgEditor = that.get("svgEditor");
        svgEditor.svgCanvas.importSvgString(svgedit.utilities.decode64(product));
    },
    init : function() {
        //alert("Editor initialized");
    }
});
