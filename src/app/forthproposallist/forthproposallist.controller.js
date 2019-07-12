(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('forthproposallistController', forthproposallistController);

  /** @ngInject */
  function forthproposallistController($scope, $rootScope, httpRequest, $stateParams, $state) {
    var vm = this;
    vm.setContent = function (data) {
      vm.DepositList = data.data;
      console.log("data:" + data);
    }
    vm.getList = function (data) {
      httpRequest.get("getPlatformDepositList", vm.setContent)
    }
    vm.getContent = function (data) {
      alertify.success(data.msg)
    }
    vm.rebuild = function (index) {
      httpRequest.get("platformDepositRetry?orderno=" + vm.DepositList[index].orderno, vm.getContent)
    }
    vm.getList();
  }
})();
