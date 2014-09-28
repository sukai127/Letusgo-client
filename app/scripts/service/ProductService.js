'use strict';

angular.module('letusgo')
    .service('ProductService',function(CartItemService,CategoryManageService,CartService,$http){
        this.loadAllProducts = function(pageNow,callback){
            $http.get('/api/products').success(function(products){
              if(pageNow){
                products  = products.slice((pageNow-1)*2,pageNow*2);
              }
              _.forEach(products,function(product){
                CategoryManageService.getCategoryById(product.categoryId,function(data){
                  product.category = data;
                });
              });
              callback(products);
            });
        };
        this.getPageTotal = function(callback){
          this.loadAllProducts(null,function(data){
            var totalCount =data.length;
            var pageCount = totalCount % 2 === 0 ?  parseInt(totalCount / 2) : parseInt(totalCount / 2) + 1;
            callback(_.range(1,pageCount + 1));
          });
        };
        this.addToCart = function(cart,product,callback){

            var isExist = function (){
                var flag = false;
                _.forEach(cart.cartItems,function(item){
                    if(product.name === item.product.name){
                        item.count++;
                        flag = true;
                    }
                });
                return flag;
            };

            if(!isExist()){
                cart.cartItems.push(CartItemService.create(product,1));
            }

            cart.len = CartService.getTotalCount(cart);
            $http.post('/api/cart',{'cart':cart}).success(function(){
              callback(cart);
            });
        };
    });
