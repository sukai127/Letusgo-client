'use strict';

xdescribe('Controller: ListCtrl', function () {

  var createController,$controller,cart,cartService,productService,$scope,products,categoryManageService,$routeParams;

  beforeEach(function(){
    module('letusgo');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $controller = $injector.get('$controller');
      cartService = $injector.get('CartService');
      categoryManageService = $injector.get('CategoryManageService');
      productService = $injector.get('ProductService');
      $routeParams = $injector.get('$routeParams');
    });

    createController = function(){
      return $controller('ListCtrl', {
        $scope: $scope,
        CartService: cartService,
        CategoryManageService: categoryManageService,
        ProductService: productService,
        $routeParams : $routeParams
      });
    }
     products = [
      {name : 'Instant_noodles', unit : 'bag', category : '1', price : 1},
      {name : 'apple', unit : 'kg', category : '1', price : 2.5}
      ];
    cart = {
      cartItems: [
        {
          product: {name : 'Instant_noodles', unit : 'bag', category : '1', price : 1},
          count : 4
        },
        {
          product: {name : 'coca_cola', unit : 'bottle', category : '1', price : 0.5},
          count : 3
        },
        {
          product: {name : 'kettle', unit : 'piece', category : '2', price : 43.5},
          count : 1
        }
      ],
      len : 8
    };
    spyOn(productService,'loadAllProducts').and.returnValue(products);
    spyOn(cartService,'get').and.returnValue(cart);
    spyOn($scope,'$emit');
  });

  it('should init success', function () {

    createController();
    expect($scope.cart.cartItems.length).toBe(3);
    expect($scope.products.length).toBe(2);
    expect($scope.pageTotal.length).toBe(1);
    expect($scope.products[1].name).toBe('apple');
    expect($scope.$emit).toHaveBeenCalled();
  });

  it('should page init success', function () {
    spyOn(productService,'getPageTotal').and.returnValue([1,2,3]);
    $routeParams.pageNow = 3;
    createController();
    expect($scope.pageNow).toBe(3);
    expect($scope.previous).toBe(2);
    expect($scope.next).toBe(3);
  });

  it('should page init success', function () {
    spyOn(productService,'getPageTotal').and.returnValue([1,2,3]);
    $routeParams.pageNow = 1;
    createController();
    expect($scope.pageNow).toBe(1);
    expect($scope.previous).toBe(1);
    expect($scope.next).toBe(2);
  });

  it('should add2Cart work', function () {
      createController();
      $scope.add2Cart(products[0]);
      expect($scope.$emit).toHaveBeenCalled();
      expect($scope.cart.cartItems.length).toBe(3);
  });
  it('should getCategoryName work', function () {
    spyOn(categoryManageService,'getCategoryById').and.returnValue({id:1,name: 'grocery'});
    createController();
    var result = $scope.getCategoryName('1');
    expect(result).toBe('grocery');
  });
});
