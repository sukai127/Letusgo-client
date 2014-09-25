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

    this.insert = function(product,callback){

      var isAllFullIn = product && product.name && product.price && product.unit && product.categoryId;
      if(isAllFullIn){
          $http.post('/api/items',{product:product}).success(function(){
            CategoryManageService.getCategoryById(product.categoryId,function(category){
              product.category = category;
              callback(product);
            });
          });
      }
    };

    this.delete = function(id){
      $http.delete('/api/items/'+id);
    };
    this.updateProduct = function (product) {
      delete product.category;
      $http.put('/api/items/'+product.id,{product:product});
    };
    this.getProductByName = function(name,callback){
      $http.get('/api/items').success(function(products){
        var result = _.find(products,{name: name}) || {};
        callback(result);
      });
    };
  });
