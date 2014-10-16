import DS from 'ember-data';

export default DS.Model.extend({
  svg: DS.belongsTo('svg')
});
