'use strict';

angular.module('letusgo')
  .controller('ProductManageCtrl', function ($scope,ProductManageService,CategoryManageService) {

    $scope.products = ProductManageService.loadAllProducts();
    $scope.categories = CategoryManageService.loadAllCategories();
    $scope.$watch('products',function(){
      ProductManageService.add($scope.products);
    },true);

    $scope.remove = function(index){
      $scope.products.splice(index,1);
      return false;
    };
    $scope.getCategoryName = function(id){
      return CategoryManageService.getCategoryById(id).name;
    };
    $scope.$emit('highLightActive','product');
    $scope.add = function(){
      $scope.products = ProductManageService.insert($scope.product);
    };
  });
