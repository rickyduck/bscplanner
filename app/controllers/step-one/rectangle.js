import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['editor', 'step-one'],

    editorController: Ember.computed.alias('controllers.editor'),
    init: function(){
        var editorController = this.get("editorController");
        var stepOneController = this.get("controllers.step-one");
        stepOneController.send("setupEditor");
    },
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
        deletePlan: function(){
            var that = this;
            var editorController = that.get('controllers.editor');
            editorController.send('clear');
        }
    }
});
