'use strict';

angular
    .module('letusgo')
    .controller('IndexCtrl',function($scope,CartService){
        $scope.cart = CartService.get();

        $scope.$on('addCount',function(){
          $scope.cart = CartService.get();
          $scope.cart.len++;
          CartService.add($scope.cart);
        });
        $scope.indexActive = true;
        $scope.listActive = false;
        $scope.cartActive = false;
        $scope.categoryActive = false;
        $scope.productActive = false;

        $scope.highLight = function(highLightItem){
            var allItems = ['indexActive','listActive','cartActive','categoryActive','productActive'];
            _.forEach(allItems,function(item){
               if(highLightItem === item){
                   eval('$scope.' + item + " = true");
               } else{
                   eval('$scope.' + item + " = false");
               }
            });
        }

        $scope.$on('highLightActive',function(event,active){
          $scope.highLight(active + 'Active');
        });
        $scope.$on('updateCount',function(event,cart){
          cart.len = CartService.getTotalCount(CartService.get());
          $scope.cart.len = cart.len;
          CartService.add(cart);
        });
        $scope.$on('clear',function(){
          $scope.cart = {cartItems: [],len:0};
        });
    });
