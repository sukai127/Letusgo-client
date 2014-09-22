'use strict';

angular.module('letusgo')
  .controller('ProductManageCtrl', function ($scope,ProductManageService,CategoryManageService) {

    ProductManageService.loadAllProducts(function(data){
      $scope.products = data;
    });
    CategoryManageService.loadAllCategories(function(data){
      $scope.categories = data;
    });
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
