'use strict';

angular.module('letusgo')
    .controller('CartCtrl', function ($scope,CartService) {

        CartService.get(function(data){

          $scope.cart = data;
          $scope.isCartEmpty = $scope.cart.cartItems.length === 0;
          $scope.totalMoney = CartService.getTotalMoney($scope.cart.cartItems);

        });

        $scope.$emit('highLightActive','cart');

        $scope.getSubtotal = function(cartitem){
            return CartService.getSubtotal(cartitem);
        };

        $scope.deleteItem = function(index){
            $scope.cart.cartItems.splice(index,1);
            CartService.delete($scope.cart.cartItems[index]);
        };
    
        $scope.$watch('cart',function(){
          _.remove($scope.cart.cartItems,function(cartitem){
            return cartitem.count < 1;
          });

          $scope.totalMoney = CartService.getTotalMoney($scope.cart);
          CartService.add($scope.cart);
          $scope.$emit('updateCount',$scope.cart);
        },true);
    });


