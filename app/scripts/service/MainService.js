'use strict';
angular.module('angularLetusgoApp')
  .service('mainService',function(localStorageService){
    this.initCategories = function(){
      var categories = [
        {id : 1, name: 'grocery'},
        {id : 2, name: 'device'}
      ];
      var temp = localStorageService.get('categories');
      if(!temp){
        localStorageService.add('categories',categories);
      }
    };
    this.initProuducts = function(){
      var products = [
        {id:1, name: 'Instant_noodles', unit: 'bag', category: '1', price: 1},
        {id:2, name: 'apple', unit: 'kg', category: '1', price: 2.5},
        {id:3, name: 'coca_cola', unit: 'bottle', category: '1', price: 0.5},
        {id:4, name: 'kettle', unit: 'piece', category: '2', price: 43.5},
        {id:5, name: 'fan', unit: 'piece', category: '2', price: 30}
      ];
      var temp = localStorageService.get('products');
      if(!temp){
        localStorageService.add('products', products);
      }
    };
    this.init = function(){
      this.initProuducts();
      this.initCategories();
    };
  });
