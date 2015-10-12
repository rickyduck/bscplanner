import DS from 'ember-data';

/*
Product model - fetched from the magento instance.

Still to be done:
1.  Add mechanism for left/right/center selection by end user. This will then show the appropriate image on the right hand side, as well as adding the appropriate to the editor on click.
    We need to find out whether or not these different variations of the same product will be the same dimensions, or, in fact, different dimensions. This may also be true for only certain products
2.  Add mechanism for windows / doors. This is chargable as an extra, so we will have to work out the cost. The end user will have the option to select what type of door / window they want to add
    to the floor plan. They then enter their own custom dimensions, and the door / window is created to their specification. This could lead to problems, however.
3.  Switching between wall view / floor view. No doubt this will have an effect on the product model. 
*/

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
  front: DS.attr(),
  side: DS.attr(),
  left_right: DS.attr(),
  center: DS.attr(),
  sidebar_image: function(){
    var that = this;
    var sidebar_image = "svg/not_available.svg";
    var svg = that.get("svg");
    if(that.get("front")){
      if(that.get("center")){
        sidebar_image = svg.front.center;
      }
      if(that.get("left_right")){
        sidebar_image = svg.front.left;
      }
    }
    if(that.get("side")){
      if(that.get("center")){
        sidebar_image = svg.side.center;
      }
      if(that.get("left_right")){
        sidebar_image = svg.side.left;
      }
    }
    return sidebar_image;
  }.property("center","front","left_right","svg"),
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
