import DS from 'ember-data';

export default DS.Model.extend({
    basket: DS.belongsTo("basket"),
    product: DS.belongsTo("product"),
    quantity: DS.attr("number"),
    total: function(){
        return this.get("quantity") * this.get("product").get("price");
    }.property("quantity")
});
