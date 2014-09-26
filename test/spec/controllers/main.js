'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(module('letusgo'));

  var createController,$controller,$scope,mainService;

  beforeEach(inject(function ($injector) {
    $scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');
    mainService = $injector.get('MainService');
    createController = function(){
      return $controller('MainCtrl', {
        $scope: $scope,
        $MainService : mainService
      });
    };
  }));

  it('should init success', function () {
    spyOn($scope,'$emit');
    spyOn(mainService,'init');
    createController();
    expect($scope.$emit).toHaveBeenCalled();
    expect(mainService.init.calls.count()).toBe(1);
  });
});
