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

        this.getPrevious = function(pageNow){
          var previous = pageNow - 1 < 1 ? 1 : pageNow - 1;
          return previous;
        };

        this.loadAllProducts = function (callback) {
          $http.get('/api/products').success(function(data){
            _.forEach(data,function(item){
              if(!item.category){
                CategoryManageService.getCategoryById(item.categoryId,function(category){
                  item.category = category;
                });
              }
            });
            callback(data);
          });
        };

        this.insert = function(product,callback){

          var isAllFullIn = product && product.name && product.price && product.unit && product.categoryId;
          if(isAllFullIn){
            $http.post('/api/products',{product:product}).success(function(){
              CategoryManageService.getCategoryById(product.categoryId,function(category){
                product.category = category;
                callback(product);
              });
            });
          }
        };

        this.delete = function(id){
          $http.delete('/api/products/'+id);
        };

        this.updateProduct = function (product) {
          delete product.category;
          $http.put('/api/products/'+product.id,{product:product});
        };

        this.getProductByName = function(name,callback){
          $http.get('/api/products').success(function(products){
            var result = _.find(products,{name: name}) || {};
            callback(result);
          });
        };

        this.getNext = function(pageNow,pageTotal){
          var next = pageNow + 1 > _.max(pageTotal) ? _.max(pageTotal) : pageNow + 1;
          return next;
        };

        this.addToCart = function(product){

           $http.get('/api/cartItems').success(function(cartItems){

             var existItem = function (){

               var result  = null;

               _.forEach(cartItems,function(item,i){

                 if(product.id.toString() === item.productId.toString()){
                   result  = cartItems[i];
                 }
               });
               return result;
             };

             var cartItem = {productId:product.id};
             var updateItem = existItem();

             if(!updateItem){
               cartItem.count = 1;
               $http.post('/api/cartItems',{cartItem: cartItem});
             }else{
               updateItem.count = updateItem.count + 1;
               $http.put('/api/cartItems/'+updateItem.id,{cartItem:updateItem});
             }
           });
        };
    });
