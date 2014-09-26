'use strict';

describe('Controller: ListCtrl', function () {

  var createController,$controller,$scope,categories,categoryManageService,products,$routeParams;

  beforeEach(function(){
    module('letusgo');
    inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $controller = $injector.get('$controller');
      categoryManageService = $injector.get('CategoryManageService');
      $routeParams = $injector.get('$routeParams');
    });

    createController = function(){
      return $controller('CategoryManageCtrl', {
        $scope: $scope,
        CategoryManageService: categoryManageService,
        $routeParams: $routeParams
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
    spyOn(categoryManageService,'loadAllCategories').and.callFake(function(callback){
      callback(categories);
    });
  });

  it('should init success', function () {
    $routeParams.id = 1;
    createController();
    categoryManageService.loadAllCategories(function(data){
      $scope.categories = data;
      expect($scope.categories.length).toBe(2);
      expect($scope.category.name).toBe('grocery');
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

  it('should remove() work', function () {
    spyOn(categoryManageService,'delete');
    createController();
    $scope.remove(1);
    expect(categoryManageService.delete.calls.count()).toBe(1);
    expect($scope.categories.length).toBe(1);
  });

  it('should updateCategory() work', function () {
    var category = {id : 2, name: 'device'};
    spyOn(categoryManageService,'updateCategory');
    createController();
    $scope.updateCategory(category);
    expect(categoryManageService.updateCategory.calls.count()).toBe(1);
  });
});
