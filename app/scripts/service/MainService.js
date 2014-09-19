'use strict';
angular.module('letusgo')
  .service('MainService',function(localStorageService,$http){
    this.initCategories = function(){
      $http({
        url: '/api/categories',
        method: 'POST'
      });
    };
    this.initProducts = function(){
      $http({
        url: '/api/items',
        method: 'POST'
      });
    };
    this.init = function(){
      this.initProducts();
      this.initCategories();
    };
  });
