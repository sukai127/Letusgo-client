'use strict';
angular.module('angularLetusgoApp')
  .service('ProductManageService', function (localStorageService) {
    this.loadAllProducts = function () {
      var products = [
        {id:1, name: 'Instant_noodles', unit: 'bag', category: '1', price: 1},
        {id:2, name: 'apple', unit: 'kg', category: '1', price: 2.5},
        {id:3, name: 'coca_cola', unit: 'bottle', category: '1', price: 0.5},
        {id:4, name: 'kettle', unit: 'piece', category: '2', price: 43.5},
        {id:5, name: 'fan', unit: 'piece', category: '2', price: 30}
      ];
      var temp = localStorageService.get('products');
      return temp ? temp : (localStorageService.add('products', products), products);
    };
    this.add = function (products) {
      localStorageService.add('products', products);
    };

    this.insert = function(product){
      var products = this.loadAllProducts();
      var isExist = _.some(products,{name : name});
      var isAllFullIn = product.name && product.price && product.unit && product && !isExist;
      if(isAllFullIn){
        var id = parseInt(products[products.length-1].id) + 1;
        product.id = id;
        products.push(product);
      }
      return products;
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
