module.exports = function(app) {
    var express = require('express'), _ = require('underscore'), message = require('events'), myServerRouter = express.Router();
    var MagentoAPI = require('magento');
    // var magento = new MagentoAPI({
    //     host : 'britishstandard.strategiqmarketing.co.uk',
    //     port : 80,
    //     path : '/api/xmlrpc/',
    //     login : 'ember',
    //     pass : '3mb3r123'
    // });
    myServerRouter.get('/categories', function(req, res) {

        magento.login(function(err, sessId) {
            if (err) {
                // deal with error
                res.send(arguments);
                return;
            }
            magento.catalogCategory.tree(function(err, categories) {
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
                function moveThroughCategories(categories, secondArray) {
                    var secondArray = new Array();
                    var children;
                    categories.forEach(function(category) {
                        category.id = category.category_id;
                        delete category.category_id;
                        category.is_active = category.is_active ? true : false;
                        if (category.children.length) {
                            secondArray = moveThroughCategories(category.children, secondArray);
                        }
                        category.categories = _.map(category.children, function(category) {
                            return category.id;
                        });
                        delete category.children;
                        secondArray.push(category);
                    });

                    return (secondArray);
                }

                if ( typeof categories.category_id !== "undefined") {

                    categories = [categories];
                }
                categories = moveThroughCategories(categories, new Array());
                res.send({
                    "categories" : categories
                });
            });
            // use magento

        });

    });
    myServerRouter.get('/products', function(req, res) {
        var topProds = new Array();
        var i = 0;
        var emmitted = 0;
        app.on("product_info_loaded", function() {
            console.log('emit');
            if (!emmitted) {
                emmitted = 1;
                res.send({
                    "products" : topProds
                });
            }
        });
        app.on("products_loaded", function(topProds) {
          console.log('emit');
          if (!emmitted) {
            emmitted = 1;
            res.send({
              "products" : topProds
            });
          }
        });
        console.log("getting login");
        magento.login(function(err, sessId) {
            if (err) {
                // deal with error
                console.log("error");
                console.log(arguments);
                res.send({"error":err});
                return false;
            }

            console.log("gextting product");
            magento.catalogProduct.list(function(err, products) {
              console.log("FOUND");
                if (err) {
                    // deal with error
                    console.log("error");
                    console.log(arguments);
                    res.send({"error":err});
                    return false;
                }

                if ( typeof product == undefined) {
                    return true;
                }
                if ( typeof products == 'undefined') {
                  console.log("Products undefined");
                    return false;
                }
                if ( typeof products.product_id !== "undefined") {
                    arr = new Array();
                    arr.push(products);
                    products = arr;
                }
                //res.send(products);
              //  return false;
                var productsLength = products.length;
                var prodLoop = 0;
                //get the amount of products in set 9. This is stupid and should be done server side.

                products.forEach(function(product){

                    if ( typeof product !== "undefined" && typeof product.product_id !== "undefined") {
                        magento.catalogProduct.info({
                            id : product.product_id
                        }, function(err, response) {
                            if (err) {
                              console.log("Can't connect");
                                //console.log(err);
                            }
                            console.log("Response:"+response.sku);
                            product = response;
                            if(product.kitchen_planner === "1"){


                              product.id = product.product_id;
                              product.categories = product.category_ids;

                              product.left_right = product.kitchen_planner_lr === "1"?true:false,
                              product.front = product.kitchen_planner_front === "1"?true:false,
                              product.side = product.kitchen_planner_side === "1"?true:false,
                              product.center = product.kitchen_planner_center === "1"?true:false,
                              delete product.kitchen_planner_lr;
                              delete product.category_ids;
                              delete product.product_id;
                              product.dimensions = {
                                  width : product.dimensions_width || 42,
                                  height : product.dimensions_height || 35,
                                  depth : product.dimensions_depth,
                              };
                              var svgSku = product.sku.replace(/BS-/g, '');
                              svgSku = svgSku.replace(/\//g, '-');
                                product.svg = {
                                  plan : {
                                    center: "svg/"+svgSku+"/"+svgSku+"-plan.svg",
                                    left: "svg/"+svgSku+"/"+svgSku+"-planL.svg",
                                    right: "svg/"+svgSku+"/"+svgSku+"-planR.svg"
                                  },
                                  front : {
                                    center: "svg/"+svgSku+"/"+svgSku+"-frontele.svg",
                                    left: "svg/"+svgSku+"/"+svgSku+"-fronteleL.svg",
                                    right: "svg/"+svgSku+"/"+svgSku+"-fronteleR.svg"
                                  },
                                  side: {
                                    center: "svg/"+svgSku+"/"+svgSku+"-side.ele.svg",
                                    left: "svg/"+svgSku+"/"+svgSku+"-side.eleL.svg",
                                    right: "svg/"+svgSku+"/"+svgSku+"-side.eleR.svg"
                                  }
                                };


                              console.log(product.svg);
                              // magento.catalogProductAttributeMedia.list({
                                  // product : product.id
                              // }, function(err, response) {
                                  // product.media = response;
                                  // products[i] = product;
                                  // console.log(i);
                                  // topProds.push(product);
                                  // i++;
                                  // if (i === productsLength) {
                                      //
  //
                                  // }
                              // });
                              console.log("Loop: "+prodLoop+"  -  Length: "+productsLength);
                              topProds.push(product);
                            }
                            prodLoop++;
                            if(prodLoop === productsLength){
                              console.log("products Loaded");
                              app.emit("products_loaded", topProds);
                            }

                        });
                    } else {
                        product.svg = {
                            plan : "svg/alt_F350SL-plan.svg",
                            front : "svg/alt_F350SL-frontele.svg"
                        };
                        products[i] = product;
                        console.log(i);
                        i++;
                        if (i === productsLength) {
                            topProds = products;
                            app.emit("product_info_loaded", topProds);

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

            magento.catalogProduct.info({
                id : req.params.prodid
            }, function(err, response) {
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

            magento.catalogProductCustomOption.list({
                productId : req.params.prodid
            }, function(err, response) {
                res.send(response);
            });
        });
    });

    //Get SVG
    myServerRouter.get('/svgs/:id', function(req, res) {
        magento.login(function(err, sessId) {
            if (err) {
                // deal with error
                res.send(arguments);
                return;
            }
            magento.resource(sessId, function(resource) {
                console.log("resource");
                console.log(resource);
            });
            magento.svgs.list({
                id : req.params.id
            }, function(err, response) {
                //	  	console.log({'req': req, 'arguments':arguments});

                res.send(arguments);
            });
        });
    });
    //setup local server for offline testing
    myServerRouter.get('/svgs', function(req, res) {
        var data = {
            "svgs" : [{
                id : 1,
                editor : 1,
                svgBase64 : 'PD94bWwtc3R5bGVzaGVldCB0eXBlPSJ0ZXh0L2NzcyIgaHJlZj0iaHR0cDovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9UmFsZXdheTo0MDAsNjAwIiA/PiAgICANCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBuYW1lPSJzdmdyb290IiB4bGlua25zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHg9IjEwODAiIHk9IjcwMCIgb3ZlcmZsb3c9InZpc2libGUiPg0KCTxkZWZzPg0KCQk8ZmlsdGVyIG5hbWU9ImNhbnZhc2hhZG93IiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPg0KCQkJPGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VBbHBoYSIgc3RkRGV2aWF0aW9uPSI0IiByZXN1bHQ9ImJsdXIiPjwvZmVHYXVzc2lhbkJsdXI+DQoJCQk8ZmVPZmZzZXQgaW49ImJsdXIiIGR4PSI1IiBkeT0iNSIgcmVzdWx0PSJvZmZzZXRCbHVyIj48L2ZlT2Zmc2V0Pg0KCQkJPGZlTWVyZ2U+DQoJCQkJPGZlTWVyZ2VOb2RlIGluPSJvZmZzZXRCbHVyIj48L2ZlTWVyZ2VOb2RlPg0KCQkJCTxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyI+PC9mZU1lcmdlTm9kZT4NCgkJCTwvZmVNZXJnZT4NCgkJPC9maWx0ZXI+DQoJPC9kZWZzPg0KCTwhLS08c3ZnIG5hbWU9ImNhbnZhc0JhY2tncm91bmQiIHdpZHRoPSI4NjAiIGhlaWdodD0iNTQwIiB4PSIyMDAiIHk9IjMwIiBvdmVyZmxvdz0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOm5vbmUiPg0KCQk8ZGVmcyBuYW1lPSJwbGFjZWhvbGRlcl9kZWZzIj4NCgkJCTxwYXR0ZXJuIG5hbWU9ImNoZWNrZXJQYXR0ZXJuIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iNiIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgNSA1Ij4NCgkJCQk8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+DQoJCQkJPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjUiIGhlaWdodD0iNSIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIj48L3JlY3Q+DQoJCQk8L3BhdHRlcm4+DQoJCTwvZGVmcz4NCjwvc3ZnPi0tPg0KCTxzdmcgd2lkdGg9Ijg2MCIgaGVpZ2h0PSI1NDAiIG5hbWU9InN2Z2NvbnRlbnQiIG92ZXJmbG93PSJoaWRkZW4iIHg9IjIwMCIgeT0iMjUiIHZpZXdCb3g9IjAgMCA4MDAgNTQwIj4NCgkJPCEtLSBDcmVhdGVkIHdpdGggU1ZHLWVkaXQgLSBodHRwOi8vc3ZnLWVkaXQuZ29vZ2xlY29kZS5jb20vIC0tPg0KCQk8ZGVmcz48L2RlZnM+DQoJCTxnIHN0eWxlPSJwb2ludGVyLWV2ZW50czpub25lIj4NCgkJCTx0aXRsZSBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+YmFja2dyb3VuZDwvdGl0bGU+DQoJCQk8cmVjdCB4PSItMSIgeT0iLTEiIHdpZHRoPSIxMDgyIiBoZWlnaHQ9IjcwMiIgbmFtZT0iY2FudmFzX2JhY2tncm91bmQiIGZpbGw9Im5vbmUiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0Ij48L3JlY3Q+DQoJCTwvZz4NCgkJPGcgc3R5bGU9InBvaW50ZXItZXZlbnRzOmFsbDsgY3Vyc29yOnBvaW50ZXIiIG5hbWU9ImFyZWEiID4NCgkJCTx0aXRsZSBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+TGF5ZXIgMTwvdGl0bGU+DQoJCQk8ZyBuYW1lPSJsZWZ0TGluZSI+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1LDMwMCkiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0OyBmb250LWZhbWlseTogJ0dlb3JnaWEnLCBzYW5zLXNlcmlmOyI+NC4ybTwvdGV4dD4NCgkJCQk8bGluZSBuYW1lPSJzdmdfMSIgeTI9IjUxNi4xNTEyMzYiIHgyPSIzOCIgeTE9IjQwIiB4MT0iMzgiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+PC9saW5lPg0KCQkJPC9nPg0KCQkJPGcgbmFtZT0idG9wTGluZSI+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzc1LDI1KSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQ7IGZvbnQtZmFtaWx5OiAnR2VvcmdpYScsIHNhbnMtc2VyaWY7Ij40LjJtPC90ZXh0Pg0KCQkJCTxsaW5lIG5hbWU9InN2Z18yIiB5Mj0iMzkiIHgyPSIzNS42ODYxNSIgeTE9IjM5IiB4MT0iNzQwIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQiPjwvbGluZT4NCgkJCTwvZz4NCgkJCQ0KCQkJPGcgbmFtZT0iYm90dG9tUmlnaHRMaW5lIj4NCgkJCQk8dGV4dCBuYW1lPSJsYWJlbF82IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NjAsNDAwKSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQ7IGZvbnQtZmFtaWx5OiAnR2VvcmdpYScsIHNhbnMtc2VyaWY7Ij4yLjFtPC90ZXh0Pg0KCQkJCTxsaW5lIG5hbWU9InN2Z182IiB5Mj0iNTEyIiB4Mj0iNDQ3IiB5MT0iMjkxIiB4MT0iNDQ1IiBzdHJva2UtbGluZWNhcD0ibnVsbCIgc3Ryb2tlLWxpbmVqb2luPSJudWxsIiBzdHJva2UtZGFzaGFycmF5PSJudWxsIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQiPjwvbGluZT4NCgkJCTwvZz4NCgkJCTxnIG5hbWU9ImJvdHRvbUxpbmUiPg0KCQkJCTx0ZXh0IG5hbWU9ImxhYmVsXzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxMCw1MzQpIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdDsgZm9udC1mYW1pbHk6ICdHZW9yZ2lhJywgc2Fucy1zZXJpZjsiPjIuOG08L3RleHQ+DQoJCQkJPGxpbmUgbmFtZT0ic3ZnXzMiIHkyPSI1MTQiIHgyPSIzNS45MjI3MTMiIHkxPSI1MTQiIHgxPSI0NTAiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+PC9saW5lPg0KCQkJPC9nPg0KCQkJPGc+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLDE1MCkiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0OyBmb250LWZhbWlseTogJ0dlb3JnaWEnLCBzYW5zLXNlcmlmOyI+Mi4xbTwvdGV4dD4NCgkJCQk8bGluZSBuYW1lPSJzdmdfNyIgeTI9IjI5MS41MDc0MjYiIHgyPSI3MzgiIHkxPSIzOSIgeDE9IjczOCIgc3Ryb2tlLWxpbmVjYXA9Im51bGwiIHN0cm9rZS1saW5lam9pbj0ibnVsbCIgc3Ryb2tlLWRhc2hhcnJheT0ibnVsbCIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2U9IiMwMDAwMDAiIGZpbGw9Im5vbmUiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0Ij48L2xpbmU+DQoJCQk8L2c+DQoJCQk8ZyBuYW1lPSJib3R0b21WZXJSaWdodCI+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTU5LDMyMCkiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0OyBmb250LWZhbWlseTogJ0dlb3JnaWEnLCBzYW5zLXNlcmlmOyI+MS40bTwvdGV4dD4NCgkJCQk8bGluZSBuYW1lPSJzdmdfOCIgeTI9IjI5NCIgeDI9Ijc0MS4wNDIwODUiIHkxPSIyOTQiIHgxPSI0NDQiIHN0cm9rZS1saW5lY2FwPSJudWxsIiBzdHJva2UtbGluZWpvaW49Im51bGwiIHN0cm9rZS1kYXNoYXJyYXk9Im51bGwiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+PC9saW5lPg0KCQkJPC9nPg0KCQkJDQogIDxpbWFnZSB4bGluazpocmVmPSJodHRwOi8vd3d3LmJzYy5jb20vY3V0dXAvaW1nL2NvbXBhc3MucG5nIiBpZD0ic3ZnXzIiIGhlaWdodD0iMTg0IiB3aWR0aD0iMTg3IiB5PSIxMjAiIHg9IjE4OCIvPg0KCQk8L2c+DQoJCQ0KCTwvc3ZnPg0KCTxnIG5hbWU9InNlbGVjdG9yUGFyZW50R3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwMCwzMCkiPg0KCQk8ZyBkaXNwbGF5PSJub25lIj4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9udyIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9uZSIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9zZSIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9zdyIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfbnciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM0RjgwRkYiIHN0cm9rZT0icmdiYSgwLDAsMCwwKSIgc3R5bGU9ImN1cnNvcjpudy1yZXNpemUiIHBvaW50ZXItZXZlbnRzPSJhbGwiPjwvcmVjdD4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfbiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzRGODBGRiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDApIiBzdHlsZT0iY3Vyc29yOm4tcmVzaXplIiBwb2ludGVyLWV2ZW50cz0iYWxsIj48L3JlY3Q+DQoJCQk8cmVjdCBuYW1lPSJzZWxlY3RvckdyaXBfcmVzaXplX25lIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjNEY4MEZGIiBzdHJva2U9InJnYmEoMCwwLDAsMCkiIHN0eWxlPSJjdXJzb3I6bmUtcmVzaXplIiBwb2ludGVyLWV2ZW50cz0iYWxsIj48L3JlY3Q+DQoJCQk8cmVjdCBuYW1lPSJzZWxlY3RvckdyaXBfcmVzaXplX2UiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM0RjgwRkYiIHN0cm9rZT0icmdiYSgwLDAsMCwwKSIgc3R5bGU9ImN1cnNvcjplLXJlc2l6ZSIgcG9pbnRlci1ldmVudHM9ImFsbCI+PC9yZWN0Pg0KCQkJPHJlY3QgbmFtZT0ic2VsZWN0b3JHcmlwX3Jlc2l6ZV9zZSIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzRGODBGRiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDApIiBzdHlsZT0iY3Vyc29yOnNlLXJlc2l6ZSIgcG9pbnRlci1ldmVudHM9ImFsbCI+PC9yZWN0Pg0KCQkJPHJlY3QgbmFtZT0ic2VsZWN0b3JHcmlwX3Jlc2l6ZV9zIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjNEY4MEZGIiBzdHJva2U9InJnYmEoMCwwLDAsMCkiIHN0eWxlPSJjdXJzb3I6cy1yZXNpemUiIHBvaW50ZXItZXZlbnRzPSJhbGwiPjwvcmVjdD4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfc3ciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM0RjgwRkYiIHN0cm9rZT0icmdiYSgwLDAsMCwwKSIgc3R5bGU9ImN1cnNvcjpzdy1yZXNpemUiIHBvaW50ZXItZXZlbnRzPSJhbGwiPjwvcmVjdD4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfdyIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzRGODBGRiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDApIiBzdHlsZT0iY3Vyc29yOnctcmVzaXplIiBwb2ludGVyLWV2ZW50cz0iYWxsIj48L3JlY3Q+DQoJCTwvZz4NCgkJPHJlY3QgbmFtZT0ic2VsZWN0b3JSdWJiZXJCYW5kIiBmaWxsPSJub25lIiBzdHJva2U9IiM2NjYiIHN0cm9rZS1kYXNoYXJyYXk9IjMsMiIgZGlzcGxheT0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOm5vbmUiPjwvcmVjdD4NCgk8L2c+DQo8L3N2Zz4='
            }]
        };
        res.send(data);
    });
    //Errors
    myServerRouter.get("/local/errors/:id", function(req, res) {
        var data = {
            "errors" : [{
                "id"            : "missingData",
                "name"          : "Missing data",
                "title"         : "Some data was missing to complete the request.",
                "message"       : "Please ensure the following data is filled in: ",
                "http_status"   : 404
            }]
        };
        res.send(data);
    });
    //setup local server for offline testing
    myServerRouter.get('/local/svgs', function(req, res) {
        var data = {
            "svgs" : [{
                id : 1,
                editor : 1,
                svgBase64 : 'PD94bWwtc3R5bGVzaGVldCB0eXBlPSJ0ZXh0L2NzcyIgaHJlZj0iaHR0cDovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9UmFsZXdheTo0MDAsNjAwIiA/PiAgICANCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBuYW1lPSJzdmdyb290IiB4bGlua25zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHg9IjEwODAiIHk9IjcwMCIgb3ZlcmZsb3c9InZpc2libGUiPg0KCTxkZWZzPg0KCQk8ZmlsdGVyIG5hbWU9ImNhbnZhc2hhZG93IiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPg0KCQkJPGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VBbHBoYSIgc3RkRGV2aWF0aW9uPSI0IiByZXN1bHQ9ImJsdXIiPjwvZmVHYXVzc2lhbkJsdXI+DQoJCQk8ZmVPZmZzZXQgaW49ImJsdXIiIGR4PSI1IiBkeT0iNSIgcmVzdWx0PSJvZmZzZXRCbHVyIj48L2ZlT2Zmc2V0Pg0KCQkJPGZlTWVyZ2U+DQoJCQkJPGZlTWVyZ2VOb2RlIGluPSJvZmZzZXRCbHVyIj48L2ZlTWVyZ2VOb2RlPg0KCQkJCTxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyI+PC9mZU1lcmdlTm9kZT4NCgkJCTwvZmVNZXJnZT4NCgkJPC9maWx0ZXI+DQoJPC9kZWZzPg0KCTwhLS08c3ZnIG5hbWU9ImNhbnZhc0JhY2tncm91bmQiIHdpZHRoPSI4NjAiIGhlaWdodD0iNTQwIiB4PSIyMDAiIHk9IjMwIiBvdmVyZmxvdz0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOm5vbmUiPg0KCQk8ZGVmcyBuYW1lPSJwbGFjZWhvbGRlcl9kZWZzIj4NCgkJCTxwYXR0ZXJuIG5hbWU9ImNoZWNrZXJQYXR0ZXJuIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iNiIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgNSA1Ij4NCgkJCQk8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+DQoJCQkJPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjUiIGhlaWdodD0iNSIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIj48L3JlY3Q+DQoJCQk8L3BhdHRlcm4+DQoJCTwvZGVmcz4NCjwvc3ZnPi0tPg0KCTxzdmcgd2lkdGg9Ijg2MCIgaGVpZ2h0PSI1NDAiIG5hbWU9InN2Z2NvbnRlbnQiIG92ZXJmbG93PSJoaWRkZW4iIHg9IjIwMCIgeT0iMjUiIHZpZXdCb3g9IjAgMCA4MDAgNTQwIj4NCgkJPCEtLSBDcmVhdGVkIHdpdGggU1ZHLWVkaXQgLSBodHRwOi8vc3ZnLWVkaXQuZ29vZ2xlY29kZS5jb20vIC0tPg0KCQk8ZGVmcz48L2RlZnM+DQoJCTxnIHN0eWxlPSJwb2ludGVyLWV2ZW50czpub25lIj4NCgkJCTx0aXRsZSBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+YmFja2dyb3VuZDwvdGl0bGU+DQoJCQk8cmVjdCB4PSItMSIgeT0iLTEiIHdpZHRoPSIxMDgyIiBoZWlnaHQ9IjcwMiIgbmFtZT0iY2FudmFzX2JhY2tncm91bmQiIGZpbGw9Im5vbmUiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0Ij48L3JlY3Q+DQoJCTwvZz4NCgkJPGcgc3R5bGU9InBvaW50ZXItZXZlbnRzOmFsbDsgY3Vyc29yOnBvaW50ZXIiIG5hbWU9ImFyZWEiID4NCgkJCTx0aXRsZSBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+TGF5ZXIgMTwvdGl0bGU+DQoJCQk8ZyBuYW1lPSJsZWZ0TGluZSI+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1LDMwMCkiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0OyBmb250LWZhbWlseTogJ0dlb3JnaWEnLCBzYW5zLXNlcmlmOyI+NC4ybTwvdGV4dD4NCgkJCQk8bGluZSBuYW1lPSJzdmdfMSIgeTI9IjUxNi4xNTEyMzYiIHgyPSIzOCIgeTE9IjQwIiB4MT0iMzgiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+PC9saW5lPg0KCQkJPC9nPg0KCQkJPGcgbmFtZT0idG9wTGluZSI+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzc1LDI1KSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQ7IGZvbnQtZmFtaWx5OiAnR2VvcmdpYScsIHNhbnMtc2VyaWY7Ij40LjJtPC90ZXh0Pg0KCQkJCTxsaW5lIG5hbWU9InN2Z18yIiB5Mj0iMzkiIHgyPSIzNS42ODYxNSIgeTE9IjM5IiB4MT0iNzQwIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQiPjwvbGluZT4NCgkJCTwvZz4NCgkJCQ0KCQkJPGcgbmFtZT0iYm90dG9tUmlnaHRMaW5lIj4NCgkJCQk8dGV4dCBuYW1lPSJsYWJlbF82IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NjAsNDAwKSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQ7IGZvbnQtZmFtaWx5OiAnR2VvcmdpYScsIHNhbnMtc2VyaWY7Ij4yLjFtPC90ZXh0Pg0KCQkJCTxsaW5lIG5hbWU9InN2Z182IiB5Mj0iNTEyIiB4Mj0iNDQ3IiB5MT0iMjkxIiB4MT0iNDQ1IiBzdHJva2UtbGluZWNhcD0ibnVsbCIgc3Ryb2tlLWxpbmVqb2luPSJudWxsIiBzdHJva2UtZGFzaGFycmF5PSJudWxsIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOmluaGVyaXQiPjwvbGluZT4NCgkJCTwvZz4NCgkJCTxnIG5hbWU9ImJvdHRvbUxpbmUiPg0KCQkJCTx0ZXh0IG5hbWU9ImxhYmVsXzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxMCw1MzQpIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdDsgZm9udC1mYW1pbHk6ICdHZW9yZ2lhJywgc2Fucy1zZXJpZjsiPjIuOG08L3RleHQ+DQoJCQkJPGxpbmUgbmFtZT0ic3ZnXzMiIHkyPSI1MTQiIHgyPSIzNS45MjI3MTMiIHkxPSI1MTQiIHgxPSI0NTAiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+PC9saW5lPg0KCQkJPC9nPg0KCQkJPGc+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLDE1MCkiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0OyBmb250LWZhbWlseTogJ0dlb3JnaWEnLCBzYW5zLXNlcmlmOyI+Mi4xbTwvdGV4dD4NCgkJCQk8bGluZSBuYW1lPSJzdmdfNyIgeTI9IjI5MS41MDc0MjYiIHgyPSI3MzgiIHkxPSIzOSIgeDE9IjczOCIgc3Ryb2tlLWxpbmVjYXA9Im51bGwiIHN0cm9rZS1saW5lam9pbj0ibnVsbCIgc3Ryb2tlLWRhc2hhcnJheT0ibnVsbCIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2U9IiMwMDAwMDAiIGZpbGw9Im5vbmUiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0Ij48L2xpbmU+DQoJCQk8L2c+DQoJCQk8ZyBuYW1lPSJib3R0b21WZXJSaWdodCI+DQoJCQkJPHRleHQgbmFtZT0ibGFiZWxfOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTU5LDMyMCkiIHN0eWxlPSJwb2ludGVyLWV2ZW50czppbmhlcml0OyBmb250LWZhbWlseTogJ0dlb3JnaWEnLCBzYW5zLXNlcmlmOyI+MS40bTwvdGV4dD4NCgkJCQk8bGluZSBuYW1lPSJzdmdfOCIgeTI9IjI5NCIgeDI9Ijc0MS4wNDIwODUiIHkxPSIyOTQiIHgxPSI0NDQiIHN0cm9rZS1saW5lY2FwPSJudWxsIiBzdHJva2UtbGluZWpvaW49Im51bGwiIHN0cm9rZS1kYXNoYXJyYXk9Im51bGwiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSJub25lIiBzdHlsZT0icG9pbnRlci1ldmVudHM6aW5oZXJpdCI+PC9saW5lPg0KCQkJPC9nPg0KCQkJDQogIDxpbWFnZSB4bGluazpocmVmPSJodHRwOi8vd3d3LmJzYy5jb20vY3V0dXAvaW1nL2NvbXBhc3MucG5nIiBpZD0ic3ZnXzIiIGhlaWdodD0iMTg0IiB3aWR0aD0iMTg3IiB5PSIxMjAiIHg9IjE4OCIvPg0KCQk8L2c+DQoJCQ0KCTwvc3ZnPg0KCTxnIG5hbWU9InNlbGVjdG9yUGFyZW50R3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwMCwzMCkiPg0KCQk8ZyBkaXNwbGF5PSJub25lIj4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9udyIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9uZSIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9zZSIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxjaXJjbGUgbmFtZT0ic2VsZWN0b3JHcmlwX3JvdGF0ZV9zdyIgZmlsbD0iIzAwMCIgcj0iOCIgc3Ryb2tlPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0eWxlPSJjdXJzb3I6dXJsKGVkaXRvci9pbWFnZXMvcm90YXRlLnBuZykgMTIgMTIsIGF1dG87Ij48L2NpcmNsZT4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfbnciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM0RjgwRkYiIHN0cm9rZT0icmdiYSgwLDAsMCwwKSIgc3R5bGU9ImN1cnNvcjpudy1yZXNpemUiIHBvaW50ZXItZXZlbnRzPSJhbGwiPjwvcmVjdD4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfbiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzRGODBGRiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDApIiBzdHlsZT0iY3Vyc29yOm4tcmVzaXplIiBwb2ludGVyLWV2ZW50cz0iYWxsIj48L3JlY3Q+DQoJCQk8cmVjdCBuYW1lPSJzZWxlY3RvckdyaXBfcmVzaXplX25lIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjNEY4MEZGIiBzdHJva2U9InJnYmEoMCwwLDAsMCkiIHN0eWxlPSJjdXJzb3I6bmUtcmVzaXplIiBwb2ludGVyLWV2ZW50cz0iYWxsIj48L3JlY3Q+DQoJCQk8cmVjdCBuYW1lPSJzZWxlY3RvckdyaXBfcmVzaXplX2UiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM0RjgwRkYiIHN0cm9rZT0icmdiYSgwLDAsMCwwKSIgc3R5bGU9ImN1cnNvcjplLXJlc2l6ZSIgcG9pbnRlci1ldmVudHM9ImFsbCI+PC9yZWN0Pg0KCQkJPHJlY3QgbmFtZT0ic2VsZWN0b3JHcmlwX3Jlc2l6ZV9zZSIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzRGODBGRiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDApIiBzdHlsZT0iY3Vyc29yOnNlLXJlc2l6ZSIgcG9pbnRlci1ldmVudHM9ImFsbCI+PC9yZWN0Pg0KCQkJPHJlY3QgbmFtZT0ic2VsZWN0b3JHcmlwX3Jlc2l6ZV9zIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjNEY4MEZGIiBzdHJva2U9InJnYmEoMCwwLDAsMCkiIHN0eWxlPSJjdXJzb3I6cy1yZXNpemUiIHBvaW50ZXItZXZlbnRzPSJhbGwiPjwvcmVjdD4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfc3ciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM0RjgwRkYiIHN0cm9rZT0icmdiYSgwLDAsMCwwKSIgc3R5bGU9ImN1cnNvcjpzdy1yZXNpemUiIHBvaW50ZXItZXZlbnRzPSJhbGwiPjwvcmVjdD4NCgkJCTxyZWN0IG5hbWU9InNlbGVjdG9yR3JpcF9yZXNpemVfdyIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzRGODBGRiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDApIiBzdHlsZT0iY3Vyc29yOnctcmVzaXplIiBwb2ludGVyLWV2ZW50cz0iYWxsIj48L3JlY3Q+DQoJCTwvZz4NCgkJPHJlY3QgbmFtZT0ic2VsZWN0b3JSdWJiZXJCYW5kIiBmaWxsPSJub25lIiBzdHJva2U9IiM2NjYiIHN0cm9rZS1kYXNoYXJyYXk9IjMsMiIgZGlzcGxheT0ibm9uZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOm5vbmUiPjwvcmVjdD4NCgk8L2c+DQo8L3N2Zz4='
            }]
        };
        res.send(data);
    });
    myServerRouter.get('/local/products', function(req, res) {
        var data = {"products":[{"sku":"BS-F/600S-L","set":"4","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"Large Single Cupboard","description":"Product Specification <br />\r\nDoor Width - 600mm <br />\r\nWidth - 690mm <br />\r\nDepth - 600mm <br />\r\nHeight - 900mm <br />\r\nWeight approx - 35kg<br />\r\nProduct Number - BS-F/600S<br /><br />\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on &lsquo;Fitting&rsquo; for full details).</i>","short_description":"Single cupboard with base shelf and one adjustable shelf.","weight":"35.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"large-single-cupboard","visibility":"4","url_path":"large-single-cupboard.html","country_of_manufacture":"GB","required_options":"0","has_options":"1","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:05:47-07:00","updated_at":"2014-12-05 07:55:29","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"690","dimensions_height":"900","dimensions_depth":"600","price":"500.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Large Single Floor Cupboard (Width 690mm) - British Standard","meta_keyword":null,"meta_description":"British Standard Large Single Floor Cupboard (Width 690mm) specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"4","left_right":true,"front":true,"side":false,"center":true,"dimensions":{"width":"690","height":"900","depth":"600"},"svg":{"plan":{"center":"svg/F-600S-L/F-600S-L-plan.svg","left":"svg/F-600S-L/F-600S-L-planL.svg","right":"svg/F-600S-L/F-600S-L-planR.svg"},"front":{"center":"svg/F-600S-L/F-600S-L-frontele.svg","left":"svg/F-600S-L/F-600S-L-fronteleL.svg","right":"svg/F-600S-L/F-600S-L-fronteleR.svg"},"side":{"center":"svg/F-600S-L/F-600S-L-side.ele.svg","left":"svg/F-600S-L/F-600S-L-side.eleL.svg","right":"svg/F-600S-L/F-600S-L-side.eleR.svg"}}},{"sku":"BS-F/350SL","set":"4","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"Small Single Cupboard","description":"Product Specification <br />\r\nDoor width - 350mm <br />\r\nWidth - 440mm <br />\r\nDepth - 600mm <br />\r\nHeight - 900mm <br />\r\nWeight approx - 26kg<br />\r\nProduct Number - BS-F/350S<br /><br />\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on &lsquo;Fitting&rsquo; for full details).</i>","short_description":"Single cupboard with base shelf and one adjustable shelf.","weight":"26.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"small-single-cupboard","visibility":"4","url_path":"small-single-cupboard.html","country_of_manufacture":"GB","required_options":"0","has_options":"1","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:05:44-07:00","updated_at":"2014-12-05 07:10:53","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"440","dimensions_height":"900","dimensions_depth":"600","price":"400.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Small Single Floor Cupboard (Width 440mm) - British Standard","meta_keyword":null,"meta_description":"British Standard Small Single Floor Cupboard (Width 440mm) specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"2","left_right":true,"front":true,"side":false,"center":true,"dimensions":{"width":"440","height":"900","depth":"600"},"svg":{"plan":{"center":"svg/F-350SL/F-350SL-plan.svg","left":"svg/F-350SL/F-350SL-planL.svg","right":"svg/F-350SL/F-350SL-planR.svg"},"front":{"center":"svg/F-350SL/F-350SL-frontele.svg","left":"svg/F-350SL/F-350SL-fronteleL.svg","right":"svg/F-350SL/F-350SL-fronteleR.svg"},"side":{"center":"svg/F-350SL/F-350SL-side.ele.svg","left":"svg/F-350SL/F-350SL-side.eleL.svg","right":"svg/F-350SL/F-350SL-side.eleR.svg"}}},{"sku":"BS-F/475S/L","set":"4","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"Medium Single Cupboard","description":"Product Specification<br />\r\nDoor width - 475mm<br />\r\nWidth - 565mm <br />\r\nDepth - 600mm <br />\r\nHeight - 900mm <br />\r\nWeight approx - 32kg<br />\r\nProduct Number - BS-F/475S<br /><br />\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on &lsquo;Fitting&rsquo; for full details).</i>","short_description":"Single cupboard with base shelf and one adjustable shelf.","weight":"32.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"medium-single-cupboard","visibility":"4","url_path":"medium-single-cupboard.html","country_of_manufacture":"GB","required_options":"0","has_options":"1","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:05:45-07:00","updated_at":"2014-12-05 07:13:30","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"565","dimensions_height":"900","dimensions_depth":"600","price":"450.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Medium Single Floor Cupboard (Width 565mm) - British Standard","meta_keyword":null,"meta_description":"British Standard Medium Single Floor Cupboard (Width 565mm) specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"3","left_right":true,"front":true,"side":false,"center":true,"dimensions":{"width":"565","height":"900","depth":"600"},"svg":{"plan":{"center":"svg/F-475S-L/F-475S-L-plan.svg","left":"svg/F-475S-L/F-475S-L-planL.svg","right":"svg/F-475S-L/F-475S-L-planR.svg"},"front":{"center":"svg/F-475S-L/F-475S-L-frontele.svg","left":"svg/F-475S-L/F-475S-L-fronteleL.svg","right":"svg/F-475S-L/F-475S-L-fronteleR.svg"},"side":{"center":"svg/F-475S-L/F-475S-L-side.ele.svg","left":"svg/F-475S-L/F-475S-L-side.eleL.svg","right":"svg/F-475S-L/F-475S-L-side.eleR.svg"}}},{"sku":"BS-F/350DF","set":"4","type":"simple","categories":["6"],"websites":["1"],"type_id":"simple","name":"Small Double Facade for Freestanding Appliance","description":"Product Specification<br/>\r\nDoor width - 350mm<br/>\r\nWidth - 790mm<br/>\r\nDepth - 21mm<br/>\r\nHeight - 900mm<br/>\r\nWeight approx - 10kg<br/>\r\nProduct Number - BS-F/350DF<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on &lsquo;Fitting&rsquo; for full details).</i>\r\n","short_description":"Pair of doors and surrounding framework to fit between two cupboards to create space to hide freestanding appliance or other (skirting supplied loose).","weight":"10.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"double-facade-for-freestanding-appliance","visibility":"4","url_path":"double-facade-for-freestanding-appliance.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:05:54-07:00","updated_at":"2014-12-05 03:52:31","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"790","dimensions_height":"21","dimensions_depth":"900","price":"250.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Small Double Facade for Freestanding Appliance  - British Standard","meta_keyword":null,"meta_description":"British Standard Small Double Facade for Freestanding Appliance  specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"9","left_right":true,"front":true,"side":false,"center":true,"dimensions":{"width":"790","height":"21","depth":"900"},"svg":{"plan":{"center":"svg/F-350DF/F-350DF-plan.svg","left":"svg/F-350DF/F-350DF-planL.svg","right":"svg/F-350DF/F-350DF-planR.svg"},"front":{"center":"svg/F-350DF/F-350DF-frontele.svg","left":"svg/F-350DF/F-350DF-fronteleL.svg","right":"svg/F-350DF/F-350DF-fronteleR.svg"},"side":{"center":"svg/F-350DF/F-350DF-side.ele.svg","left":"svg/F-350DF/F-350DF-side.eleL.svg","right":"svg/F-350DF/F-350DF-side.eleR.svg"}}},{"sku":"BS-F/600OH+DWR","set":"4","type":"simple","categories":[],"websites":["1"],"type_id":"simple","name":"Oven Housing with Drawer","description":"Product Specification<br/>\r\nDrawer width - 600mm<br/>\r\nWidth - 690mm<br/>\r\nDepth - 600mm<br/>\r\nHeight - 900mm<br/>\r\nWeight approx - 30kg<br/>\r\nProduct Number - BS-F/600OHDWR<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on &lsquo;Fitting&rsquo; for full details).</i>","short_description":"Housing for single 600mm oven with drawer below.","weight":"30.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"oven-housing-with-drawer","visibility":"4","url_path":"oven-housing-with-drawer.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:05:56-07:00","updated_at":"2014-12-05 03:52:01","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"690","dimensions_height":"900","dimensions_depth":"699","price":"500.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Oven Housing with Drawer, Floor Cupboards - British Standard","meta_keyword":null,"meta_description":"British Standard Oven Housing with Drawer, Floor Cupboards specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"10","left_right":true,"front":true,"side":false,"center":true,"dimensions":{"width":"690","height":"900","depth":"699"},"svg":{"plan":{"center":"svg/F-600OH+DWR/F-600OH+DWR-plan.svg","left":"svg/F-600OH+DWR/F-600OH+DWR-planL.svg","right":"svg/F-600OH+DWR/F-600OH+DWR-planR.svg"},"front":{"center":"svg/F-600OH+DWR/F-600OH+DWR-frontele.svg","left":"svg/F-600OH+DWR/F-600OH+DWR-fronteleL.svg","right":"svg/F-600OH+DWR/F-600OH+DWR-fronteleR.svg"},"side":{"center":"svg/F-600OH+DWR/F-600OH+DWR-side.ele.svg","left":"svg/F-600OH+DWR/F-600OH+DWR-side.eleL.svg","right":"svg/F-600OH+DWR/F-600OH+DWR-side.eleR.svg"}}},{"sku":"BS-F/350/DDB","set":"4","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"Drop Down Bin","description":"Product Specification<br/>\r\nDoor width - 350mm<br/>\r\nWidth - 440mm<br/>\r\nDepth - 600mm<br/>\r\nHeight - 900mm<br/>\r\nWeight approx - 29kg<br/>\r\nProduct Number - BS-F/350DDB<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on &lsquo;Fitting&rsquo; for full details).</i>\r\n","short_description":"Single cupboard with drop down front, housing single stainless steel 54 litre bin.","weight":"29.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"drop-down-bin","visibility":"4","url_path":"drop-down-bin.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:05:53-07:00","updated_at":"2014-12-05 07:24:37","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"440","dimensions_height":"600","dimensions_depth":"900","price":"600.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Drop Down Bin (Width 440mm), Floor Cupboards - British Standard","meta_keyword":null,"meta_description":"British Standard Drop Down Bin (Width 440mm), Floor Cupboards specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"8","left_right":true,"front":true,"side":false,"center":true,"dimensions":{"width":"440","height":"600","depth":"900"},"svg":{"plan":{"center":"svg/F-350-DDB/F-350-DDB-plan.svg","left":"svg/F-350-DDB/F-350-DDB-planL.svg","right":"svg/F-350-DDB/F-350-DDB-planR.svg"},"front":{"center":"svg/F-350-DDB/F-350-DDB-frontele.svg","left":"svg/F-350-DDB/F-350-DDB-fronteleL.svg","right":"svg/F-350-DDB/F-350-DDB-fronteleR.svg"},"side":{"center":"svg/F-350-DDB/F-350-DDB-side.ele.svg","left":"svg/F-350-DDB/F-350-DDB-side.eleL.svg","right":"svg/F-350-DDB/F-350-DDB-side.eleR.svg"}}},{"sku":"BS-F/475DWR","set":"4","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"Medium Set of Drawers","description":"Product Specification<br/>\r\nDrawer Width - 475mm<br/>\r\nWidth - 565mm<br/>\r\nDepth - 600mm<br/>\r\nHeight - 900mm<br/>\r\nWeight approx - 50kg<br/>\r\nProduct Number - BS-F/475DWR<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at \u0003their base to enable them to be adjusted to fit any variations \u0003in floor height (see section on &lsquo;Fitting&rsquo; for full details).</i>","short_description":"Set of four drawers, three medium depth drawers with one deep drawer below, all on soft close metal runners.","weight":"50.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"set-of-drawers","visibility":"4","url_path":"set-of-drawers.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:05:51-07:00","updated_at":"2014-12-05 07:05:52","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"565","dimensions_height":"900","dimensions_depth":"600","price":"800.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Medium Set of Drawers, Floor Cupboards - British Standard","meta_keyword":null,"meta_description":"British Standard Medium Set of Drawers, Floor Cupboards specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_right","options_container":"container1","gift_message_available":"0","id":"7","left_right":true,"front":true,"side":false,"center":true,"dimensions":{"width":"565","height":"900","depth":"600"},"svg":{"plan":{"center":"svg/F-475DWR/F-475DWR-plan.svg","left":"svg/F-475DWR/F-475DWR-planL.svg","right":"svg/F-475DWR/F-475DWR-planR.svg"},"front":{"center":"svg/F-475DWR/F-475DWR-frontele.svg","left":"svg/F-475DWR/F-475DWR-fronteleL.svg","right":"svg/F-475DWR/F-475DWR-fronteleR.svg"},"side":{"center":"svg/F-475DWR/F-475DWR-side.ele.svg","left":"svg/F-475DWR/F-475DWR-side.eleL.svg","right":"svg/F-475DWR/F-475DWR-side.eleR.svg"}}},{"sku":"BS-F/250TS","set":"4","type":"simple","categories":[],"websites":["1"],"type_id":"simple","name":"Tray Space","description":"Product Specification<br/>\r\nInternal width - 250mm maximum<br/>\r\nExternal width - 340mm maximum<br/>\r\nDepth - 600mm<br/>\r\nHeight - 900mm<br/>\r\nWeight approx - 16kg<br/>\r\nProduct Number - BS-F/250TS<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on ‘Fitting’ for full details).<br/><br/>\r\n\r\nThe 250mm Tray Space comes as a ‘kit of parts’, at best it can be 340mm wide (a 250mm space with 45mm leg either side), it comes with an optional central division which you can use if it suits. If you have a space smaller than 340mm, the Tray Space can be cut down to the desired width and the loose leg and side fitted.</i>\r\n","short_description":"Tray space kit, 340mm maximum overall width, supplied with one side and internal division loose for cutting down to desired width on site.","weight":"16.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"tray-space","visibility":"4","url_path":"tray-space.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:06:02-07:00","updated_at":"2014-12-05 03:48:27","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"340","dimensions_height":"900","dimensions_depth":"600","price":"250.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Tray Space (Width 340mm max.), Floor Cupboards - British Standard","meta_keyword":null,"meta_description":"British Standard Tray Space (Width 340mm max.) specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"14","left_right":true,"front":true,"side":false,"center":true,"dimensions":{"width":"340","height":"900","depth":"600"},"svg":{"plan":{"center":"svg/F-250TS/F-250TS-plan.svg","left":"svg/F-250TS/F-250TS-planL.svg","right":"svg/F-250TS/F-250TS-planR.svg"},"front":{"center":"svg/F-250TS/F-250TS-frontele.svg","left":"svg/F-250TS/F-250TS-fronteleL.svg","right":"svg/F-250TS/F-250TS-fronteleR.svg"},"side":{"center":"svg/F-250TS/F-250TS-side.ele.svg","left":"svg/F-250TS/F-250TS-side.eleL.svg","right":"svg/F-250TS/F-250TS-side.eleR.svg"}}},{"sku":"BS-F/800PDWR","set":"4","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"Pan Drawers","description":"Product Specification<br/>\r\nDrawer Width - 800mm<br/>\r\nWidth - 890mm<br/>\r\nDepth - 600mm<br/>\r\nHeight - 900mm<br/>\r\nWeight approx - 66kg<br/>\r\nProduct Number -BS-F/800PDWR<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on &lsquo;Fitting&rsquo; for full details).</i>","short_description":"Set of three large graduated drawers, all on soft close metal runners.","weight":"66.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"pan-drawers","visibility":"4","url_path":"pan-drawers.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:06:00-07:00","updated_at":"2014-12-05 07:24:24","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"890","dimensions_height":"900","dimensions_depth":"600","price":"900.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Set of Pan Drawers (Width 890mm), Floor Cupboards - British Standard","meta_keyword":null,"meta_description":"British Standard Set of Pan Drawers (Width 890mm), Floor Cupboards specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"13","left_right":true,"front":true,"side":false,"center":true,"dimensions":{"width":"890","height":"900","depth":"600"},"svg":{"plan":{"center":"svg/F-800PDWR/F-800PDWR-plan.svg","left":"svg/F-800PDWR/F-800PDWR-planL.svg","right":"svg/F-800PDWR/F-800PDWR-planR.svg"},"front":{"center":"svg/F-800PDWR/F-800PDWR-frontele.svg","left":"svg/F-800PDWR/F-800PDWR-fronteleL.svg","right":"svg/F-800PDWR/F-800PDWR-fronteleR.svg"},"side":{"center":"svg/F-800PDWR/F-800PDWR-side.ele.svg","left":"svg/F-800PDWR/F-800PDWR-side.eleL.svg","right":"svg/F-800PDWR/F-800PDWR-side.eleR.svg"}}},{"sku":"BS-F/SL&S","set":"4","type":"simple","categories":[],"websites":["1"],"type_id":"simple","name":"Single Leg & Side","description":"Product Specification<br/>\r\nWidth - 45mm<br/>\r\nDepth - 21mm<br/>\r\nHeight - 870mm<br/>\r\nWeight approx - 1kg<br/>\r\nProduct Number - BS-F/SL&S<br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on ‘Fitting’ for full details).<br/><br/>","short_description":"Single Leg for use between Undersink Cupboard and Integrated Appliance Façade; or as a ‘make-up’ piece; or the Side used on its own in conjunction with a Façade for Freestanding Appliance if positioned at the end of a run (you will also need a Boarded or Plain End to finish off the end if its going to be seen).\r\n","weight":"1.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"single-leg-or-side","visibility":"4","url_path":"single-leg-or-side.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:06:03-07:00","updated_at":"2014-12-05 03:47:48","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"1","kitchen_planner":"1","dimensions_width":"45","dimensions_height":"870","dimensions_depth":"21","price":"50.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Single Leg & Side (Width 45mm), Floor Cupboards - British Standard","meta_keyword":null,"meta_description":"British Standard Single Leg & Side (Width 45mm), Floor Cupboards specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"15","left_right":true,"front":true,"side":true,"center":true,"dimensions":{"width":"45","height":"870","depth":"21"},"svg":{"plan":{"center":"svg/F-SL&S/F-SL&S-plan.svg","left":"svg/F-SL&S/F-SL&S-planL.svg","right":"svg/F-SL&S/F-SL&S-planR.svg"},"front":{"center":"svg/F-SL&S/F-SL&S-frontele.svg","left":"svg/F-SL&S/F-SL&S-fronteleL.svg","right":"svg/F-SL&S/F-SL&S-fronteleR.svg"},"side":{"center":"svg/F-SL&S/F-SL&S-side.ele.svg","left":"svg/F-SL&S/F-SL&S-side.eleL.svg","right":"svg/F-SL&S/F-SL&S-side.eleR.svg"}}},{"sku":"BS-F/BEP","set":"4","type":"simple","categories":[],"websites":["1"],"type_id":"simple","name":"Boarded End Panel","description":"Product Specification<br/>\r\nWidth - 660mm<br/>\r\nDepth - 15mm<br/>\r\nHeight - 870mm<br/>\r\nWeight approx - 7kg<br/>\r\nProduct Number - BS-F/BEP<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on ‘Fitting’ for full details).<br/><br/>","short_description":"Decorative panel to fit into recess on side of floor cupboard at end of run.","weight":"7.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"boarded-end-panel","visibility":"4","url_path":"boarded-end-panel.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:06:06-07:00","updated_at":"2014-12-05 03:45:49","kitchen_planner_center":"0","kitchen_planner_front":"0","kitchen_planner_side":"1","kitchen_planner":"1","dimensions_width":"660","dimensions_height":"870","dimensions_depth":"15","price":"50.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Boarded End Panel (Width 660mm), Floor Cupboards - British Standard","meta_keyword":null,"meta_description":"British Standard Boarded End Panel (Width 660mm), Floor Cupboards specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_right","options_container":"container1","gift_message_available":"0","id":"17","left_right":true,"front":false,"side":true,"center":false,"dimensions":{"width":"660","height":"870","depth":"15"},"svg":{"plan":{"center":"svg/F-BEP/F-BEP-plan.svg","left":"svg/F-BEP/F-BEP-planL.svg","right":"svg/F-BEP/F-BEP-planR.svg"},"front":{"center":"svg/F-BEP/F-BEP-frontele.svg","left":"svg/F-BEP/F-BEP-fronteleL.svg","right":"svg/F-BEP/F-BEP-fronteleR.svg"},"side":{"center":"svg/F-BEP/F-BEP-side.ele.svg","left":"svg/F-BEP/F-BEP-side.eleL.svg","right":"svg/F-BEP/F-BEP-side.eleR.svg"}}},{"sku":"BS-F/800x220US","set":"4","type":"simple","categories":[],"websites":["1"],"type_id":"simple","name":"Double Undersink","description":"Product Specification<br/>\r\nDoor Width - 355mm<br/>\r\nWidth - 800mm<br/>\r\nDepth - 600mm<br/>\r\nHeight - 680mm<br/>\r\nWeight approx - 36kg<br/>\r\nProduct Number - BS-F/800x220US<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on &lsquo;Fitting&rsquo; for full details).</i>","short_description":"Low double cupboard with base shelf, one adjustable shelf and cut out for plumbing at back, to take butlers type sink 800mm wide by 220mm high.","weight":"36.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"double-undersink","visibility":"4","url_path":"double-undersink.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:05:59-07:00","updated_at":"2014-12-05 03:51:03","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"800","dimensions_height":"680","dimensions_depth":"600","price":"590.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Double Undersink Floor Cupboard (Width 800mm) - British Standard","meta_keyword":null,"meta_description":"British Standard Double Undersink Floor Cupboard (Width 800mm) specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"12","left_right":false,"front":true,"side":false,"center":true,"dimensions":{"width":"800","height":"680","depth":"600"},"svg":{"plan":{"center":"svg/F-800x220US/F-800x220US-plan.svg","left":"svg/F-800x220US/F-800x220US-planL.svg","right":"svg/F-800x220US/F-800x220US-planR.svg"},"front":{"center":"svg/F-800x220US/F-800x220US-frontele.svg","left":"svg/F-800x220US/F-800x220US-fronteleL.svg","right":"svg/F-800x220US/F-800x220US-fronteleR.svg"},"side":{"center":"svg/F-800x220US/F-800x220US-side.ele.svg","left":"svg/F-800x220US/F-800x220US-side.eleL.svg","right":"svg/F-800x220US/F-800x220US-side.eleR.svg"}}},{"sku":"BS-W/350S","set":"4","type":"simple","categories":[],"websites":["1"],"type_id":"simple","name":"Small Single Cupboard","description":"Product Specification<br/>\r\nDoor width - 350mm<br/>\r\nWidth - 440mm<br/>\r\nDepth - 300mm + 20mm<br/>\r\nHeight - 750mm<br/>\r\nWeight approx - 20kg<br/>\r\nProduct Number - BS-W/350S<br/>","short_description":"Single cupboard with base shelf and two adjustable shelves.","weight":"20.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"small-single-cupboard","visibility":"4","url_path":"small-single-cupboard-26.html","country_of_manufacture":"GB","required_options":"0","has_options":"1","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:06:13-07:00","updated_at":"2014-12-10 10:41:12","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"440","dimensions_height":"750","dimensions_depth":"320","price":"300.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Small Single Wall Cupboard (Width 440mm) - British Standard","meta_keyword":null,"meta_description":"British Standard Small Single Wall Cupboard (Width 440mm) specification. Our Wooden Wall Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"22","left_right":false,"front":true,"side":false,"center":true,"dimensions":{"width":"440","height":"750","depth":"320"},"svg":{"plan":{"center":"svg/W-350S/W-350S-plan.svg","left":"svg/W-350S/W-350S-planL.svg","right":"svg/W-350S/W-350S-planR.svg"},"front":{"center":"svg/W-350S/W-350S-frontele.svg","left":"svg/W-350S/W-350S-fronteleL.svg","right":"svg/W-350S/W-350S-fronteleR.svg"},"side":{"center":"svg/W-350S/W-350S-side.ele.svg","left":"svg/W-350S/W-350S-side.eleL.svg","right":"svg/W-350S/W-350S-side.eleR.svg"}}},{"sku":"BS-W/350D","set":"4","type":"simple","categories":[],"websites":["1"],"type_id":"simple","name":"Small Double Cupboard","description":"Product Specification<br/>\r\nDoor width - 350mm<br/>\r\nWidth - 790mm<br/>\r\nDepth - 300mm + 20mm<br/>\r\nHeight - 750mm<br/>\r\nWeight approx - 30kg<br/>\r\nProduct Number - BS-W/350D","short_description":"Double cupboard with base shelf and two adjustable shelves.","weight":"30.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"small-double-cupboard","visibility":"4","url_path":"small-double-cupboard.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:06:16-07:00","updated_at":"2014-12-10 10:37:52","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"790","dimensions_height":"750","dimensions_depth":"320","price":"500.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Small Double Wall Cupboard (Width 790mm) - British Standard","meta_keyword":null,"meta_description":"British Standard Small Double Wall Cupboard (Width 790mm) specification. Our Wooden Wall Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"24","left_right":false,"front":true,"side":false,"center":true,"dimensions":{"width":"790","height":"750","depth":"320"},"svg":{"plan":{"center":"svg/W-350D/W-350D-plan.svg","left":"svg/W-350D/W-350D-planL.svg","right":"svg/W-350D/W-350D-planR.svg"},"front":{"center":"svg/W-350D/W-350D-frontele.svg","left":"svg/W-350D/W-350D-fronteleL.svg","right":"svg/W-350D/W-350D-fronteleR.svg"},"side":{"center":"svg/W-350D/W-350D-side.ele.svg","left":"svg/W-350D/W-350D-side.eleL.svg","right":"svg/W-350D/W-350D-side.eleR.svg"}}},{"sku":"BS-F/600IAF","set":"4","type":"simple","categories":[],"websites":["1"],"type_id":"simple","name":"600 Integrated Appliance Facade","description":"Product Specification <br />\r\nDoor Width - 600mm <br />\r\nWidth - 600mm <br />\r\nDepth - 21mm <br />\r\nHeight - 900mm <br />\r\nWeight approx - 8kg<br />\r\nProduct Number - BS-F/600IAF<br /><br />\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on &lsquo;Fitting&rsquo; for full details).</i>","short_description":"Door, rail and skirting to conceal 600mm integrated fridge, freezer or dishwasher.","weight":"8.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"600-integrated-appliance-facade","visibility":"4","url_path":"600-integrated-appliance-facade.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:07:02-07:00","updated_at":"2014-12-05 03:44:36","kitchen_planner_center":"1","kitchen_planner_front":"0","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"600","dimensions_height":"900","dimensions_depth":"21","price":"180.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"600 Integrated Appliance Facade (Width 600mm) - British Standard","meta_keyword":null,"meta_description":"British Standard 600 Integrated Appliance Facade (Width 600mm) specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"56","left_right":false,"front":false,"side":false,"center":true,"dimensions":{"width":"600","height":"900","depth":"21"},"svg":{"plan":{"center":"svg/F-600IAF/F-600IAF-plan.svg","left":"svg/F-600IAF/F-600IAF-planL.svg","right":"svg/F-600IAF/F-600IAF-planR.svg"},"front":{"center":"svg/F-600IAF/F-600IAF-frontele.svg","left":"svg/F-600IAF/F-600IAF-fronteleL.svg","right":"svg/F-600IAF/F-600IAF-fronteleR.svg"},"side":{"center":"svg/F-600IAF/F-600IAF-side.ele.svg","left":"svg/F-600IAF/F-600IAF-side.eleL.svg","right":"svg/F-600IAF/F-600IAF-side.eleR.svg"}}},{"sku":"BS-F/450IAH","set":"4","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"450 Integrated Appliance Housing","description":"Product Specification <br />\r\nDoor Width - 450mm <br />\r\nWidth - 540mm <br />\r\nDepth - 600mm <br />\r\nHeight - 900mm <br />\r\nWeight approx - 30kg<br />\r\nProduct Number - BS-F/450IAH<br /><br />\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on &lsquo;Fitting&rsquo; for full details).</i>","short_description":"Housing for 450mm integrated dishwasher. Door and skirting supplied loose.","weight":"30.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"450-integrated-appliance-housing","visibility":"4","url_path":"450-integrated-appliance-housing.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:07:03-07:00","updated_at":"2014-12-05 07:07:07","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"540","dimensions_height":"900","dimensions_depth":"600","price":"480.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"450 Integrated Appliance Housing (Width 540mm) - British Standard","meta_keyword":null,"meta_description":"British Standard 450 Integrated Appliance Housing (Width 540mm) specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"57","left_right":true,"front":true,"side":false,"center":true,"dimensions":{"width":"540","height":"900","depth":"600"},"svg":{"plan":{"center":"svg/F-450IAH/F-450IAH-plan.svg","left":"svg/F-450IAH/F-450IAH-planL.svg","right":"svg/F-450IAH/F-450IAH-planR.svg"},"front":{"center":"svg/F-450IAH/F-450IAH-frontele.svg","left":"svg/F-450IAH/F-450IAH-fronteleL.svg","right":"svg/F-450IAH/F-450IAH-fronteleR.svg"},"side":{"center":"svg/F-450IAH/F-450IAH-side.ele.svg","left":"svg/F-450IAH/F-450IAH-side.eleL.svg","right":"svg/F-450IAH/F-450IAH-side.eleR.svg"}}},{"sku":"BS-F/WPEP","set":"4","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"Wide Plain End Panel","description":"Product Specification<br/>\r\nWidth - 990mm<br/>\r\nDepth - 15mm<br/>\r\nHeight - 870mm<br/>\r\nWeight approx - 11kg<br/>\r\nProduct Number - BS-F/WPEP<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on ‘Fitting’ for full details).<br/><br/>","short_description":"Wide decorative panel to fit into recess on side of floor cupboard at end of run if deeper than normal, or on back of peninsula.","weight":"11.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"wide-plain-end-panel","visibility":"4","url_path":"wide-plain-end-panel.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:07:08-07:00","updated_at":"2014-12-05 03:25:53","kitchen_planner_center":null,"kitchen_planner_front":"0","kitchen_planner_side":"1","kitchen_planner":"1","dimensions_width":"990","dimensions_height":"15","dimensions_depth":"870","price":"75.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Wide Plain End Panel, Floor Cupboards - British Standard","meta_keyword":null,"meta_description":"British Standard Wide Plain End Panel, Floor Cupboards specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"60","left_right":true,"front":false,"side":true,"center":false,"dimensions":{"width":"990","height":"15","depth":"870"},"svg":{"plan":{"center":"svg/F-WPEP/F-WPEP-plan.svg","left":"svg/F-WPEP/F-WPEP-planL.svg","right":"svg/F-WPEP/F-WPEP-planR.svg"},"front":{"center":"svg/F-WPEP/F-WPEP-frontele.svg","left":"svg/F-WPEP/F-WPEP-fronteleL.svg","right":"svg/F-WPEP/F-WPEP-fronteleR.svg"},"side":{"center":"svg/F-WPEP/F-WPEP-side.ele.svg","left":"svg/F-WPEP/F-WPEP-side.eleL.svg","right":"svg/F-WPEP/F-WPEP-side.eleR.svg"}}},{"sku":"BS-F/PBE","set":"4","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"Plain Book End","description":"Product Specification<br/>\r\nWidth - 660mm<br/>\r\nDepth - 175mm + 15mm<br/>\r\nHeight - 870mm<br/>\r\nWeight approx - 7kg<br/>\r\nProduct Number - BS-F/PBE<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on ‘Fitting’ for full details).<br/><br/>","short_description":"End panel with two projecting shelves curved at one end, comes as a kit of parts so that it can be handed either way and height of shelves chosen to suit. Shelves to be fixed to panel with screw fixings from back.","weight":"7.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"plain-book-end","visibility":"4","url_path":"plain-book-end.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:07:09-07:00","updated_at":"2014-12-05 03:25:19","kitchen_planner_center":null,"kitchen_planner_front":"1","kitchen_planner_side":"1","kitchen_planner":"1","dimensions_width":"660","dimensions_height":"870","dimensions_depth":"190","price":"100.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Plain Book End (Width 660mm), Floor Cupboards - British Standard","meta_keyword":null,"meta_description":"British Standard Plain Book End (Width 660mm), Floor Cupboards specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"61","left_right":true,"front":true,"side":true,"center":false,"dimensions":{"width":"660","height":"870","depth":"190"},"svg":{"plan":{"center":"svg/F-PBE/F-PBE-plan.svg","left":"svg/F-PBE/F-PBE-planL.svg","right":"svg/F-PBE/F-PBE-planR.svg"},"front":{"center":"svg/F-PBE/F-PBE-frontele.svg","left":"svg/F-PBE/F-PBE-fronteleL.svg","right":"svg/F-PBE/F-PBE-fronteleR.svg"},"side":{"center":"svg/F-PBE/F-PBE-side.ele.svg","left":"svg/F-PBE/F-PBE-side.eleL.svg","right":"svg/F-PBE/F-PBE-side.eleR.svg"}}},{"sku":"BS-F/PEP","set":"4","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"Plain End Panel","description":"Product Specification<br/>\r\nWidth - 660mm<br/>\r\nDepth - 15mm<br/>\r\nHeight - 870mm<br/>\r\nWeight approx - 7kg<br/>\r\nProduct Number - BS-F/PEP<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on ‘Fitting’ for full details).<br/><br/>","short_description":"Decorative panel to fit into recess on side of floor cupboard at end of run.","weight":"4.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"plain-end-panel","visibility":"4","url_path":"plain-end-panel.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:07:10-07:00","updated_at":"2014-12-05 03:24:57","kitchen_planner_center":null,"kitchen_planner_front":"0","kitchen_planner_side":"1","kitchen_planner":"1","dimensions_width":"660","dimensions_height":"870","dimensions_depth":"15","price":"50.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Plain End Panel (Width 660mm), Floor Cupboards - British Standard","meta_keyword":null,"meta_description":"British Standard Plain End Panel (Width 660mm), Floor Cupboards specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"62","left_right":true,"front":false,"side":true,"center":false,"dimensions":{"width":"660","height":"870","depth":"15"},"svg":{"plan":{"center":"svg/F-PEP/F-PEP-plan.svg","left":"svg/F-PEP/F-PEP-planL.svg","right":"svg/F-PEP/F-PEP-planR.svg"},"front":{"center":"svg/F-PEP/F-PEP-frontele.svg","left":"svg/F-PEP/F-PEP-fronteleL.svg","right":"svg/F-PEP/F-PEP-fronteleR.svg"},"side":{"center":"svg/F-PEP/F-PEP-side.ele.svg","left":"svg/F-PEP/F-PEP-side.eleL.svg","right":"svg/F-PEP/F-PEP-side.eleR.svg"}}},{"sku":"BS-F/WBEP","set":"4","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"Wide Boarded End Panel","description":"Product Specification<br/>\r\nWidth - 990mm<br/>\r\nDepth - 15mm<br/>\r\nHeight - 870mm<br/>\r\nWeight approx - 11kg<br/>\r\nProduct Number - BS-F/WBEP<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on ‘Fitting’ for full details).<br/><br/>\r\n\r\n","short_description":"Wide decorative panel to fit into recess on side of floor cupboard at end of run if deeper than normal, or on back of peninsula.","weight":"11.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"wide-boarded-end-panel","visibility":"4","url_path":"wide-boarded-end-panel.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:07:06-07:00","updated_at":"2014-12-05 07:00:08","kitchen_planner_center":"0","kitchen_planner_front":"0","kitchen_planner_side":"1","kitchen_planner":"1","dimensions_width":"990","dimensions_height":"15","dimensions_depth":"870","price":"75.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Wide Boarded End Panel, Floor Cupboards - British Standard","meta_keyword":null,"meta_description":"British Standard Wide Boarded End Panel, Floor Cupboards specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"59","left_right":true,"front":false,"side":true,"center":false,"dimensions":{"width":"990","height":"15","depth":"870"},"svg":{"plan":{"center":"svg/F-WBEP/F-WBEP-plan.svg","left":"svg/F-WBEP/F-WBEP-planL.svg","right":"svg/F-WBEP/F-WBEP-planR.svg"},"front":{"center":"svg/F-WBEP/F-WBEP-frontele.svg","left":"svg/F-WBEP/F-WBEP-fronteleL.svg","right":"svg/F-WBEP/F-WBEP-fronteleR.svg"},"side":{"center":"svg/F-WBEP/F-WBEP-side.ele.svg","left":"svg/F-WBEP/F-WBEP-side.eleL.svg","right":"svg/F-WBEP/F-WBEP-side.eleR.svg"}}},{"sku":"BS-F/450IAF","set":"4","type":"simple","categories":["3"],"websites":["1"],"type_id":"simple","name":"450 Integrated Appliance Facade","description":"Product Specification <br />\r\nDoor Width - 450mm <br />\r\nWidth - 450mm <br />\r\nDepth - 21mm <br />\r\nHeight - 900mm <br />\r\nWeight approx - 7kg<br />\r\nProduct Number - BS-F/450IAF<br /><br />\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on &lsquo;Fitting&rsquo; for full details).</i>","short_description":"Door, rail and skirting to conceal 450mm integrated dishwasher. ","weight":"7.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"450-integrated-appliance-facade","visibility":"4","url_path":"450-integrated-appliance-facade.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:07:05-07:00","updated_at":"2014-12-05 06:21:09","kitchen_planner_center":"1","kitchen_planner_front":"1","kitchen_planner_side":"0","kitchen_planner":"1","dimensions_width":"450","dimensions_height":"900","dimensions_depth":"21","price":"180.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"450 Integrated Appliance Facade (Width 450mm) - British Standard","meta_keyword":null,"meta_description":"British Standard 450 Integrated Appliance Facade (Width 450mm) specification. Our Wooden Floor Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"58","left_right":false,"front":true,"side":false,"center":true,"dimensions":{"width":"450","height":"900","depth":"21"},"svg":{"plan":{"center":"svg/F-450IAF/F-450IAF-plan.svg","left":"svg/F-450IAF/F-450IAF-planL.svg","right":"svg/F-450IAF/F-450IAF-planR.svg"},"front":{"center":"svg/F-450IAF/F-450IAF-frontele.svg","left":"svg/F-450IAF/F-450IAF-fronteleL.svg","right":"svg/F-450IAF/F-450IAF-fronteleR.svg"},"side":{"center":"svg/F-450IAF/F-450IAF-side.ele.svg","left":"svg/F-450IAF/F-450IAF-side.eleL.svg","right":"svg/F-450IAF/F-450IAF-side.eleR.svg"}}},{"sku":"BS-T/PEP","set":"4","type":"simple","categories":["3","7"],"websites":["1"],"type_id":"simple","name":"Plain End Panel","description":"Product Specification<br/>\r\nWidth - 660mm <br/>\r\nDepth - 15mm <br/>\r\nHeight - 2150mm <br/>\r\nWeight approx - 9kg<br/>\r\nProduct Number - BS-T/PEP<br/><br/>\r\n\r\n<i>All British Standard floor cupboards have 30mm extra at their base to enable them to be adjusted to fit any variations in floor height (see section on Fitting for full details).<br/><br/>","short_description":"Decorative panel to fit into recess on side of tall cupboard at end of run.","weight":"9.0000","old_id":null,"news_from_date":null,"news_to_date":null,"status":"1","url_key":"plain-end-panel","visibility":"4","url_path":"plain-end-panel-77.html","country_of_manufacture":"GB","required_options":"0","has_options":"0","image_label":null,"small_image_label":null,"thumbnail_label":null,"created_at":"2014-08-28T08:07:17-07:00","updated_at":"2014-11-16 17:11:21","kitchen_planner_center":null,"kitchen_planner_front":null,"kitchen_planner_side":null,"kitchen_planner":"1","dimensions_width":"2000","dimensions_height":"2000","dimensions_depth":"2000","price":"100.0000","group_price":[],"special_price":null,"special_from_date":null,"special_to_date":null,"tier_price":[],"msrp_enabled":"2","minimal_price":null,"msrp_display_actual_price_type":"4","msrp":null,"tax_class_id":"2","meta_title":"Tall Cupboards - Plain End Panel (Width 660mm) - British Standard","meta_keyword":null,"meta_description":"British Standard Tall Cupboards - Plain End Panel (Width 660mm) specification. Our Wooden Tall Cupboards are affordable, high quality and made to order.\r\n","is_recurring":"0","recurring_profile":null,"custom_design":"default/modern","custom_design_from":null,"custom_design_to":null,"custom_layout_update":null,"page_layout":"two_columns_left","options_container":"container1","gift_message_available":"0","id":"67","left_right":false,"front":false,"side":false,"center":false,"dimensions":{"width":"2000","height":"2000","depth":"2000"},"svg":{"plan":{"center":"svg/T-PEP/T-PEP-plan.svg","left":"svg/T-PEP/T-PEP-planL.svg","right":"svg/T-PEP/T-PEP-planR.svg"},"front":{"center":"svg/T-PEP/T-PEP-frontele.svg","left":"svg/T-PEP/T-PEP-fronteleL.svg","right":"svg/T-PEP/T-PEP-fronteleR.svg"},"side":{"center":"svg/T-PEP/T-PEP-side.ele.svg","left":"svg/T-PEP/T-PEP-side.eleL.svg","right":"svg/T-PEP/T-PEP-side.eleR.svg"}}}]}
        res.send(data);
    });
    myServerRouter.get('/local/categories', function(req, res) {
        var data = {
            "categories" : [{
                "parent_id" : "1",
                "name" : "Default Category",
                "is_active" : true,
                "position" : "1",
                "level" : "1",
                "id" : "2",
                "categories" : []
            }, {
                "parent_id" : "1",
                "name" : "Floor Cupboards",
                "is_active" : true,
                "position" : "2",
                "level" : "1",
                "id" : "3",
                "categories" : []
            }, {
                "parent_id" : "1",
                "name" : "Tall Cupboards",
                "is_active" : true,
                "position" : "3",
                "level" : "1",
                "id" : "4",
                "categories" : []
            }, {
                "parent_id" : "1",
                "name" : "Other Cupboards",
                "is_active" : true,
                "position" : "4",
                "level" : "1",
                "id" : "5",
                "categories" : []
            }, {
                "parent_id" : "1",
                "name" : "Accessories",
                "is_active" : true,
                "position" : "5",
                "level" : "1",
                "id" : "6",
                "categories" : []
            }, {
                "parent_id" : "1",
                "name" : "Test Cat",
                "is_active" : true,
                "position" : "6",
                "level" : "1",
                "id" : "7",
                "categories" : []
            }, {
                "parent_id" : "0",
                "name" : "Root Catalog",
                "is_active" : false,
                "position" : "0",
                "level" : "0",
                "id" : "1",
                "categories" : ["2", "3", "4", "5", "6", "7"]
            }]
        };
        res.send(data);
    });
    myServerRouter.get("/local/errors/:id", function(req, res) {
        var data = {
            "errors" : [{
                "id"            : "missingData",
                "name"          : "Missing data",
                "title"         : "Some data was missing to complete the request.",
                "message"       : "Please ensure the following data is filled in: ",
                "http_status"   : 404
            }]
        };
        res.send(data);
    });
    app.use('/api', myServerRouter);
};
