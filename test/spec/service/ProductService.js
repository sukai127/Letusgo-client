/**
 * Created by sukai on 14-8-28.
 */
'use strict';

describe('Service: ProductService', function () {

  var localStorageService, productService, cartService, cart, products;
  beforeEach(function () {
    module('letusgo');
    inject(function ($injector) {
      localStorageService = $injector.get('localStorageService');
      productService = $injector.get('ProductService');
      cartService = $injector.get('CartService');
    });
    products = [
      {name: 'Instant_noodles', unit: 'bag', category: '1', price: 1},
      {name: 'apple', unit: 'kg', category: '1', price: 2.5}
    ];
  });

  it('should loadAllProducts() work', function () {
    spyOn(localStorageService, 'get').and.returnValue(products);
    var result = productService.loadAllProducts(1);
    expect(result.length).toEqual(2);
    expect(result[1].name).toBe('apple');
  });

  it('should getPageTotal() work', function () {
    spyOn(localStorageService, 'get').and.returnValue(products);
    var result = productService.getPageTotal();
    expect(result.length).toEqual(1);
    expect(result[0]).toBe(1);
  });

  it('when it not exist should push it', function () {
    cart = {cartItems: [], len: 0};
    var product = {name: 'fan', unit: 'piece', category: 'device', price: 30};
    productService.add2Cart(cart, product);
    expect(cart.cartItems[0].product.name).toEqual('fan');
    expect(cart.len).toBe(1);
  });

  it('when it exist should count++', function () {
    var product = {name: 'fan', unit: 'piece', category: 'device', price: 30};
    productService.add2Cart(cart, product);
    expect(cart.cartItems.length).toBe(1);
    expect(cart.cartItems[0].count).toEqual(2);
    expect(cart.len).toBe(2);
  });

});
