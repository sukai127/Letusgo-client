'use strict';

describe('Controller: ListCtrl', function () {

  var createController,$controller,$scope,categories,categoryManageService,products;

  beforeEach(function(){
    module('angularLetusgoApp');
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
      {name: 'Instant_noodles', unit: 'bag', category: '1', price: 1},
      {name: 'apple', unit: 'kg', category: '1', price: 2.5}
    ];
    spyOn($scope,'$emit');
  });

  it('should init success', function () {
    spyOn(categoryManageService,'loadAllCategories').andReturn(categories);
    createController();
    expect($scope.categories.length).toBe(2);
    expect($scope.categories[1].id).toBe(2);
    expect($scope.$emit.calls.length).toBe(1);
  });

  it('should add() work', function () {
    spyOn(categoryManageService,'insert');
    createController();
    $scope.add();
    expect(categoryManageService.insert.calls.length).toBe(1);
  });

  it('should $watch() work', function () {
    spyOn(categoryManageService,'add');
    createController();
    $scope.categories = [];
    $scope.$apply();
    expect(categoryManageService.add.calls.length).toBe(1);
  });
  it('should remove() work', function () {
    createController();
    $scope.remove(1);
    expect($scope.categories.length).toBe(1);
  });
  it('should couldDelete() work', function () {
    spyOn(categoryManageService,'isIncludeProduct').andReturn(true);
    createController();
    var result = $scope.couldDelete(1);
    expect(result).toBe(false);
  });

  it('should updateCategory() work', function () {
    var category = {id : 2, name: 'device'};
    spyOn(categoryManageService,'updateCategory');
    createController();
    $scope.updateCategory(category);
    expect(categoryManageService.updateCategory.calls.length).toBe(1);
  });
});
