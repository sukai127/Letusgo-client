'use strict';

angular.module('angularLetusgoApp')
  .controller('CategoryManageCtrl', function ($scope,CategoryManageService,$routeParams) {

      $scope.categories = CategoryManageService.loadAllCategories();
      $scope.category = CategoryManageService.getCategoryById($routeParams.id);
      $scope.add = function(){
        $scope.categories = CategoryManageService.insert($scope.name);
      };

      $scope.$emit('highLightActive','category');

      $scope.remove = function(index){
        $scope.categories.splice(index,1);
      };

      $scope.couldDelete = function(id){
        return !CategoryManageService.isIncludeProduct(id);
      };

      $scope.$watch('categories',function(){
        CategoryManageService.add($scope.categories);
      },true);

      $scope.updateCategory = function(){
        CategoryManageService.updateCategory($scope.category);
      };
  });
