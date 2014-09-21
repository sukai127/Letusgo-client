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
      $http.get('/api/items').success(function(data){
        if(!data){
          $http.post('/api/items',{});
        }
      });
    };
    this.init = function(){
      this.initProducts();
      this.initCategories();
    };
  });
