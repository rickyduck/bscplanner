import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: '/api'
});
//export default DS.FixtureAdapter.extend();