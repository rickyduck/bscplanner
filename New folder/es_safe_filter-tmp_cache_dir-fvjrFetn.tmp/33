import DS from 'ember-data';

var Category = DS.Model.extend({
	parent_id: DS.attr("string"),
	name: DS.attr("string"),
	is_active: DS.attr("boolean"),
	is_visible: false,
	position: DS.attr("string"),
	level: DS.attr("string"),
	children: DS.attr(),
	products: DS.hasMany('product', {async: false, embedded: 'always' }),
	slug: function() {
	    return this.get('name').dasherize();
	}.property('name')
});

Category.reopenClass({
  FIXTURES: [
    {
    	id: 1,
    	parent_id: null,
		name: "Test category",
		is_active: true,
		is_visible: false,
		position: "1",
		level: "1",
		children: []
	},
	{
    	id: 2,
    	parent_id: null,
		name: "Test category 2",
		is_active: false,
		is_visible: false,
		position: "1",
		level: "1",
		children: []
	},
	{
    	id: 3,
    	parent_id: null,
		name: "Test category 3",
		is_active: true,
		is_visible: false,
		position: "1",
		level: "1",
		children: []
	},
	{
    	id: 4,
    	parent_id: null,
		name: "Test category 4",
		is_active: true,
		is_visible: false,
		position: "1",
		level: "1",
		children: []
	},
	{
    	id: 5,
    	parent_id: null,
		name: "Test category",
		is_active: true,
		is_visible: false,
		position: "1",
		level: "1",
		children: []
	},
  ]
});
export default Category;