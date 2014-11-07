import Ember from 'ember';

export default
Ember.ObjectController.extend({
    needs : ['index', 'step-one'],
    //config for the editor
    modelError: null,
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
    
    nextStep : function(type) {
        // Do chekcs 
    },
    setSvgCanvasMeasurements : function() {
        var that = this;
        var svgEditor = that.get("model.svgEditor");
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
        var svgEditor = this.get("model.svgEditor");
        svgEditor.canvas.clear();
    },
    setMode : function(mode) {
        var that = this;
        var svgEditor = that.get('model.svgEditor');
        svgEditor.canvas.setStrokePaint('000000');
        svgEditor.canvas.setStrokeWidth(1);
        svgEditor.canvas.setMode(mode);
    },
    saveSvgEditor : function() {
        //set the config controller to this
        var svgObj,config;
        config = this.get("config");
        config.controller = this;
        this.set("config", config);
        //svgObj.loadFromString(svgedit.utilities.decode64("PD94bWwtc3R5bGVzaGVldCB0eXBlPSJ0ZXh0L2NzcyIgaHJlZj0iaHR0cDovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9UmFsZXdheTo0MDAsNjAwIiA/PiAgICANCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBuYW1lPSJzdmdyb290IiB4bGlua25zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHg9IjEwODAiIHk9IjcwMCIgb3ZlcmZsb3c9InZpc2libGUiPg0KCTxkZWZzPg0KCQk8ZmlsdGVyIG5hbWU9ImNhbnZhc2hhZG93IiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPg0KCQkJPGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VBbHBoYSIgc3RkRGV2aWF0aW9uPSI0IiByZXN1bHQ9ImJsdXIiPjwvZmVHYXVzc2lhbkJsdXI+DQoJCQk8ZmVPZmZzZXQgaW49ImJsdXIiIGR4PSI1IiBkeT0iNSIgcmVzdWx0PSJvZmZzZXRCbHVyIj48L2ZlT2Zmc2V0Pg0KCQkJPGZlTWVyZ2U+DQoJCQkJPGZlTWVyZ2VOb2RlIGluPSJvZmZzZXRCbHVyIj48L2ZlTWVyZ2VOb2RlPg0KCQkJCTxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyI+PC9mZU1lcmdlTm9kZT4NCgkJCTwvZmVNZXJnZT4NCgkJPC9maWx0ZXI+DQoJPC9kZWZzPg0KCTwhLS08c3ZnIG5hbWU9ImNhbnZhc0JhY2tncm91bmQiIHdpZHRoPSI4NjAiIGhlaWdodD0iNTQwIiB4PSIyMDAiIHk9IjMwIiBvdmVyZmxvdz0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOm5vbmUiPg0KCQk8ZGVmcyBuYW1lPSJwbGFjZWhvbGRlcl9kZWZzIj4NCgkJCTxwYXR0ZXJuIG5hbWU9ImNoZWNrZXJQYXR0ZXJuIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iNiIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgNSA1Ij4NCgkJCQk8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+DQoJCQkJPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjUiIGhlaWdodD0iNSIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIj48L3JlY3Q+DQoJCQk8L3BhdHRlcm4+DQoJCTwvZGVmcz4NCjwvc3ZnPi0tPg0KCTxzdmcgd2lkdGg9Ijg2MCIgaGVpZ2h0PSI1NDAiIG5hbWU9InN2Z2NvbnRlbnQiIG92ZXJmbG93PSJoaWRkZW4iIHg9IjIwMCIgeT0iMjUiIHZpZXdCb3g9IjAgMCA4MDAgNTQwIj4NCgkJPCEtLSBDcmVhdGVkIHdpdGggU1ZHLWVkaXQgLSBodHRwOi8vc3ZnLWVkaXQuZ29vZ2xlY29kZS5jb20vIC0tPg0KCQk8ZGVmcz48L2RlZnM+DQoJCTxnIHN0eWxlPSJwb2ludGVyLWV2ZW50czpub25lIj4NCgkJCTx0aXRsZSBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+YmFja2dyb3VuZDwvdGl0bGU+DQoJCQk8cmVjdCB4PSItMSIgeT0iLTEiIHdpZHRoPSIxMDgyIiBoZWlnaHQ9IjcwMiIgbmFtZT0iY2FudmFzX2JhY2tncm91bmQiIGZpbGw9Im5vbmUiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0Ij48L3JlY3Q+DQoJCTwvZz4NCgkJPGcgc3R5bGU9InBvaW50ZXItZXZlbnRzOmFsbDsgY3Vyc29yOnBvaW50ZXIiIG5hbWU9ImFyZWEiID4NCgkJCTx0aXRsZSBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+TGF5ZXIgMTwvdGl0bGU+DQoJCQk8ZyBuYW1lPSJsZWZ0TGluZSI+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1LDMwMCkiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0OyBmb250LWZhbWlseTogJ0dlb3JnaWEnLCBzYW5zLXNlcmlmOyI+NC4ybTwvdGV4dD4NCgkJCQk8bGluZSBuYW1lPSJzdmdfMSIgeTI9IjUxNi4xNTEyMzYiIHgyPSIzOCIgeTE9IjQwIiB4MT0iMzgiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+PC9saW5lPg0KCQkJPC9nPg0KCQkJPGcgbmFtZT0idG9wTGluZSI+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzc1LDI1KSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQ7IGZvbnQtZmFtaWx5OiAnR2VvcmdpYScsIHNhbnMtc2VyaWY7Ij40LjJtPC90ZXh0Pg0KCQkJCTxsaW5lIG5hbWU9InN2Z18yIiB5Mj0iMzkiIHgyPSIzNS42ODYxNSIgeTE9IjM5IiB4MT0iNzQwIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQiPjwvbGluZT4NCgkJCTwvZz4NCgkJCQ0KCQkJPGcgbmFtZT0iYm90dG9tUmlnaHRMaW5lIj4NCgkJCQk8dGV4dCBuYW1lPSJsYWJlbF82IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NjAsNDAwKSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQ7IGZvbnQtZmFtaWx5OiAnR2VvcmdpYScsIHNhbnMtc2VyaWY7Ij4yLjFtPC90ZXh0Pg0KCQkJCTxsaW5lIG5hbWU9InN2Z182IiB5Mj0iNTEyIiB4Mj0iNDQ3IiB5MT0iMjkxIiB4MT0iNDQ1IiBzdHJva2UtbGluZWNhcD0ibnVsbCIgc3Ryb2tlLWxpbmVqb2luPSJudWxsIiBzdHJva2UtZGFzaGFycmF5PSJudWxsIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQiPjwvbGluZT4NCgkJCTwvZz4NCgkJCTxnIG5hbWU9ImJvdHRvbUxpbmUiPg0KCQkJCTx0ZXh0IG5hbWU9ImxhYmVsXzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxMCw1MzQpIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdDsgZm9udC1mYW1pbHk6ICdHZW9yZ2lhJywgc2Fucy1zZXJpZjsiPjIuOG08L3RleHQ+DQoJCQkJPGxpbmUgbmFtZT0ic3ZnXzMiIHkyPSI1MTQiIHgyPSIzNS45MjI3MTMiIHkxPSI1MTQiIHgxPSI0NTAiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+PC9saW5lPg0KCQkJPC9nPg0KCQkJPGc+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLDE1MCkiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0OyBmb250LWZhbWlseTogJ0dlb3JnaWEnLCBzYW5zLXNlcmlmOyI+Mi4xbTwvdGV4dD4NCgkJCQk8bGluZSBuYW1lPSJzdmdfNyIgeTI9IjI5MS41MDc0MjYiIHgyPSI3MzgiIHkxPSIzOSIgeDE9IjczOCIgc3Ryb2tlLWxpbmVjYXA9Im51bGwiIHN0cm9rZS1saW5lam9pbj0ibnVsbCIgc3Ryb2tlLWRhc2hhcnJheT0ibnVsbCIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2U9IiMwMDAwMDAiIGZpbGw9Im5vbmUiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0Ij48L2xpbmU+DQoJCQk8L2c+DQoJCQk8ZyBuYW1lPSJib3R0b21WZXJSaWdodCI+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTU5LDMyMCkiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0OyBmb250LWZhbWlseTogJ0dlb3JnaWEnLCBzYW5zLXNlcmlmOyI+MS40bTwvdGV4dD4NCgkJCQk8bGluZSBuYW1lPSJzdmdfOCIgeTI9IjI5NCIgeDI9Ijc0MS4wNDIwODUiIHkxPSIyOTQiIHgxPSI0NDQiIHN0cm9rZS1saW5lY2FwPSJudWxsIiBzdHJva2UtbGluZWpvaW49Im51bGwiIHN0cm9rZS1kYXNoYXJyYXk9Im51bGwiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+PC9saW5lPg0KCQkJPC9nPg0KCQkJDQogIDxpbWFnZSB4bGluazpocmVmPSJodHRwOi8vd3d3LmJzYy5jb20vY3V0dXAvaW1nL2NvbXBhc3MucG5nIiBpZD0ic3ZnXzIiIGhlaWdodD0iMTg0IiB3aWR0aD0iMTg3IiB5PSIxMjAiIHg9IjE4OCIvPg0KCQk8L2c+DQoJCQ0KCTwvc3ZnPg0KCTxnIG5hbWU9InNlbGVjdG9yUGFyZW50R3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwMCwzMCkiPg0KCQk8ZyBkaXNwbGF5PSJub25lIj4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9udyIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9uZSIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9zZSIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9zdyIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfbnciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM0RjgwRkYiIHN0cm9rZT0icmdiYSgwLDAsMCwwKSIgc3R5bGU9ImN1cnNvcjpudy1yZXNpemUiIHBvaW50ZXItZXZlbnRzPSJhbGwiPjwvcmVjdD4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfbiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzRGODBGRiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDApIiBzdHlsZT0iY3Vyc29yOm4tcmVzaXplIiBwb2ludGVyLWV2ZW50cz0iYWxsIj48L3JlY3Q+DQoJCQk8cmVjdCBuYW1lPSJzZWxlY3RvckdyaXBfcmVzaXplX25lIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjNEY4MEZGIiBzdHJva2U9InJnYmEoMCwwLDAsMCkiIHN0eWxlPSJjdXJzb3I6bmUtcmVzaXplIiBwb2ludGVyLWV2ZW50cz0iYWxsIj48L3JlY3Q+DQoJCQk8cmVjdCBuYW1lPSJzZWxlY3RvckdyaXBfcmVzaXplX2UiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM0RjgwRkYiIHN0cm9rZT0icmdiYSgwLDAsMCwwKSIgc3R5bGU9ImN1cnNvcjplLXJlc2l6ZSIgcG9pbnRlci1ldmVudHM9ImFsbCI+PC9yZWN0Pg0KCQkJPHJlY3QgbmFtZT0ic2VsZWN0b3JHcmlwX3Jlc2l6ZV9zZSIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzRGODBGRiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDApIiBzdHlsZT0iY3Vyc29yOnNlLXJlc2l6ZSIgcG9pbnRlci1ldmVudHM9ImFsbCI+PC9yZWN0Pg0KCQkJPHJlY3QgbmFtZT0ic2VsZWN0b3JHcmlwX3Jlc2l6ZV9zIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjNEY4MEZGIiBzdHJva2U9InJnYmEoMCwwLDAsMCkiIHN0eWxlPSJjdXJzb3I6cy1yZXNpemUiIHBvaW50ZXItZXZlbnRzPSJhbGwiPjwvcmVjdD4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfc3ciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM0RjgwRkYiIHN0cm9rZT0icmdiYSgwLDAsMCwwKSIgc3R5bGU9ImN1cnNvcjpzdy1yZXNpemUiIHBvaW50ZXItZXZlbnRzPSJhbGwiPjwvcmVjdD4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfdyIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzRGODBGRiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDApIiBzdHlsZT0iY3Vyc29yOnctcmVzaXplIiBwb2ludGVyLWV2ZW50cz0iYWxsIj48L3JlY3Q+DQoJCTwvZz4NCgkJPHJlY3QgbmFtZT0ic2VsZWN0b3JSdWJiZXJCYW5kIiBmaWxsPSJub25lIiBzdHJva2U9IiM2NjYiIHN0cm9rZS1kYXNoYXJyYXk9IjMsMiIgZGlzcGxheT0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOm5vbmUiPjwvcmVjdD4NCgk8L2c+DQo8L3N2Zz4="));
        svgObj = window.createEditor(config);
        this.checkModel();
        this.set('model.svgEditor', svgObj);
        this.setSvgCanvasMeasurements(config);
    },

    loadProductSVGFromURL : function(url) {
        var that = this;
        var svgEditor = that.get("model.svgEditor");
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
        var svgEditor = that.get("model.svgEditor");
        svgEditor.svgCanvas.importSvgString(svgedit.utilities.decode64(product));
    },
    init : function() {
        //alert("Editor initialized");
    }
});
