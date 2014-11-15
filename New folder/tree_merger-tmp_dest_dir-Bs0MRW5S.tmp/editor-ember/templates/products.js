import Ember from 'ember';
export default Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                	");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "product", {hash:{
    'product': ("product"),
    'templateName': ("product")
  },hashTypes:{'product': "ID",'templateName': "STRING"},hashContexts:{'product': depth0,'templateName': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("\n                	");
  return buffer;
  }

  data.buffer.push("<ul ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("category.isOpen:active")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                	");
  stack1 = helpers.each.call(depth0, "product", "in", "category.products", {hash:{
    'itemController': ("product")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </ul>");
  return buffer;
  
});
