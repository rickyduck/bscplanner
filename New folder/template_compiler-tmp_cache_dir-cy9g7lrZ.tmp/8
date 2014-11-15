import Ember from 'ember';
export default Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n              ");
  stack1 = helpers['if'].call(depth0, "category.is_active", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n              ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n\n              ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "category", {hash:{
    'category': ("category")
  },hashTypes:{'category': "ID"},hashContexts:{'category': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("\n              ");
  return buffer;
  }

  data.buffer.push("<menu>\n            <ul>\n              ");
  stack1 = helpers.each.call(depth0, "category", "in", "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </ul>\n          </menu>");
  return buffer;
  
});
