'use strict';

describe('Service: ProductService', function () {

    var localStorageService,categoryManageService,categories,products;
    beforeEach(function(){
        module('angularLetusgoApp');
        inject(function ($injector) {
            localStorageService = $injector.get('localStorageService');
            categoryManageService = $injector.get('CategoryManageService');
        });
        categories = [
          {id : 1, name: 'grocery'},
          {id : 2, name: 'device'}
        ];
        products = [
          {name: 'Instant_noodles', unit: 'bag', category: '1', price: 1},
          {name: 'apple', unit: 'kg', category: '1', price: 2.5}
        ];
    });

    it('should loadAllCategories() work  when get() is OK', function () {
        spyOn(localStorageService,'get').and.returnValue(categories);
        var result = categoryManageService.loadAllCategories();
        expect(result.length).toEqual(2);
        expect(result[1].name).toBe('device');
    });
    it('should loadAllCategories() work with get() return null', function () {
      spyOn(localStorageService,'get').and.returnValue(null);
      spyOn(localStorageService,'add');
      var result = categoryManageService.loadAllCategories();
      expect(localStorageService.add.calls.count()).toBe(1);
      expect(result[1].name).toBe('device');
    });
    it('should add() work', function () {
      spyOn(localStorageService,'add');
      categoryManageService.add(categories);
      expect(localStorageService.add.calls.count()).toBe(1);
    });

    it('should insert() work', function () {
      spyOn(categoryManageService,'loadAllCategories').and.returnValue(categories);
      var result = categoryManageService.insert('device');
      expect(result.length).toBe(2);
      result = categoryManageService.insert('');
      expect(result.length).toBe(2);
      result = categoryManageService.insert('node');
      expect(result.length).toBe(3);
    });

    it('should getCategoryById() work', function () {
      spyOn(categoryManageService,'loadAllCategories').and.returnValue(categories);
      var result = categoryManageService.getCategoryById(2);
      expect(result.name).toBe('device');
    });

    it('should updateCategory() work', function () {
      spyOn(localStorageService, 'get').and.returnValue(categories);
      var category = {id : 1, name: 'grocery123'};
      var result = categoryManageService.updateCategory(category);
      expect(result.name).toBe('grocery123');
    });

    it('should isIncludeProduct() work', function () {
      spyOn(localStorageService,'get').and.returnValue(products);
      var result = categoryManageService.isIncludeProduct(1);
      expect(result).toBe(true);
      result = categoryManageService.isIncludeProduct(3);
      expect(result).toBe(false);
    });

});
