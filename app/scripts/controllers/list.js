'use strict';

angular.module('letusgo')
  .controller('ListCtrl', function ($scope,CartService,ProductService,CategoryManageService,$routeParams) {
    $scope.pageNow = parseInt($routeParams.pageNow);
    $scope.products = ProductService.loadAllProducts($scope.pageNow);
    $scope.cart = CartService.get();
    $scope.$emit('highLightActive','list');
    $scope.add2Cart = function(product){
        $scope.$emit('addCount');
        ProductService.add2Cart($scope.cart,product);
    };
    $scope.getCategoryName = function(id){
      return CategoryManageService.getCategoryById(id).name;
    };

    $scope.pageTotal = ProductService.getPageTotal();

    $scope.previous = $scope.pageNow - 1 < 1 ? 1 : $scope.pageNow - 1;
    $scope.next = $scope.pageNow + 1 > _.max($scope.pageTotal) ? _.max($scope.pageTotal) : $scope.pageNow + 1;

  });
