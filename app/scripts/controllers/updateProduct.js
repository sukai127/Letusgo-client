'use strict';

angular.module('letusgo')
  .controller('UpdateProductCtrl', function ($scope,CategoryManageService,ProductManageService,$routeParams) {

    $scope.product = ProductManageService.getProductByName($routeParams.name);
    CategoryManageService.loadAllCategories(function(data){
      $scope.categories = data;
    });

    $scope.updateProduct = function(){
      ProductManageService.updateProduct($scope.product);
    };

    $scope.$emit('highLightActive','product');
  });
