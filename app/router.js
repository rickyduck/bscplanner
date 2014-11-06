import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
    this.route('index', {path:'/'}, function(){
        this.route('shape', {path:'/choose-shape'});
        this.route('dimensions', {path:'/dimensions'});
    });
		this.route('step-one', {path: '/step-one'}, function(){
		    this.resource('step-one/error', { path: 'step-one/error/:error_url' }, function() { });
		    this.route('draw', {path: 'draw-shape'});
		    this.route('rectangle', {path: 'draw-rectangle'});
		    
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
 

  this.resource('error', { path: 'error/:error_id' }, function() { 
      
  });
});

export default Router;
