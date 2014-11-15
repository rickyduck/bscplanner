import DS from 'ember-data';

var Product =  DS.Model.extend({
  sku: DS.attr("string"),
  name: DS.attr("string"),
  set: DS.attr("string"),
  type: DS.attr("string"),
  dimensions: DS.attr(),
  price: DS.attr("number"),
  description: DS.attr("string"),
  short_description: DS.attr("string"),
  url_key: DS.attr("string"),
  meta_title: DS.attr("string"),
  svg: DS.attr(),
  categories: DS.hasMany("category", {async:false, embedded:'always'})
});


Product.reopenClass({
  FIXTURES: [
    {
      id: 1,
      sku: "TEST-123",
      name: "Test Product 1",
      set: "n/a",
      type: "floor_cupboard",
      dimensions: {
        width: 200,
        height:600,
        depth: 400
      },
      svg: {
        plan: "svg/alt_F350SL-plan.svg",
        front: "svg/alt_F350SL-frontele.svg"
      },
      price: 100,
      description: "A test product",
      short_description: "A test short",
      url_key: "url",
      meta_title: "Test product",
      
      categories: ["1"]
    },
    {
      id: 2,
      sku: "TEST-124",
      name: "Test Product 2",
      set: "n/a",
      type: "floor_cupboard",
      dimensions: {
        width: 200,
        height:600,
        depth: 400
      },
      svg: {
        plan: "svg/alt_F350SL-plan.svg",
        front: "svg/alt_F350SL-frontele.svg"
      },
      price: 100,
      description: "A test product 5",
      short_description: "A test short 2",
      url_key: "url",
      meta_title: "Test product",
      
      categories: ["1", "2", "3", "4"]
    },
    {
      id: 3,
      sku: "TEST-125",
      name: "Test Product 3",
      set: "n/a",
      type: "floor_cupboard",
      dimensions: {
        width: 200,
        height:600,
        depth: 400
      },
      svg: {
        plan: "svg/alt_F350SL-plan.svg",
        front: "svg/alt_F350SL-frontele.svg"
      },
      price: 100,
      description: "A test product",
      short_description: "A test short 3",
      url_key: "url",
      meta_title: "Test product",
      
      categories: ["3"]
    },
    {
      id: 4,
      sku: "TEST-123",
      name: "Test Product 4",
      set: "n/a",
      type: "floor_cupboard",
      dimensions: {
        width: 200,
        height:600,
        depth: 400
      },
      svg: {
        plan: "svg/alt_F350SL-plan.svg",
        front: "svg/alt_F350SL-frontele.svg"
      },
      price: 100,
      description: "A test product",
      short_description: "A test short 4",
      url_key: "url",
      meta_title: "Test product",
      
      categories: ["1", "4"]
    }
  ]
});

export default Product;