import DS from 'ember-data';

export default DS.Model.extend({
    width: null,
    
  svg: DS.belongsTo('svg')
});
