'use strict';

describe('Service: categoryService', function () {

    var $httpBackend,categoryService,categories,products;
    beforeEach(function(){
        module('letusgo');
        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            categoryService = $injector.get('CategoryService');
        });
        categories = [
          {id : 1, name: 'grocery'},
          {id : 2, name: 'device'}
        ];
        products = [
          {id : 1, name: 'Instant_noodles', unit: 'bag', categoryId: 1, price: 1},
          {id : 2, name: 'apple', unit: 'kg', categoryId: 1, price: 2.5}
        ];
    });

    it('should isIncludeProduct() worked', function () {

      $httpBackend.expectGET('/api/products').respond(200,products);
      categoryService.isIncludeProduct(1,function(data){
        expect(data.name).toBe('Instant_noodles');
      });
      $httpBackend.flush();
    });
//
//    it('should add() work', function () {
//      spyOn(localStorageService,'add');
//      categoryManageService.add(categories);
//      expect(localStorageService.add.calls.count()).toBe(1);
//    });
//
//    it('should insert() work', function () {
//      spyOn(categoryManageService,'loadAllCategories').and.returnValue(categories);
//      var result = categoryManageService.insert('device');
//      expect(result.length).toBe(2);
//      result = categoryManageService.insert('');
//      expect(result.length).toBe(2);
//      result = categoryManageService.insert('node');
//      expect(result.length).toBe(3);
//    });
//
//    it('should getCategoryById() work', function () {
//      spyOn(categoryManageService,'loadAllCategories').and.returnValue(categories);
//      var result = categoryManageService.getCategoryById(2);
//      expect(result.name).toBe('device');
//    });
//
//    it('should updateCategory() work', function () {
//      spyOn(localStorageService, 'get').and.returnValue(categories);
//      var category = {id : 1, name: 'grocery123'};
//      var result = categoryManageService.updateCategory(category);
//      expect(result.name).toBe('grocery123');
//    });
//
//    it('should isIncludeProduct() work', function () {
//      spyOn(localStorageService,'get').and.returnValue(products);
//      var result = categoryManageService.isIncludeProduct(1);
//      expect(result).toBe(true);
//      result = categoryManageService.isIncludeProduct(3);
//      expect(result).toBe(false);
//    });

});
