import Ember from 'ember';
export default Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\nOn\n");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\nOff\n");
  }

  data.buffer.push("<div id=\"wf\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("wireframe:wireframe")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n  <a href=\"#\" class=\"preview\">Preview</a>\n\n<div id=\"workarea\">\n<div id=\"svgcanvas\"></div>\n</div>\n<!-- <div id=\"compass\">\n  <a class=\"needle NS N\" href=\"#\"></a>\n  <a class=\"needle NS S\" href=\"#\"></a>\n  <a class=\"needle EW E\" href=\"#\"></a>\n  <a class=\"needle EW W\" href=\"#\"></a>\n</div> -->\n<div class=\"scale\">\n  SCALE <span class=\"zoomVal\">1</span>:10\n  <form>\n    <input type=\"hidden\" value=\"100\" name=\"zoom\" />\n    <a href=\"#\" class=\"increaseZoom\">+</a>\n    <a href=\"#\" class=\"decreaseZoom disabled\">-</a>\n  </form>\n</div>\n<div class=\"total_size\">AREA TOTAL: 17.64m&#178;</div>\n<a href=\"#\" class=\"showFloorPlan\">Floor Plan</a>\n<div class=\"grid\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleWireframe", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("><img src=\"img/grid.png\"> <a class=\"switch\" data-toggle=\"on\">\n");
  stack1 = helpers['if'].call(depth0, "wireframe", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</a></div>\n</div>\n</div>\n\n\n\n");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "editor/toolbars", options) : helperMissing.call(depth0, "partial", "editor/toolbars", options))));
  data.buffer.push("\n\n\n\n\n\n\n\n\n");
  return buffer;
  
});
