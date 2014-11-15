import Ember from 'ember';
export default Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<aside class=\"left step-one\">\r\n	<nav>\r\n		<ul>\r\n			<li>\r\n				<a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setMode", "rect", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" href=\"#\">Rectangle</a>\r\n			</li>\r\n			<li>\r\n				<a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "undoPath", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" href=\"#\">Undo</a>\r\n			</li>\r\n			<li>\r\n				<a href=\"#\">Delete All</a>\r\n			</li>\r\n		</ul>\r\n	</nav>\r\n</aside>");
  return buffer;
  
});
