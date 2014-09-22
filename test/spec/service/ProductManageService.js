/**
 * Created by sukai on 14-8-28.
 */
'use strict';

xdescribe('Service: ProductService', function () {

  var localStorageService, productManageService, cartService, products;
  beforeEach(function () {
    module('letusgo');
    inject(function ($injector) {
      localStorageService = $injector.get('localStorageService');
      productManageService = $injector.get('ProductManageService');
      cartService = $injector.get('CartService');
    });
    products = [
      {name: 'Instant_noodles', unit: 'bag', category: '1', price: 1},
      {name: 'apple', unit: 'kg', category: '1', price: 2.5}
    ];
  });

  it('should loadAllProducts() work  when get() is OK', function () {
    spyOn(localStorageService, 'get').and.returnValue(products);
    var result = productManageService.loadAllProducts();
    expect(result.length).toEqual(2);
    expect(result[1].name).toBe('apple');
  });

  it('should add() work', function () {
    spyOn(localStorageService, 'add');
    productManageService.add(products);
    expect(localStorageService.add.calls.count()).toBe(1);
  });

  it('should getProductByName() work', function () {
    spyOn(localStorageService, 'get').and.returnValue(products);
    var result = productManageService.getProductByName('apple');
    expect(result.price).toBe(2.5);
  });

  it('should getProductByName() work when product not exist', function (){
    spyOn(localStorageService, 'get').and.returnValue(products);
    var result = productManageService.getProductByName('fruit');
    expect(result.length).toBe(undefined);
  });

  it('should insert() work when product is null', function () {
    spyOn(localStorageService, 'get').and.returnValue(products);
    var result = productManageService.insert({});
    expect(result.length).toBe(2);
  });

  it('should insert() work when product not null', function () {
    spyOn(localStorageService, 'get').and.returnValue(products);
    var product = {name: 'banana', unit: 'kg', category: '1', price: 3.5};
    var result = productManageService.insert(product);
    expect(result.length).toBe(3);
  });

  it('should insert() work when product is exist', function () {
    spyOn(localStorageService, 'get').and.returnValue(products);
    var product = {name: 'apple', unit: 'kg', category: '1', price: 3.5};
    var result = productManageService.insert(product);
    expect(result.length).toBe(2);
  });

  it('should updateProduct() work', function () {
    spyOn(localStorageService, 'get').and.returnValue(products);
    var product = {name: 'apple', unit: 'bag', category: '1', price: 3.5};
    var result = productManageService.updateProduct(product);
    expect(result.price).toBe(3.5);
    expect(result.unit).toBe('bag');
  });

});
