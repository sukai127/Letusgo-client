'use strict';

describe('Controller: ListCtrl', function () {

  var createController,$controller,productManageService,$scope,products,categoryManageService,categories,$routeParams;

  beforeEach(function(){
    module('letusgo');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $controller = $injector.get('$controller');
      $routeParams = $injector.get('$routeParams');
      categoryManageService = $injector.get('CategoryManageService');
      productManageService = $injector.get('ProductManageService');
    });

    createController = function(){
      return $controller('ProductManageCtrl', {
        $scope: $scope,
        CategoryManageService: categoryManageService,
        ProductManageService: productManageService,
        $routeParams: $routeParams
      });
    };
     products = [
        {id:1, name : 'Instant_noodles', unit : 'bag', category : '1', price : 1},
        {id:2, name : 'apple', unit : 'kg', category : '1', price : 2.5}
      ];
    spyOn($scope,'$emit');
    spyOn(productManageService,'loadAllProducts').and.callFake(function(callback){
      callback(products);
    });

    categories = [
      {id : 1, name: 'grocery'},
      {id : 2, name: 'device'}
    ];
    spyOn(categoryManageService,'loadAllCategories').and.callFake(function(callback){
      callback(categories);
    });
  });

  it('should init success', function () {
    $routeParams.name = 'apple';
    createController();
    productManageService.loadAllProducts(function(data){
      $scope.products = data;
      expect($scope.products.length).toBe(2);
      expect($scope.product.unit).toBe('kg');
      expect($scope.products[1].name).toBe('apple');
      expect($scope.$emit.calls.count()).toBe(1);
    });
  });

  it('should init success when product is not empty', function () {
    spyOn(categoryManageService,'getCategoryById').and.callFake(function(id,callback){
      callback({id:2,name:'grocery'});
    });
    $routeParams.name = 'apple';
    createController();
    productManageService.loadAllProducts(function(data){
      $scope.products = data;
      expect($scope.products.length).toBe(2);
      expect($scope.products[1].name).toBe('apple');
      expect($scope.$emit.calls.count()).toBe(1);
      expect(categoryManageService.getCategoryById).toHaveBeenCalled();
    });
  });

  it('should initCategories success', function () {
    createController();
    categoryManageService.loadAllCategories(function(data){
      $scope.categories = data;
      expect($scope.categories.length).toBe(2);
    });
  });


  it('should remove() work', function () {
    spyOn(productManageService,'delete');
    createController();
    $scope.remove(1);
    expect($scope.products.length).toBe(1);
    expect(productManageService.delete.calls.count()).toBe(1);
  });

  it('should add() work when product equal {}', function () {
    var product = {name : 'Instant', unit : 'bag', category : '1', price : 1};
    spyOn(productManageService,'insert').and.callFake(function(item,callback){
      callback(product);
    });
    createController();
    $scope.product = product;
    $scope.add();
    expect($scope.products.length).toBe(3);
  });

  it('should updateProduct() work', function () {
    var product = {id:1,name : 'Instant', unit : 'bag', category : '1', price : 1};
    spyOn(productManageService,'updateProduct');
    createController();
    $scope.product = product;
    $scope.updateProduct();
    expect($scope.products[0].name).toBe('Instant');
    expect(productManageService.updateProduct.calls.count()).toBe(1);
  });

});
