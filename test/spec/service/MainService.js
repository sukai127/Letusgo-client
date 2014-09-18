
'use strict';

describe('Service: ProductService', function () {

  var localStorageService, mainService, products,categories;
  beforeEach(function () {
    module('letusgo');
    inject(function ($injector) {
      localStorageService = $injector.get('localStorageService');
      mainService = $injector.get('MainService');
    });
    products = [
      {name: 'Instant_noodles', unit: 'bag', category: '1', price: 1},
      {name: 'apple', unit: 'kg', category: '1', price: 2.5}
    ];
    categories = [
      {id : 1, name: 'grocery'},
      {id : 2, name: 'device'}
    ];
  });

  it('should initProducts() be worked when localStorage not empty', function () {
    spyOn(localStorageService, 'get').and.returnValue(products);
    spyOn(localStorageService,'add');
    mainService.initProducts();
    expect(localStorageService.add.calls.count()).toEqual(0);
  });

  it('should initProducts() be worked when localStorage is empty', function () {
    spyOn(localStorageService, 'get').and.returnValue(null);
    spyOn(localStorageService,'add');
    mainService.initProducts();
    expect(localStorageService.add.calls.count()).toEqual(1);
  });

  it('should initCategories() be worked when localStorage not empty', function () {
    spyOn(localStorageService, 'get').and.returnValue(categories);
    spyOn(localStorageService,'add');
    mainService.initCategories();
    expect(localStorageService.add.calls.count()).toEqual(0);
  });

  it('should initCategories() be worked when localStorage is empty', function () {
    spyOn(localStorageService, 'get').and.returnValue(null);
    spyOn(localStorageService,'add');
    mainService.initCategories();
    expect(localStorageService.add.calls.count()).toEqual(1);
  });

});

