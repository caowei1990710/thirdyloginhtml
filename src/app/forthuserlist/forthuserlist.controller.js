(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('forthuserlistController', forthuserlistController);

  /** @ngInject */
  function forthuserlistController($scope,$rootScope, httpRequest, $stateParams, $state) {
    var vm = this;
    vm.setContent = function (data) {
      vm.DepositList = data.data;
      console.log("data:" + data);
    }
    vm.getList = function (data) {
      httpRequest.get("getbanklist", vm.setContent)
    }
    vm.getList();
  }
})();
