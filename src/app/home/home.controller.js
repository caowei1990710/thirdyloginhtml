(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('HomeController', HomeController);
  /** @ngInject */
  function HomeController($scope, $timeout, bankcard, $rootScope,$state) {
    $(window).scroll(function () {
      var top;
      if (document.body.scrollTop) { //非标准写法,chrome能识别
        top = document.body.scrollTop;
      } else { //标准写法
        top = document.documentElement.scrollTop;
      }
      $scope.$broadcast("to-child", {
        'top': top
      });

    });
  }
})();
