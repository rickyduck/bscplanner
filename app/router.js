import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
		this.resource('index', {path: '/'}, function(){
			this.resource('categories', {path: ':slug'}, function(){
			
				this.resource('category', {path:':slug'}, function(){
						this.resource('products', {path: ':slug/products'},function(){


						});
				});
			});
		});
 		this.route('category');
 		//this.resource('svgs');
  		this.resource('editor', function(){});
});

export default Router;
