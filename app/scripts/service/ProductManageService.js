'use strict';
angular.module('letusgo')
  .service('ProductManageService', function (localStorageService,$http,CategoryManageService) {
    this.loadAllProducts = function (callback) {
      $http.get('/api/items').success(function(data){
        _.forEach(data,function(item){
          if(!item.category){
            CategoryManageService.getCategoryById(item.categoryId,function(category){
              item.category = category;
            });
          }
        });
        callback(data);
      });
    };
    this.add = function (products) {
      $http.post('/api/items',{products:products});
    };

    this.insert = function(product){

      var isAllFullIn = product && product.name && product.price && product.unit && product.categoryId;
      console.log(product);
      if(isAllFullIn){
          $http.post('/api/items',{product:product});
      }
    };

    this.updateProduct = function (product) {
      $http.put('/api/items/'+product.id,{product:product});
    };
    this.getProductByName = function(name,callback){
      $http.get('/api/items').success(function(products){
        var result = _.find(products,{name: name}) || {};
        callback(result);
      });
    };
  });
