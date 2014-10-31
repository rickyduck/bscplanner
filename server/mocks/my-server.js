module.exports = function(app) {
  var express = require('express'), _ = require('underscore'), message = require('events'), myServerRouter = express.Router(), wait=require('wait.for'), Fiber = require('fibers/future');
  var MagentoAPI = require('magento');
  var magento = new MagentoAPI({
	  host: 'britishstandard.strategiqmarketing.co.uk',
	  port: 80,
	  path: '/api/soap/',
	  login: 'ember',
	  pass: '3mb3r123'
  });
  myServerRouter.get('/categories', function(req, res) {
 	   
 	
		magento.login(function(err, sessId) {
		  if (err) {
		    // deal with error
		    res.send(arguments);
		    return;
		  }
		  magento.catalogCategory.tree(function(err, categories){
		 //  	app.categories = categories;
		 //  	app.totalCategories = 0;
		 //  	app.checkedCategories = 0;
		 
		 //  	function checkCategoryChildren(category){

		 //  		if(category.category_id){
			// 	  		magento.catalogCategory.info({categoryId: category.category_id},function(err,category_info) {
			// 	  			app.checkedCategories++;
			// 		  		if(category_info.category_id){	
			// 		  			console.log(category.category_id);
			// 		  		 	category.category_info = category_info;
			// 		  		}

			// 		  			app.emit("info_loaded");
					  		
			// 		  	});
			//   		console.log("HERE'S CATEGORY");
			//   		// console.log(category);
			//   		// console.log("HERE'S CATEGORY END");
			  		
			//   	}else{
			//   		console.log("no cat id");
			//   		if(typeof key !== 'undefined'){
			//   		 	delete(categories[key]);
			//   		 	totalCategories--;
			//   		}
			//   	}
			//   	return category;
		 //  	}
		 //  	function checkLength(categories, totalCategories){
		 //  		_.each(categories,function(category){
		 //  			var i = 0;
		 //  			if(category && category.children && category.children.length){
		 //  				totalCategories += category.children.length;
			// 	  		totalCategories = checkLength(category.child,totalCategories);
			// 	  	}
			// 	});
		 //  		return totalCategories;
		 //  	}
		 //  	function getCategories(categories){
		 //  		var cat_count=0;
		 //  		console.log(typeof categories.category_id);
		 //  		if(typeof categories.category_id === "undefined"){
			//   		// Object.keys(categories).forEach(function(key) {
			  		

			//   		// 	var category = checkCategoryChildren(categories[key]);
			//   		console.log(categories);
			//   		_.each(categories,function(category){
			  			
			// 		  	console.log("getcatchildren");
			// 		  	console.log(category.category_id);
			//   			category = checkCategoryChildren(category,categories);
			//   			if(category.children.length){
			// 		  		category.children = getCategories(category.children);
			// 		  	}
			//   			console.log("category");
			//   			categories[cat_count] = category;
			//   			cat_count++;
			//   		});

			// 	}else{
			// 		console.log(typeof categories.category_id);
			// 		console.log(categories);
			// 		categories = checkCategoryChildren(categories);
			// 		if(categories.children.length){
			// 	  		categories.children = getCategories(categories.children);
			// 	  	}
			// 	}
		 //  		return categories;
		 //  	}
		 //  	app.totalCategories = 0;
		 //  	if(categories.children){
		 //  		app.totalCategories = 1+categories.children.length;
		 //  		app.totalCategories = checkLength(categories.children, app.totalCategories);
		 //  	}else{
		 //  		app.totalCategories = categories.length;
		 //  		app.totalCategories = checkLength(categories, app.totalCategories);
		 //  	}
		  	
	  // 		console.log("Total categories: "+app.totalCategories);
			// getCategories(app.categories);
		 //  	app.on("info_loaded", function(){
		 //  		if(app.totalCategories === app.checkedCategories){
		 //  			res.send(app.categories);
		 //  		}
		 //  	});
			function moveThroughCategories(categories, secondArray){
				var secondArray = new Array();
				var children;
				categories.forEach(function(category){
					category.id = category.category_id;
					delete category.category_id;
					category.is_active = category.is_active?true:false;
					if(category.children.length){
						secondArray = moveThroughCategories(category.children, secondArray);
					}
					category.categories = _.map(category.children, function(category){
						return category.id;
					});
					delete category.children;
					secondArray.push(category);
				});

				return (secondArray);
			}
			if(typeof categories.category_id !== "undefined"){
				
				categories = [categories];
			}
			categories = moveThroughCategories(categories, new Array());
		   	res.send({"categories": categories});
		   });
		  // use magento
		  	
		});
  	
  });
  myServerRouter.get('/products', function(req, res) {
 	var topProds= new Array();
	var i = 0;
	var emmitted = 0;
	app.on("product_info_loaded", function(){
			console.log('emit');
			if(!emmitted){
				emmitted = 1;
				res.send({"products":topProds});
			}
    });
 	console.log("getting login");
		magento.login(function(err, sessId) {
		  if (err) {
		    // deal with error
		    console.log(arguments);
		    return;
		  }
		  
		  console.log("getting product");
		  magento.catalogProduct.list( function(err, products){
		  	console.log(products);
		  	if(typeof product == undefined){
		  		return false;
		  	}
		  	if(typeof products == 'undefined'){
		  		return false;
		  	}
		  	if(typeof products.product_id !== "undefined"){
				arr = new Array();
				arr.push(products);
				products = arr;
			}
			
			var productsLength = products.length;
		  	products.forEach(function(product){
		  		if(typeof product !== "undefined" && typeof product.product_id !== "undefined" && product.set === "9") {
			  		magento.catalogProduct.info({id: product.product_id}, function(err, response){
			  			if(err){
			  				console.log(err);
			  			}
					  	product = response;
					  	product.id = product.product_id;
				  		product.categories = product.category_ids;
				  		delete product.category_ids;
				  		delete product.product_id;
				  		product.dimensions = {
				  			width: product.dimensions_width,
				  			height: product.dimensions_height,
				  			depth: product.dimensions_depth,
				  		}
				  		product.svg = {
					        plan: "svg/alt_F350SL-plan.svg",
					        front: "svg/alt_F350SL-frontele.svg"
					    };
				  		magento.catalogProductAttributeMedia.list({product: product.id}, function(err, response){
				  		 	product.media = response;
				  			products[i] = product;
					  		console.log(i);
					  		topProds.push(product);
					  		i++;
					  		if(i===productsLength){
					  			app.emit("product_info_loaded", topProds);
					  			
					  		}
				  		});
				  		
				  		

					});
				}else{
					product.svg = {
				        plan: "svg/alt_F350SL-plan.svg",
				        front: "svg/alt_F350SL-frontele.svg"
				      };
		  			products[i] = product;
			  		console.log(i);
			  		i++;
			  		if(i===productsLength){
			  			topProds = products;
			  			app.emit("product_info_loaded",topProds);
			  			
			  		}
				}
		  	});
		  	
		  });
		});
	});
  //Get product by ID
  myServerRouter.get('/products/:prodid', function(req, res) {
  	magento.login(function(err, sessId) {
  		console.log("prodid");
		  if (err) {
		    // deal with error
		    res.send(arguments);
		    return;
		  }
		  
		  magento.catalogProduct.info({id: req.params.prodid}, function(err, response){
		  	res.send(response);
		});
	});
  });
  //Get custom options by product ID
  myServerRouter.get('/products/:prodid/custom_options', function(req, res) {
  	magento.login(function(err, sessId) {
		  if (err) {
		    // deal with error
		    res.send(arguments);
		    return;
		  }
		  
		  magento.catalogProductCustomOption.list({productId: req.params.prodid}, function(err, response){
		  	res.send(response);
		});
	});
  });
  //Get SVG
  myServerRouter.get('/svgs/:id', function(req, res){
  	magento.login(function(err, sessId) {
		  if (err) {
		    // deal with error
		    res.send(arguments);
		    return;
		  }
		  magento.resource(sessId, function(resource){
		  	console.log("resource");
		  	console.log(resource);
		  });
		  magento.svgs.list({id: req.params.id}, function(err, response){
		  //	  	console.log({'req': req, 'arguments':arguments});

		  	res.send(arguments);
		});
	});
  });

  //setup local server for offline testing
  myServerRouter.get('/local/svgs', function(req, res){
  	var data = {"svgs": [{id:1, editor:1, svgBase64: 'PD94bWwtc3R5bGVzaGVldCB0eXBlPSJ0ZXh0L2NzcyIgaHJlZj0iaHR0cDovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9UmFsZXdheTo0MDAsNjAwIiA/PiAgICANCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBuYW1lPSJzdmdyb290IiB4bGlua25zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHg9IjEwODAiIHk9IjcwMCIgb3ZlcmZsb3c9InZpc2libGUiPg0KCTxkZWZzPg0KCQk8ZmlsdGVyIG5hbWU9ImNhbnZhc2hhZG93IiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPg0KCQkJPGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VBbHBoYSIgc3RkRGV2aWF0aW9uPSI0IiByZXN1bHQ9ImJsdXIiPjwvZmVHYXVzc2lhbkJsdXI+DQoJCQk8ZmVPZmZzZXQgaW49ImJsdXIiIGR4PSI1IiBkeT0iNSIgcmVzdWx0PSJvZmZzZXRCbHVyIj48L2ZlT2Zmc2V0Pg0KCQkJPGZlTWVyZ2U+DQoJCQkJPGZlTWVyZ2VOb2RlIGluPSJvZmZzZXRCbHVyIj48L2ZlTWVyZ2VOb2RlPg0KCQkJCTxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyI+PC9mZU1lcmdlTm9kZT4NCgkJCTwvZmVNZXJnZT4NCgkJPC9maWx0ZXI+DQoJPC9kZWZzPg0KCTwhLS08c3ZnIG5hbWU9ImNhbnZhc0JhY2tncm91bmQiIHdpZHRoPSI4NjAiIGhlaWdodD0iNTQwIiB4PSIyMDAiIHk9IjMwIiBvdmVyZmxvdz0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOm5vbmUiPg0KCQk8ZGVmcyBuYW1lPSJwbGFjZWhvbGRlcl9kZWZzIj4NCgkJCTxwYXR0ZXJuIG5hbWU9ImNoZWNrZXJQYXR0ZXJuIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iNiIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgNSA1Ij4NCgkJCQk8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+DQoJCQkJPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjUiIGhlaWdodD0iNSIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIj48L3JlY3Q+DQoJCQk8L3BhdHRlcm4+DQoJCTwvZGVmcz4NCjwvc3ZnPi0tPg0KCTxzdmcgd2lkdGg9Ijg2MCIgaGVpZ2h0PSI1NDAiIG5hbWU9InN2Z2NvbnRlbnQiIG92ZXJmbG93PSJoaWRkZW4iIHg9IjIwMCIgeT0iMjUiIHZpZXdCb3g9IjAgMCA4MDAgNTQwIj4NCgkJPCEtLSBDcmVhdGVkIHdpdGggU1ZHLWVkaXQgLSBodHRwOi8vc3ZnLWVkaXQuZ29vZ2xlY29kZS5jb20vIC0tPg0KCQk8ZGVmcz48L2RlZnM+DQoJCTxnIHN0eWxlPSJwb2ludGVyLWV2ZW50czpub25lIj4NCgkJCTx0aXRsZSBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+YmFja2dyb3VuZDwvdGl0bGU+DQoJCQk8cmVjdCB4PSItMSIgeT0iLTEiIHdpZHRoPSIxMDgyIiBoZWlnaHQ9IjcwMiIgbmFtZT0iY2FudmFzX2JhY2tncm91bmQiIGZpbGw9Im5vbmUiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0Ij48L3JlY3Q+DQoJCTwvZz4NCgkJPGcgc3R5bGU9InBvaW50ZXItZXZlbnRzOmFsbDsgY3Vyc29yOnBvaW50ZXIiIG5hbWU9ImFyZWEiID4NCgkJCTx0aXRsZSBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+TGF5ZXIgMTwvdGl0bGU+DQoJCQk8ZyBuYW1lPSJsZWZ0TGluZSI+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1LDMwMCkiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0OyBmb250LWZhbWlseTogJ0dlb3JnaWEnLCBzYW5zLXNlcmlmOyI+NC4ybTwvdGV4dD4NCgkJCQk8bGluZSBuYW1lPSJzdmdfMSIgeTI9IjUxNi4xNTEyMzYiIHgyPSIzOCIgeTE9IjQwIiB4MT0iMzgiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+PC9saW5lPg0KCQkJPC9nPg0KCQkJPGcgbmFtZT0idG9wTGluZSI+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzc1LDI1KSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQ7IGZvbnQtZmFtaWx5OiAnR2VvcmdpYScsIHNhbnMtc2VyaWY7Ij40LjJtPC90ZXh0Pg0KCQkJCTxsaW5lIG5hbWU9InN2Z18yIiB5Mj0iMzkiIHgyPSIzNS42ODYxNSIgeTE9IjM5IiB4MT0iNzQwIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQiPjwvbGluZT4NCgkJCTwvZz4NCgkJCQ0KCQkJPGcgbmFtZT0iYm90dG9tUmlnaHRMaW5lIj4NCgkJCQk8dGV4dCBuYW1lPSJsYWJlbF82IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NjAsNDAwKSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQ7IGZvbnQtZmFtaWx5OiAnR2VvcmdpYScsIHNhbnMtc2VyaWY7Ij4yLjFtPC90ZXh0Pg0KCQkJCTxsaW5lIG5hbWU9InN2Z182IiB5Mj0iNTEyIiB4Mj0iNDQ3IiB5MT0iMjkxIiB4MT0iNDQ1IiBzdHJva2UtbGluZWNhcD0ibnVsbCIgc3Ryb2tlLWxpbmVqb2luPSJudWxsIiBzdHJva2UtZGFzaGFycmF5PSJudWxsIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQiPjwvbGluZT4NCgkJCTwvZz4NCgkJCTxnIG5hbWU9ImJvdHRvbUxpbmUiPg0KCQkJCTx0ZXh0IG5hbWU9ImxhYmVsXzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxMCw1MzQpIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdDsgZm9udC1mYW1pbHk6ICdHZW9yZ2lhJywgc2Fucy1zZXJpZjsiPjIuOG08L3RleHQ+DQoJCQkJPGxpbmUgbmFtZT0ic3ZnXzMiIHkyPSI1MTQiIHgyPSIzNS45MjI3MTMiIHkxPSI1MTQiIHgxPSI0NTAiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+PC9saW5lPg0KCQkJPC9nPg0KCQkJPGc+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLDE1MCkiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0OyBmb250LWZhbWlseTogJ0dlb3JnaWEnLCBzYW5zLXNlcmlmOyI+Mi4xbTwvdGV4dD4NCgkJCQk8bGluZSBuYW1lPSJzdmdfNyIgeTI9IjI5MS41MDc0MjYiIHgyPSI3MzgiIHkxPSIzOSIgeDE9IjczOCIgc3Ryb2tlLWxpbmVjYXA9Im51bGwiIHN0cm9rZS1saW5lam9pbj0ibnVsbCIgc3Ryb2tlLWRhc2hhcnJheT0ibnVsbCIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2U9IiMwMDAwMDAiIGZpbGw9Im5vbmUiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0Ij48L2xpbmU+DQoJCQk8L2c+DQoJCQk8ZyBuYW1lPSJib3R0b21WZXJSaWdodCI+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTU5LDMyMCkiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0OyBmb250LWZhbWlseTogJ0dlb3JnaWEnLCBzYW5zLXNlcmlmOyI+MS40bTwvdGV4dD4NCgkJCQk8bGluZSBuYW1lPSJzdmdfOCIgeTI9IjI5NCIgeDI9Ijc0MS4wNDIwODUiIHkxPSIyOTQiIHgxPSI0NDQiIHN0cm9rZS1saW5lY2FwPSJudWxsIiBzdHJva2UtbGluZWpvaW49Im51bGwiIHN0cm9rZS1kYXNoYXJyYXk9Im51bGwiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+PC9saW5lPg0KCQkJPC9nPg0KCQkJDQogIDxpbWFnZSB4bGluazpocmVmPSJodHRwOi8vd3d3LmJzYy5jb20vY3V0dXAvaW1nL2NvbXBhc3MucG5nIiBpZD0ic3ZnXzIiIGhlaWdodD0iMTg0IiB3aWR0aD0iMTg3IiB5PSIxMjAiIHg9IjE4OCIvPg0KCQk8L2c+DQoJCQ0KCTwvc3ZnPg0KCTxnIG5hbWU9InNlbGVjdG9yUGFyZW50R3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwMCwzMCkiPg0KCQk8ZyBkaXNwbGF5PSJub25lIj4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9udyIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9uZSIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9zZSIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9zdyIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfbnciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM0RjgwRkYiIHN0cm9rZT0icmdiYSgwLDAsMCwwKSIgc3R5bGU9ImN1cnNvcjpudy1yZXNpemUiIHBvaW50ZXItZXZlbnRzPSJhbGwiPjwvcmVjdD4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfbiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzRGODBGRiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDApIiBzdHlsZT0iY3Vyc29yOm4tcmVzaXplIiBwb2ludGVyLWV2ZW50cz0iYWxsIj48L3JlY3Q+DQoJCQk8cmVjdCBuYW1lPSJzZWxlY3RvckdyaXBfcmVzaXplX25lIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjNEY4MEZGIiBzdHJva2U9InJnYmEoMCwwLDAsMCkiIHN0eWxlPSJjdXJzb3I6bmUtcmVzaXplIiBwb2ludGVyLWV2ZW50cz0iYWxsIj48L3JlY3Q+DQoJCQk8cmVjdCBuYW1lPSJzZWxlY3RvckdyaXBfcmVzaXplX2UiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM0RjgwRkYiIHN0cm9rZT0icmdiYSgwLDAsMCwwKSIgc3R5bGU9ImN1cnNvcjplLXJlc2l6ZSIgcG9pbnRlci1ldmVudHM9ImFsbCI+PC9yZWN0Pg0KCQkJPHJlY3QgbmFtZT0ic2VsZWN0b3JHcmlwX3Jlc2l6ZV9zZSIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzRGODBGRiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDApIiBzdHlsZT0iY3Vyc29yOnNlLXJlc2l6ZSIgcG9pbnRlci1ldmVudHM9ImFsbCI+PC9yZWN0Pg0KCQkJPHJlY3QgbmFtZT0ic2VsZWN0b3JHcmlwX3Jlc2l6ZV9zIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjNEY4MEZGIiBzdHJva2U9InJnYmEoMCwwLDAsMCkiIHN0eWxlPSJjdXJzb3I6cy1yZXNpemUiIHBvaW50ZXItZXZlbnRzPSJhbGwiPjwvcmVjdD4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfc3ciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM0RjgwRkYiIHN0cm9rZT0icmdiYSgwLDAsMCwwKSIgc3R5bGU9ImN1cnNvcjpzdy1yZXNpemUiIHBvaW50ZXItZXZlbnRzPSJhbGwiPjwvcmVjdD4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfdyIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzRGODBGRiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDApIiBzdHlsZT0iY3Vyc29yOnctcmVzaXplIiBwb2ludGVyLWV2ZW50cz0iYWxsIj48L3JlY3Q+DQoJCTwvZz4NCgkJPHJlY3QgbmFtZT0ic2VsZWN0b3JSdWJiZXJCYW5kIiBmaWxsPSJub25lIiBzdHJva2U9IiM2NjYiIHN0cm9rZS1kYXNoYXJyYXk9IjMsMiIgZGlzcGxheT0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOm5vbmUiPjwvcmVjdD4NCgk8L2c+DQo8L3N2Zz4='}]};
  	res.send(data);
  });
  myServerRouter.get('/local/products', function(req, res){
  	var data = {"products":[{"sku":"TEST BS-F/475SC/R","set":"9","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"Single Corner Cupboard, Blank on Right","description":"Product Specification<br/>\r\nDoor width -  475mm<br/>\r\nWidth - 565mm + 450mm blank space<br/>\r\nDepth - 600mm<br/>\r\nHeight - 900mm<br/>\r\nWeight approx - 44kg<br/>\r\nProduct Number - BS-F/475SC/R<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on &lsquo;Fitting&rsquo; for full details).</i>","short_description":"Single corner cupboard with base shelf and one adjustable shelf.","weight":"44.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"single-corner-cupboard-blank-on-right","visibility":"4","url_path":"single-corner-cupboard-blank-on-right.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:07:13-07:00","updated_at":"2014-10-07 05:38:19","kitchen_planner":"0","dimensions_depth":null,"dimensions_height":null,"dimensions_width":null,"price":"650.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"minimal_price":null,"msrp_enabled":"2","msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Single Corner Floor Cupboard, Blank on Right  - British Standard","meta_keyword":null,"meta_description":"British Standard Single Corner Floor Cupboard, Blank on Right  specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"64","dimensions":{"width":null,"height":null,"depth":null},"svg":{"plan":"svg/alt_F350SL-plan.svg","front":"svg/alt_F350SL-frontele.svg"},"media":[]},{"sku":"BS-F/475D","set":"9","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"Medium Double Cupboard","description":"Product Specification<br/>\r\nDoor width - 475mm<br/>\r\nWidth - 1040mm<br/>\r\nDepth - 600mm<br/>\r\nHeight - 900mm<br/>\r\nWeight approx - 46kg<br/>\r\nProduct Number - BS-F/475D<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on &lsquo;Fitting&rsquo; for full details).</i>","short_description":"Double cupboard with base shelf and one adjustable shelf.","weight":"46.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"medium-double-cupboard","visibility":"4","url_path":"medium-double-cupboard.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:05:50-07:00","updated_at":"2014-10-07 05:43:08","kitchen_planner":"0","dimensions_depth":null,"dimensions_height":null,"dimensions_width":null,"price":"750.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"minimal_price":null,"msrp_enabled":"2","msrp_display_actual_price_type":"4","msrp":"750.0000","tax_class_id":"2","meta_title":"Medium Double Floor Cupboard (Width 1040mm) - British Standard","meta_keyword":null,"meta_description":"British Standard Medium Double Floor Cupboard (Width 1040mm) specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"6","dimensions":{"width":null,"height":null,"depth":null},"svg":{"plan":"svg/alt_F350SL-plan.svg","front":"svg/alt_F350SL-frontele.svg"},"media":[]},{"sku":"BS-W/350SC/R","set":"9","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"Single Corner Cupboard, Blank on Right","description":"Product Specification<br/>\r\nDoor width - 350mm<br/>\r\nWidth - 440mm + 250mm blank space<br/>\r\nDepth - 300mm + 20mm blank space<br/>\r\nHeight - 750mm<br/>\r\nWeight approx - 22kg<br/>\r\nProduct Number - BS-W/350SC/R","short_description":"Single corner cupboard with base shelf and two adjustable shelves.","weight":"22.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"single-corner-cupboard-blank-on-right","visibility":"4","url_path":"single-corner-cupboard-blank-on-right-69.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:07:14-07:00","updated_at":"2014-10-07 05:40:48","kitchen_planner":"0","dimensions_depth":null,"dimensions_height":null,"dimensions_width":null,"price":"450.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"minimal_price":null,"msrp_enabled":"2","msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Single Corner Wall Cupboard, Blank on Right - British Standard","meta_keyword":null,"meta_description":"British Standard Single Corner Wall Cupboard, Blank on Right specification. Our Wooden Wall Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"65","dimensions":{"width":null,"height":null,"depth":null},"svg":{"plan":"svg/alt_F350SL-plan.svg","front":"svg/alt_F350SL-frontele.svg"},"media":[]}]};
  	res.send(data);
  });
  myServerRouter.get('/local/categories', function(req, res){
  	var data = {"categories":[{"parent_id":"1","name":"Default Category","is_active":true,"position":"1","level":"1","id":"2","categories":[]},{"parent_id":"1","name":"Floor Cupboards","is_active":true,"position":"2","level":"1","id":"3","categories":[]},{"parent_id":"1","name":"Tall Cupboards","is_active":true,"position":"3","level":"1","id":"4","categories":[]},{"parent_id":"1","name":"Other Cupboards","is_active":true,"position":"4","level":"1","id":"5","categories":[]},{"parent_id":"1","name":"Accessories","is_active":true,"position":"5","level":"1","id":"6","categories":[]},{"parent_id":"1","name":"Test Cat","is_active":true,"position":"6","level":"1","id":"7","categories":[]},{"parent_id":"0","name":"Root Catalog","is_active":false,"position":"0","level":"0","id":"1","categories":["2","3","4","5","6","7"]}]};
  	res.send(data);
  });

  app.use('/api', myServerRouter);
};
