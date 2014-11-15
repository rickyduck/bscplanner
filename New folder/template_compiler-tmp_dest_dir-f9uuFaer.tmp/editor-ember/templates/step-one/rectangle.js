import Ember from 'ember';
export default Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<!--[if lte IE 7]>\n            <p class=\"browsehappy\">You are using an <strong>outdated</strong> browser. Please <a href=\"http://browsehappy.com/\">upgrade your browser</a> to improve your experience.</p>\n        <![endif]-->\n        ");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "sidebar", options) : helperMissing.call(depth0, "outlet", "sidebar", options))));
  data.buffer.push("\n    <div class=\"planner\">\n        <div id=\"wrap\">\n      <aside class=\"toolbar\">\n        <button class=\"display\"></button>\n        <div >\n          <menu>\n            <ul>\n              <li><a href=\"#\"><img src=\"img/settings_user.png\" /></a>\n              </li>\n              <li><a href=\"#\"><img src=\"img/settings_basket.png\" /></a>\n                <div>\n                  <header><h5>Basket</h5></header>\n                  <main>\n                    <ul class=\"noProds productList\">\n                      <li>No products yet</li>\n                    </ul>\n                  </main>\n                  <footer class=\"bottom\">\n                    <span class=\"total\">Total: &pound;7,899</span>\n                    <a href=\"#\">Order/Confirm</a>\n                  </footer>\n                </div>\n              </li>\n            </ul>\n          </menu>\n        </div>\n      </aside>\n    <header>\n      <h1><a href=\"#\">British Standard Cupboards by Plain English</a></h1>\n    </header>\n    <main style=\"overflow:visible\">\n      \n    \n\n");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "editor", options) : helperMissing.call(depth0, "outlet", "editor", options))));
  data.buffer.push("\n</main>\n    \n    <footer>\n      <nav>\n        <ul>\n          <li><a href=\"#\">Dimensions <br> <span class=\"circle\">1</span></a></li>\n          <li><a class=\"active\" href=\"#\">Design <br> <span class=\"circle\">2</span></a></li>\n          <li><a href=\"#\">Save <br> <span class=\"circle\">3</span></a></li>\n          <li><a href=\"#\">Order <br> <span class=\"circle\">4</span></a></li>\n        </ul>\n        <ul class=\"right\">\n          <li><a href=\"#\">New</a></li>\n          <li><a href=\"#\">Open</a></li>\n          <li><a href=\"#\">Exit</a></li>\n        </ul>\n      </nav>\n    </footer>\n    </div>\n\n");
  return buffer;
  
});
