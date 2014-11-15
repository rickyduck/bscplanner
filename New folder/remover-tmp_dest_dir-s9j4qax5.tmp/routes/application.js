import Ember from 'ember';

export default Ember.Route.extend({
    needs: ['error'],
    actions: {
        handleError: function(error){
            var that = this;
            that.store.find("error", error.id).then(function(errorObj){
                var update = {
                    id: errorObj.get("id"),
                    model: error.model,
                    controller: error.controller
                }
                that.store.update("error", update);
                that.transitionTo("error", errorObj); 
            });
        }
    }
});
