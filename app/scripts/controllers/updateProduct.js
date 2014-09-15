'use strict';

angular.module('angularLetusgoApp')
  .controller('UpdateProductCtrl', function ($scope,CategoryManageService,ProductManageService,$routeParams) {

    $scope.product = ProductManageService.getProductByName($routeParams.name);
    $scope.categories = CategoryManageService.loadAllCategories();

    $scope.getCategoryName = function(id){
      return CategoryManageService.getCategoryById(id).name;
    };
    $scope.updateProduct = function(){
      ProductManageService.updateProduct($scope.product);
    };

    $scope.$emit('highLightActive','product');
  });
