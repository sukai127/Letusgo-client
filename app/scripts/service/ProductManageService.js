'use strict';
angular.module('letusgo')
  .service('ProductManageService', function (localStorageService,$http) {
    this.loadAllProducts = function (callback) {
      $http.get('/api/items').success(function(data){
        callback(data);
      });
    };
    this.add = function (products) {
      $http.post('/api/items',{products:products});
    };

    this.insert = function(product,callback){
      $http.get('/api/items').success(function(data){
        var products = data;
        var isExist = _.some(products,{name : product.name});
        var isAllFullIn = product && product.name && product.price && product.unit  && !isExist;
        if(isAllFullIn){
          var id = parseInt(products[products.length-1].id) + 1;
          product.id = id;
          products.push(product);
        }
        callback(products);
      });
    };

    this.updateProduct = function (product) {
      var products = localStorageService.get('products');
      _.forEach(products,function(item,index){
        if(item.id === product.id){
          products[index] = product;
        }
      });
      this.add(products);
      return product;
    };
    this.getProductByName = function(name){
      var products = localStorageService.get('products');
      return _.find(products,{name: name}) || {};
    };
  });
