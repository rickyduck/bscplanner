import Ember from 'ember';

export default Ember.Controller.extend({
    //queryParams: ['method','width','height','measurement'],
    needs: ['editor','step-one'],
    
    // method: Ember.computed.alias("controllers.editor.method"),
    // width: Ember.computed.alias("controllers.editor.width"),
    // height: Ember.computed.alias("controllers.editor.height"),
    // measurement: Ember.computed.alias("controllers.editor.measurement"),
    editorController: Ember.computed.alias('controllers.editor'),
    
    actions: {
        setMode: function(mode){
            var that = this;
            var editorController = that.get('controllers.editor');
            editorController.send('setMode', mode);
        },
        undoPath: function(){
            var that = this;
            var editorController = that.get('controllers.editor');
            editorController.send('undoPath');
        },
        deletePath: function(){
            var that = this;
            var editorController = that.get('controllers.editor');
            editorController.send('clear');
        },
        nextStep: function(){
            alert("YES");
        }
    },
    nextStep: function(){
        var that = this;
        var editorController = that.get('controllers.editor');
        editorController.send('nextStep');
    }
});
