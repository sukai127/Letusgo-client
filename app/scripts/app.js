'use strict';

/**
 * @ngdoc overview
 * @name angularLetusgoApp
 * @description
 * # angularLetusgoApp
 *
 * Main module of the application.
 */
angular
  .module('angularLetusgoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])

  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ls');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/list/:pageNow', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .when('/categoryManage', {
        templateUrl: 'views/categoryManage.html',
        controller: 'CategoryManageCtrl'
      })
      .when('/productManage', {
        templateUrl: 'views/productManage.html',
        controller: 'ProductManageCtrl'
      })
      .when('/updateCategory/:id', {
        templateUrl: 'views/updateCategory.html',
        controller: 'CategoryManageCtrl'
      })
      .when('/updateProduct/:name', {
        templateUrl: 'views/updateProduct.html',
        controller: 'UpdateProductCtrl'
      })
      .when('/result', {
        templateUrl: 'views/result.html',
        controller: 'ResultCtrl'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
