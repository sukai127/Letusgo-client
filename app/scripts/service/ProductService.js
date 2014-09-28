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

        this.addToCart = function(product,callback){

           $http.get('cartItems').success(function(cartItems){

             var existIndex = function (){

               var index = -1;

               _.forEach(cartItems,function(item,i){

                 if(product.id.toString() === item.productId.toString()){
                   index = i;
                 }
               });
               return index;
             };

             var cartItem = {productId:product.id};

             if(existIndex() === -1){
               cartItem.count = 1;
               $http.post('/api/cartItems',{cartItem: cartItem});
             }else{
               var count = cartItems[existIndex()];
               cartItem.count = count + 1;
               $http.put('/api/cartItems',{cartItem:cartItem});
             }
             callback();
           });
        };
    });
