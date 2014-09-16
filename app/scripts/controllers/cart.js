'use strict';

angular.module('letusgo')
    .controller('CartCtrl', function ($scope,CartService) {
        $scope.cart = CartService.get();
        $scope.$emit('highLightActive','cart');
        $scope.isCartEmpty = $scope.cart.cartItems.length == 0;
        $scope.totalMoney = CartService.getTotalMoney($scope.cart);
        $scope.getSubtotal = function(cartitem){
            return CartService.getSubtotal(cartitem);
        };
        $scope.deleteItem = function(index){
            $scope.cart.cartItems.splice(index,1);
            return false;
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


