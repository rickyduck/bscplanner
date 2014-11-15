import DS from 'ember-data';

export default DS.Model.extend({
  svgBase64: DS.attr('string'),
  editor: DS.belongsTo('editor')
});
