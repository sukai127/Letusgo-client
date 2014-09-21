'use strict';

angular.module('letusgo')
  .controller('ListCtrl', function ($scope,CartService,ProductService,CategoryManageService,$routeParams) {
    $scope.pageNow = parseInt($routeParams.pageNow);
    ProductService.loadAllProducts($scope.pageNow,function(data){
      $scope.products = data;
      _.forEach($scope.products,function(product){
        CategoryManageService.getCategoryById(product.categoryId,function(data){
          product.category = data;
        });
      });
    });
    CartService.get(function(data){
       $scope.cart = data;
    });
    $scope.$emit('highLightActive','list');
    $scope.addToCart = function(product){
        $scope.$emit('addCount');
        ProductService.addToCart($scope.cart,product);
    };

    ProductService.getPageTotal(function(data){
      $scope.pageTotal = data;
      $scope.previous = $scope.pageNow - 1 < 1 ? 1 : $scope.pageNow - 1;
      $scope.next = $scope.pageNow + 1 > _.max($scope.pageTotal) ? _.max($scope.pageTotal) : $scope.pageNow + 1;
    });
  });
