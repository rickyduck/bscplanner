import DS from 'ember-data';

export default DS.Model.extend({
    width: DS.attr("number"),
    height: DS.attr("number"),
    step: DS.attr("number"),
    measurement: DS.attr("string"),
    method: DS.attr("string"),
    svgEditor: DS.attr(),
    wireframe: DS.attr("boolean"),
    svgString: DS.attr("string"),
    svg: DS.belongsTo('svg')
});
