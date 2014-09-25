'use strict';
/**
 * Created by sukai on 14-8-14.
 */
angular.module('letusgo')
    .service('CartService',function($http){
        this.get = function(callback){
            $http.get('/api/cart').success(function(data){
              var cart = data || {cartItems:[],len:0};
              callback(cart);
            });
        };
        this.add = function(cart){
            $http.post('/api/cart',{cart:cart});
        };
        this.getTotalMoney = function(cart){
            var sum = 0;
            _.forEach(cart.cartItems,function(cartitem){
               sum += cartitem.product.price * cartitem.count;
            });
            return sum;
        };

        this.getTotalCount = function(cart){

          return _.reduce(_.pluck(cart.cartItems, 'count'), function (count1, count2) {
            return count1 + count2;
          });
        };

        this.getSubtotal = function(cartitem){
            return (cartitem.product.price * cartitem.count).toFixed(2);
        };
        this.remove = function(){
            $http.delete('/api/cart');
        };
    });

