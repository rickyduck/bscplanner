import Ember from 'ember';
export default Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("<button>Create a new design</button>");
  }

  data.buffer.push("\r\n        <div id=\"wrap\">\r\n		<header>\r\n			<h1><a href=\"#\">British Standard Cupboards by Plain English</a></h1>\r\n		</header>\r\n		<main>\r\n			<section class=\"wrapper\">\r\n				<h2>Welcome to the british standard Kitchen planner</h2>\r\n				<p>Draw your kitchen area and create your perfect british standard kitchen. Drag and drop your kitchen cupboards and design it how you want.</p>\r\n				<menu class=\"home center clearfix\">\r\n					");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index.shape", options) : helperMissing.call(depth0, "link-to", "index.shape", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n					<button>Open a saved plan</button>\r\n				</menu>\r\n			</section>\r\n		</main>\r\n		</div>\r\n		<footer>\r\n			<nav class=\"wide\">\r\n				<ul>\r\n					<li><a class=\"active\" href=\"#\">Dimensions <br> <span class=\"circle\">1</span></a></li>\r\n					<li><a href=\"#\">Design <br> <span class=\"circle\">2</span></a></li>\r\n					<li><a href=\"#\">Save <br> <span class=\"circle\">3</span></a></li>\r\n					<li><a href=\"#\">Order <br> <span class=\"circle\">4</span></a></li>\r\n				</ul>\r\n			</nav>\r\n		</footer>");
  return buffer;
  
});
