import DS from 'ember-data';

export default DS.Model.extend({
    editor: DS.belongsTo("editor"),
    basketItems: DS.hasMany("basket-items", {async: true, embedded: 'always' }),
    total: function(){
        var that = this, basketItems = that.get("basketItems"), total = 0, product;
        //loop through basket items, get the total property from model
        basketItems.forEach(function(item){
            product = item.get("product");
            total += item.get("total");
        });
        return total;
    }.property("basketItems"),
    quantity: function(){
        var that = this, basketItems = that.get("basketItems"), quantity = 0;
        basketItems.forEach(function(basket){
            
            quantity += item.get("quantity");
        });
        return quantity;
    }.property("basketItems")
});
