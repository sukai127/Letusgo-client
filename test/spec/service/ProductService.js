'use strict';

describe('Service: ProductService', function () {

  var $httpBackend, productService, cartService,products,$http,categories,categoryService;

  beforeEach(function () {

    module('letusgo');

    inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $http = $injector.get('$http');
      productService = $injector.get('ProductService');
      cartService = $injector.get('CartService');
      categoryService = $injector.get('CategoryService');
    });

    products = [
      {id : 1, name: 'Instant_noodles', unit: 'bag', categoryId: 1, price: 1},
      {id : 2, name: 'apple', unit: 'kg', categoryId: 2, price: 2.5},
      {id : 3, name: 'banana', unit: 'kg', categoryId: 2, price: 3.5}
    ];

    categories = [
      {id : 1, name: 'grocery'},
      {id : 2, name: 'device'}
    ];

    spyOn(categoryService,'getCategoryById').and.callFake(function(id,callback){
      callback(categories[id-1]);
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should loadAllProducts() work  when pageNow not null', function () {
    $httpBackend.expectGET('/api/products').respond(200,products);

    productService.loadAllProducts(1,function(data){
      expect(data.length).toBe(2);
      expect(data[1].category.name).toBe('device');
    });
    $httpBackend.flush();
  });

  it('should loadAllProducts() work  when pageNow is null', function () {
    $httpBackend.expectGET('/api/products').respond(200,products);

    productService.loadAllProducts(null,function(data){
      expect(data.length).toBe(3);
      expect(data[1].category.name).toBe('device');
    });
    $httpBackend.flush();
  });

  it('should getPageTotal() work when product.length % 2 == 0', function () {
    spyOn(productService,'loadAllProducts').and.callFake(function(pageNow,callback){
      callback(products);
    });
    productService.getPageTotal(function(data){
      expect(data.length).toBe(2);
    });
  });

  it('should getPageTotal() work when product.length % 2 != 0', function () {
    products[3] = {id:4, name: 'banana', unit: 'kg', categoryId: 2, price: 5.5};
    spyOn(productService,'loadAllProducts').and.callFake(function(pageNow,callback){
      callback(products);
    });
    productService.getPageTotal(function(data){
      expect(data.length).toBe(2);
    });
  });

//  it('when it not exist should push it', function () {
//    cart = {cartItems: [], len: 0};
//    var product = {name: 'fan', unit: 'piece', category: 'device', price: 30};
//    productService.add2Cart(cart, product);
//    expect(cart.cartItems[0].product.name).toEqual('fan');
//    expect(cart.len).toBe(1);
//  });
//
//  it('when it exist should count++', function () {
//    var product = {name: 'fan', unit: 'piece', category: 'device', price: 30};
//    productService.add2Cart(cart, product);
//    expect(cart.cartItems.length).toBe(1);
//    expect(cart.cartItems[0].count).toEqual(2);
//    expect(cart.len).toBe(2);
//  });

});
