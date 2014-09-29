'use strict';

angular.module('letusgo')
  .controller('ListCtrl', function ($scope,CartService,ProductService,CategoryManageService,$routeParams) {
    $scope.pageNow = parseInt($routeParams.pageNow);
    ProductService.loadAllProducts($scope.pageNow,function(data){
      $scope.products = data;
    });
    CartService.get(function(data){
       $scope.cart = data;
    });
    $scope.$emit('highLightActive','list');
    $scope.addToCart = function(product){
        ProductService.addToCart(product);
        $scope.$emit('addCount',$scope.cart);
    };

    ProductService.getPageTotal(function(data){
      $scope.pageTotal = data;
      $scope.previous = $scope.pageNow - 1 < 1 ? 1 : $scope.pageNow - 1;
      $scope.next = $scope.pageNow + 1 > _.max($scope.pageTotal) ? _.max($scope.pageTotal) : $scope.pageNow + 1;
    });
  });
