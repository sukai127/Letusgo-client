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
      return $controller('UpdateProductCtrl', {
        $scope: $scope,
        CategoryManageService: categoryManageService,
        ProductManageService: productManageService
      });
    }
     products = [
        {name : 'Instant_noodles', unit : 'bag', category : '1', price : 1},
        {name : 'apple', unit : 'kg', category : '1', price : 2.5}
      ];
    categories = [
      {id : 1, name: 'grocery'},
      {id : 2, name: 'device'}
    ];
    spyOn($scope,'$emit');
  });

  it('should init success', function () {
    spyOn(categoryManageService,'loadAllCategories').andReturn(categories);
    createController();
    expect($scope.categories.length).toBe(2);
    expect($scope.categories[0].id).toBe(1);
    expect($scope.$emit.calls.length).toBe(1);
  });
  it('should getCategoryName work', function () {
    spyOn(categoryManageService,'getCategoryById').andReturn({id:1,name:'grocery'});
    createController();
    var result = $scope.getCategoryName('1');
    expect(result).toBe('grocery');
  });
  it('should updateProduct work', function () {
    var product = {name : 'Instant_noodles', unit : 'bag', category : '1', price : 1};
    spyOn(productManageService,'updateProduct');
    createController();
    $scope.updateProduct(product);
    expect(productManageService.updateProduct.calls.length).toBe(1);
  });
});
