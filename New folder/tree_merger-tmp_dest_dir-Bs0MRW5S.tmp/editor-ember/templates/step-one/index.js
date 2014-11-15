import Ember from 'ember';
export default Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n					<button><img src=\"img/step1image1.png\" />\n						<p>Square/Rectangle</p>\n					</button>\n					");
  }

  data.buffer.push("<div id=\"wrap\">\n    	<aside class=\"toolbar\">\n			<button class=\"display\"></button>\n		</aside>\n		<header>\n			<h1><a href=\"#\">British Standard Cupboards by Plain English</a></h1>\n		</header>\n		<main>\n			\n			<section class=\"wrapper\">\n				<h2>Create Your Kitchen Area</h2>\n				<menu class=\"clearfix center\">\n					");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "step-one.draw", options) : helperMissing.call(depth0, "link-to", "step-one.draw", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n					<button href=\"step2.html\">\n						<img src=\"img/step1image2.png\" />\n						<p>Draw a custom shape</p>\n					</button>\n				</menu>\n			</section>\n		</main>\n		</div>\n		");
  return buffer;
  
});
