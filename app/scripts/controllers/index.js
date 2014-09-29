'use strict';

angular
    .module('letusgo')
    .controller('IndexCtrl',function($scope,CartService){
        CartService.get(function(data){
          $scope.cart = data;
        });

        $scope.$on('addCount',function(){
            var newCount = $scope.cart.count + 1;
            $scope.cart.count = newCount;
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
        };

        $scope.$on('highLightActive',function(event,active){
          $scope.highLight(active + 'Active');
        });

        $scope.$on('updateCount',function(event,cart){
            cart.count = CartService.getTotalCount(cart.cartItems);
            $scope.cart.count = cart.count;
        });

        $scope.$on('clear',function(){
          $scope.cart = {cartItems: [],count:0};
        });
    });
