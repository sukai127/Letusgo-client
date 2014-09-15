'use strict';

describe('Controller: ListCtrl', function () {

  var createController,$controller,productManageService,$scope,products,categories,categoryManageService;

  beforeEach(function(){
    module('angularLetusgoApp');
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
    }
     products = [
        {name : 'Instant_noodles', unit : 'bag', category : '1', price : 1},
        {name : 'apple', unit : 'kg', category : '1', price : 2.5}
      ];
    spyOn($scope,'$emit');
    spyOn(productManageService,'loadAllProducts').and.returnValue(products);
  });

  it('should init success', function () {
    createController();
    expect($scope.products.length).toBe(2);
    expect($scope.products[1].name).toBe('apple');
    expect($scope.$emit.calls.count()).toBe(1);
  });

  it('should remove() work', function () {
    createController();
    $scope.remove(1);
    expect($scope.products.length).toBe(1);
  });

  it('should add() work when product equal {}', function () {
    createController();
    $scope.product = {};
    $scope.add();
    expect($scope.products.length).toBe(2);
    $scope.product = {name : 'Instant_noodles', unit : 'bag', category : '1', price : 1};
    $scope.add();
    expect($scope.products.length).toBe(3);
  });

  it('should $watch() work', function () {
    spyOn(productManageService,'add');
    createController();
    $scope.products = [];
    $scope.$apply();
    expect(productManageService.add.calls.count()).toBe(1);
  });

});
