import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  attrs: {
    categories: { embedded: 'always' }
  }
});
