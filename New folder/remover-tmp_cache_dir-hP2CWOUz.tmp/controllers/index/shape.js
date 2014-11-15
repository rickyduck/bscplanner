import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['index'],
    actions: {
        chooseProduct: function(){
            alert("Choose product");
        },
        chooseMethod: function(method){
            this.get("controllers.index").send("chooseMethod", method);
            this.transitionToRoute('index.dimensions');
        }
    },
});
