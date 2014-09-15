'use strict';

angular.module('angularLetusgoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.$emit('highLightActive','index');
  });
