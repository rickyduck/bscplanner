import DS from 'ember-data';

export default
DS.Model.extend({
    width : DS.attr("number"),
    height : DS.attr("number"),
    step : DS.attr("number"),
    measurement : DS.attr("string"),
    method : DS.attr("string"),
    svgEditor : DS.attr(),
    wireframe : DS.attr("boolean"),
    svgString : DS.attr("string"),
    svgPlanString : DS.attr("string"),
    svg : DS.belongsTo('svg'),
    area : (function() {
        var multiplier = this.get("measurement") == "mm" ? 1000 : 100;
        return (this.get("width") * this.get("width") / multiplier);
    }).property("width", "height", "measurement"),
});
