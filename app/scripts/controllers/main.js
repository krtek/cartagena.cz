'use strict';

/**
 * @ngdoc function
 * @name cartagenaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cartagenaApp
 */
angular.module('cartagenaApp')
  .controller('MainCtrl', function($scope, $timeout) {
    moment.locale('cs');

    var tick = function() {
      var departure = moment("201611100310", "YYYYMMDDHHmm");
      var now = moment();

      if (departure.isBefore(now)) {
        $scope.display = false;
        return;
      }

      $scope.display = true;

      $scope.days = departure.diff(now, 'days');
      now.add($scope.days, 'days');
      $scope.hours = departure.diff(now, 'hours');

      if ($scope.hours < 10) {
        $scope.hours = '0' + $scope.hours;
      }
      now.add($scope.hours, 'hours');
      $scope.minutes = departure.diff(now, 'minutes');

      if ($scope.minutes < 10) {
        $scope.minutes = '0' + $scope.minutes;
      }
      now.add($scope.minutes, 'minutes');

      $scope.seconds = departure.diff(now, 'seconds');
      if ($scope.seconds < 10) {
        $scope.seconds = '0' + $scope.seconds;
      }
      now.add($scope.seconds, 'seconds');

      $scope.millis = departure.diff(now, 'millis');

      //Leftpad millis
      if ($scope.millis < 100) {
        $scope.millis = '0' + $scope.millis;
      }
      if ($scope.millis < 10) {
        $scope.millis = '00' + $scope.millis;
      }
      if ($scope.millis === 0) {
        $scope.millis = '000';
      }

      $timeout(tick, 100);
    };

    tick();
  });

angular.module('cartagenaApp')
  .controller('FooterCtrl', function($scope, $rootScope) {
    $scope.next = function() {
      $rootScope.$broadcast('next');
    };
  });
