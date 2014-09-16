'use strict';

angular.module('letusgo')
  .controller('MainCtrl', function ($scope,MainService) {
    $scope.$emit('highLightActive','index');
    MainService.init();
  });
