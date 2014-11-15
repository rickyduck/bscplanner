import Ember from 'ember';
export default Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n		On\r\n		");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n		Off\r\n		");
  }

  data.buffer.push("<div id=\"wf\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("wireframe:wireframe")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n\r\n	<div class=\"info\">\r\n		<div class=\"nextStep\">\r\n			<a href=\"#\" class=\"preview\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "nextStep", "path", {hash:{
    'target': ("view")
  },hashTypes:{'target': "ID"},hashContexts:{'target': depth0},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(">Start Designing Your Kitchen &raquo;</a>\r\n		</div>\r\n		<div class=\"scale\">\r\n			SCALE &nbsp;&nbsp;<span class=\"zoomVal\">1</span>:20\r\n			<!--<form>\r\n				<input type=\"hidden\" value=\"100\" name=\"zoom\" autocomplete=\"off\">\r\n				<a href=\"#\" class=\"increaseZoom\">+</a>\r\n				<a href=\"#\" class=\"decreaseZoom disabled\">-</a>\r\n			</form>-->\r\n		</div>\r\n		<div class=\"total_size\">\r\n			AREA TOTAL: ");
  stack1 = helpers._triageMustache.call(depth0, "area", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("&#178;\r\n		</div>\r\n\r\n		<!--<div class=\"grid\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleWireframe", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("><img src=\"img/grid.png\">\r\n		<a class=\"switch\" data-toggle=\"on\">\r\n		");
  stack1 = helpers['if'].call(depth0, "wireframe", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n		</a>\r\n		</div>-->\r\n	</div>\r\n	<div id=\"workarea\">\r\n		<div id=\"svgcanvas\"></div>\r\n\r\n	</div>\r\n	<!-- <div id=\"compass\">\r\n	<a class=\"needle NS N\" href=\"#\"></a>\r\n	<a class=\"needle NS S\" href=\"#\"></a>\r\n	<a class=\"needle EW E\" href=\"#\"></a>\r\n	<a class=\"needle EW W\" href=\"#\"></a>\r\n	</div> -->\r\n\r\n</div>\r\n</div>\r\n\r\n");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "editor/toolbars", options) : helperMissing.call(depth0, "partial", "editor/toolbars", options))));
  return buffer;
  
});
