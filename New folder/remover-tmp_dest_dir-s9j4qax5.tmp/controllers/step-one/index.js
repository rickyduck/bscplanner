import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['editor'],
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
        deletePlan: function(){
            var that = this;
            var editorController = that.get('controllers.editor');
            editorController.send('clear');
        }
    }
});
