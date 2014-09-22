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

    this.insert = function(product,callback){
      $http.get('/api/items').success(function(products){
        var isExist = _.some(products,{name : product.name});
        var isAllFullIn = product && product.name && product.price && product.unit && product.categoryId  && !isExist;
        if(isAllFullIn){
          var id = parseInt(products[products.length-1].id) + 1;
          product.id = id;
          CategoryManageService.getCategoryById(product.categoryId,function(data){
            product.category = data;
            products.push(product);
            callback(products);
          });
        }
      });
    };

    this.updateProduct = function (product) {
      $http.get('/api/items').success(function(data){
        var products = data;
        _.forEach(products,function(item,index){
          if(item.id === product.id){
            products[index] = product;
          }
        });
        $http.post('/api/items',{products:products});
      });
      return product;
    };
    this.getProductByName = function(name,callback){
      $http.get('/api/items').success(function(products){
        var result = _.find(products,{name: name}) || {};
        callback(result);
      });
    };
  });
