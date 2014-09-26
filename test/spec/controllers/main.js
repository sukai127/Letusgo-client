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

  it('should active_index equal true', function () {
    spyOn($scope,'$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalled();
  });
});
