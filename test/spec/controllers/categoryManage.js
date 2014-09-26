'use strict';

describe('Controller: ListCtrl', function () {

  var createController,$controller,$scope,categories,categoryManageService,products;

  beforeEach(function(){
    module('letusgo');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $controller = $injector.get('$controller');
      categoryManageService = $injector.get('CategoryManageService');
    });

    createController = function(){
      return $controller('CategoryManageCtrl', {
        $scope: $scope,
        CategoryManageService: categoryManageService
      });
    };
    categories = [
      {id : 1, name: 'grocery'},
      {id : 2, name: 'device'}
    ];
    products = [
      {name: 'Instant_noodles', unit: 'bag', categoryId: '1', price: 1},
      {name: 'apple', unit: 'kg', categoryId: '1', price: 2.5}
    ];
    spyOn($scope,'$emit');
  });

  it('should init success', function () {
    spyOn(categoryManageService,'loadAllCategories').and.callFake(function(callback){
      callback(categories);
    });
    createController();
    categoryManageService.loadAllCategories(function(data){
      $scope.categories = data;
      expect($scope.categories.length).toBe(2);
      expect($scope.categories[1].id).toBe(2);
      expect($scope.$emit.calls.count()).toBe(1);
    });
  });

  it('should add() work', function () {
    spyOn(categoryManageService,'insert');
    createController();
    $scope.add();
    expect(categoryManageService.insert.calls.count()).toBe(1);
  });

  xit('should $watch() work', function () {
    spyOn(categoryManageService,'add');
    createController();
    $scope.categories = [];
    $scope.$apply();
    expect(categoryManageService.add.calls.count()).toBe(1);
  });
  xit('should remove() work', function () {
    createController();
    $scope.remove(1);
    expect($scope.categories.length).toBe(1);
  });
  xit('should couldDelete() work', function () {
    spyOn(categoryManageService,'isIncludeProduct').and.returnValue(true);
    createController();
    var result = $scope.couldDelete(1);
    expect(result).toBe(false);
  });

  xit('should updateCategory() work', function () {
    var category = {id : 2, name: 'device'};
    spyOn(categoryManageService,'updateCategory');
    createController();
    $scope.updateCategory(category);
    expect(categoryManageService.updateCategory.calls.count()).toBe(1);
  });
});
