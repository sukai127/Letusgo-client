'use strict';

describe('Controller: ListCtrl', function () {

  var createController,$controller,productManageService,$scope,products,categoryManageService;

  beforeEach(function(){
    module('letusgo');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $controller = $injector.get('$controller');
      categoryManageService = $injector.get('CategoryManageService');
      productManageService = $injector.get('ProductManageService');
    });

    createController = function(){
      return $controller('ProductManageCtrl', {
        $scope: $scope,
        CategoryManageService: categoryManageService,
        ProductManageService: productManageService
      });
    };
     products = [
        {name : 'Instant_noodles', unit : 'bag', category : '1', price : 1},
        {name : 'apple', unit : 'kg', category : '1', price : 2.5}
      ];
    spyOn($scope,'$emit');
    spyOn(productManageService,'loadAllProducts').and.callFake(function(callback){
      callback(products);
    });
  });

  it('should init success', function () {
    createController();
    productManageService.loadAllProducts(function(data){
      $scope.products = data;
      expect($scope.products.length).toBe(2);
      expect($scope.products[1].name).toBe('apple');
      expect($scope.$emit.calls.count()).toBe(1);
    });
  });

  it('should remove() work', function () {
    spyOn(productManageService,'delete');
    createController();
    $scope.remove(1);
    expect($scope.products.length).toBe(1);
    expect(productManageService.delete.calls.count()).toBe(1);
  });

  xit('should add() work when product equal {}', function () {
    createController();
    $scope.product = {};
    $scope.add();
    expect($scope.products.length).toBe(2);
    $scope.product = {name : 'Instant', unit : 'bag', category : '1', price : 1};
    $scope.add();
    expect($scope.products.length).toBe(3);
  });

  xit('should $watch() work', function () {
    spyOn(productManageService,'add');
    createController();
    $scope.products = [];
    $scope.$apply();
    expect(productManageService.add.calls.count()).toBe(1);
  });

});
