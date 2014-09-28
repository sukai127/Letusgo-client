'use strict';

angular.module('letusgo')
    .service('CartService',function($http){

        this.get = function(callback){

            var service = this;

            $http.get('/api/cartItems').success(function(data){

              service.buildCartItem(data,function(cartItems){

                var cart = {cartItems: cartItems,
                  count: service.getTotalCount(cartItems)
                };

                callback(cart);
              });
            });
        };

        this.buildCartItem= function(cartItems,callback){

          $http.get('/api/products').success(function(data){
            _.forEach(cartItems,function(cartItem){
              var product = _.find(data,function(product){
                return product.id.toString() === cartItem.productId.toString();
              });
              cartItem.product = product;
            });
            callback(cartItems);
          });
        };

        this.add = function(cartItem){
            $http.post('/api/cartItems',{cartItem:cartItem});
        };

        this.getTotalMoney = function(cartItems){
            var sum = 0;
            _.forEach(cartItems,function(cartitem){
               sum += cartitem.product.price * cartitem.count;
            });
            return sum;
        };

        this.getTotalCount = function(cartItems){

          return _.reduce(_.pluck(cartItems, 'count'), function (count1, count2) {
            return count1 + count2;
          });
        };

        this.getSubtotal = function(cartitem){
            return (cartitem.product.price * cartitem.count).toFixed(2);
        };

        this.remove = function(callback){
            $http.post('/api/payment').success(function(data,status){
              if(status === 200){
                callback();
              }
            });
        };
    });

