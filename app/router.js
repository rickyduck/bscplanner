import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
		this.resource('step-one', {path: '/step-one'}, function(){
		});
		this.resource('step-two', {path: '/step-two'}, function(){
			this.resource('categories', {path: '/categories'}, function(){
			
				this.resource('category', {path:'/categories/:slug'}, function(){
						this.resource('products', {path: ':slug/products'},function(){


						});
				});
			});
		});
 		this.route('category');
 		//this.resource('svgs');
  		this.resource('editor', function(){});
  this.resource('sidebar', { path: 'sidebars/:sidebar_id' }, function() { });
  this.resource('StepOne', { path: 'StepOnes/:StepOne_id' }, function() { });
});

export default Router;
