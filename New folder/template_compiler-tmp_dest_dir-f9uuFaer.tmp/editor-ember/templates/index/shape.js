import Ember from 'ember';
export default Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<div id=\"wrap\">\r\n    	<aside class=\"toolbar\">\r\n			<button class=\"display\"></button>\r\n		</aside>\r\n		<header>\r\n			<h1><a href=\"#\">British Standard Cupboards by Plain English</a></h1>\r\n		</header>\r\n		<main>\r\n			\r\n			<section class=\"wrapper\">\r\n				<h2>Create Your Kitchen Area</h2>\r\n				<menu class=\"clearfix center\">\r\n					\r\n					<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "chooseMethod", "rectangle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data})));
  data.buffer.push("><img src=\"img/step1image1.png\" />\r\n						<p>Square/Rectangle</p>\r\n					</button>\r\n					\r\n					<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "chooseMethod", "draw", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data})));
  data.buffer.push(">\r\n						<img src=\"img/step1image2.png\" />\r\n						<p>Draw a custom shape</p>\r\n					</button>\r\n					\r\n				</menu>\r\n			</section>\r\n		</main>\r\n		</div>\r\n		");
  return buffer;
  
});
