import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: '/api/local'
});
//export default DS.FixtureAdapter.extend();