import Ember from 'ember';

export default Ember.ArrayController.extend({
    itemController: 'basket',
    actions: {
        deleteBaskets : function(find){
            this.deleteBaskets(find);
        }
    },
    deleteBaskets: function(find){
        var that = this;
        that.store.find("basket", find).then(function(basketsToDel){
            basketsToDel.forEach(function(basketToDel){
                //promises. Promises. PROMISES. Move this to the controller for editor? .
                basketToDel.get("basketItems").then(function(itemsToDel){
                   itemsToDel.forEach(function(itemToDel){
                       //remove from parent; not really neccessary as we delete parent;
                       itemsToDel.removeObject(itemToDel);
                       itemToDel.deleteRecord();
                       itemToDel.save();
                   });
                   
                });
                //delete Basket
               basketToDel.deleteRecord();
               basketToDel.save();  
            });
            
        });
    }
});
