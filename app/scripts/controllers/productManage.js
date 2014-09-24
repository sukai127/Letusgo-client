'use strict';

angular.module('letusgo')
  .controller('ProductManageCtrl', function ($scope,ProductManageService,CategoryManageService,$routeParams) {

    ProductManageService.loadAllProducts(function(data){
      $scope.products = data;
      $scope.product = _.find($scope.products,function(product){
        var name = $routeParams.name || 0;
        return product.name.toString() === name.toString();
      });
    });
    CategoryManageService.loadAllCategories(function(data){
      $scope.categories = data;
    });

    $scope.$watch('products',function(){
      //ProductManageService.add($scope.products);
    },true);

    $scope.remove = function(index){
      ProductManageService.delete($scope.products[index].id);
      $scope.products.splice(index,1);
    };

    $scope.updateProduct = function(){
      _.forEach($scope.products,function(product,index){
         if(product.id.toString() === $scope.product.id.toString()){
           $scope.products[index] = $scope.product;
         }
      });
      ProductManageService.updateProduct($scope.product);
    };

    $scope.$emit('highLightActive','product');
    $scope.add = function(){
      ProductManageService.insert($scope.product,function(data){
        $scope.products = data;
      });
    };
  });
