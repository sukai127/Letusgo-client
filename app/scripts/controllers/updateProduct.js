'use strict';

angular.module('letusgo')
  .controller('UpdateProductCtrl', function ($scope,CategoryManageService,ProductManageService,$routeParams) {

    ProductManageService.getProductByName($routeParams.name,function(data){
      $scope.product = data;
    });
    CategoryManageService.loadAllCategories(function(data){
      $scope.categories = data;
    });

    $scope.updateProduct = function(){
      ProductManageService.updateProduct($scope.product);
    };

    $scope.$emit('highLightActive','product');
  });
