'use strict';

angular.module('letusgo')
    .service('ProductService',function(CartItemService,localStorageService,CartService,$http){
        this.loadAllProducts = function(pageNow,callback){
            $http.get('/api/items').success(function(products){
              if(pageNow){
                callback(products.slice((pageNow-1)*2,pageNow*2));
              }else{
                callback(products);
              }
            });
        };
        this.getPageTotal = function(){
          var totalCount = this.loadAllProducts(null).length;
          var pageCount = totalCount % 2 === 0 ?  parseInt(totalCount / 2) : parseInt(totalCount / 2) + 1;
          return _.range(1,pageCount + 1);
        };
        this.add2Cart = function(cart,product){
            var isOk = function (){
                var flag = true;
                _.forEach(cart.cartItems,function(item){
                    if(product.name === item.product.name){
                        item.count++;
                        flag = false;
                    }
                });
                return flag;
            };
            if(isOk()){
                cart.cartItems.push(CartItemService.create(product,1));
            }
            cart.len = CartService.getTotalCount(cart);
            localStorageService.add('cart',cart);
        };
    });
