'use strict';

describe('Service: ProductService', function () {

  var $httpBackend, productService, cartService,products,$http;

  beforeEach(function () {

    module('letusgo');

    inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $http = $injector.get('$http');
      productService = $injector.get('ProductService');
      cartService = $injector.get('CartService');
    });

    products = [
      {id : 1, name: 'Instant_noodles', unit: 'bag', categoryId: '1', price: 1},
      {id : 2, name: 'apple', unit: 'kg', categoryId: '1', price: 2.5}
    ];

  });

//  it('should loadAllProducts() work  when pageNow not null', function () {
//    spyOn(localStorageService, 'get').and.returnValue(products);
//    var result = productService.loadAllProducts(1);
//    expect(result.length).toEqual(2);
//    expect(result[1].name).toBe('apple');
//  });
//
//  it('should loadAllProducts() work  when pageNow is null', function () {
//    spyOn(localStorageService, 'get').and.returnValue(products);
//    var result = productService.loadAllProducts(null);
//    expect(result.length).toEqual(2);
//    expect(result[1].name).toBe('apple');
//  });
//
//  it('should loadAllProducts() work  when localStorage is empty', function () {
//    spyOn(localStorageService, 'get').and.returnValue(null);
//    var result = productService.loadAllProducts(null);
//    expect(result.length).toEqual(0);
//  });
//
//  it('should getPageTotal() work when product.length % 2 == 0', function () {
//    spyOn(localStorageService, 'get').and.returnValue(products);
//    var result = productService.getPageTotal();
//    expect(result.length).toEqual(1);
//    expect(result[0]).toBe(1);
//  });
//
//  it('should getPageTotal() work when product.length % 2 != 0', function () {
//    products[2] = {name: 'banana', unit: 'kg', category: '1', price: 5.5};
//    spyOn(localStorageService, 'get').and.returnValue(products);
//    var result = productService.getPageTotal();
//    expect(result.length).toEqual(2);
//    expect(result[0]).toBe(1);
//  });
//
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
