'use strict';

xdescribe('Controller: MainCtrl', function () {

  beforeEach(module('letusgo'));

  var createController,$controller,$scope;

  beforeEach(inject(function ($injector) {
    $scope = $injector.get('$rootScope').$new();
    $controller = $injector.get('$controller');
    createController = function(){
      return $controller('MainCtrl', {
        $scope: $scope
      });
    }
  }));

  it('should active_index equal true', function () {
    spyOn($scope,'$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalled();
  });
});
