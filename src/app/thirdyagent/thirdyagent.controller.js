(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('thirdyAgentController', thirdyAgentController);
  /** @ngInject */
  function thirdyAgentController($scope, $timeout, jQ, httpRequest, $rootScope, $filter, $state, loc_language_cn) {
    var vm = this;
    vm.createBankForm = {};
    vm.editBankForm = {};
    vm.thirdyaccount = {};
    vm.createAgentitem = {};
    vm.totalSum = 0;
    vm.sizePerPage = 500;
    vm.page = 1;
    vm.query = {
      "name": "",
      "agentName": "",
      "state": ""
    };
    vm.get = function (page) {
      // var url = "wechat?name=" + (angular.isUndefined(vm.query.name) ? "" : vm.query.name) + "&type=" + (angular.isUndefined(vm.query.type) ? "" : vm.query.type) + "&state=" + (angular.isUndefined(vm.query.state) ? "" : vm.query.state) + "&page=1&size=10"
      var url = "agent?name=" + vm.query.name + "&type&create=&agentName=" + vm.query.agentName + "&state=" + vm.query.state + "&page=" + page + "&size=" + vm.sizePerPage;
      httpRequest.get(url, vm.setDefault)
    }
    vm.setDefault = function (data) {
      vm.bankList = data.data;
      for (var i = 0; i < data.data.length; i++) {
        vm.bankList[i].crateTime = $filter('dateFormate')(vm.bankList[i].crateTime);
        vm.bankList[i].lastLoginTime = $filter('dateFormate')(vm.bankList[i].lastLoginTime);
      }
      vm.totalSum = data.totalnumber;
      $scope.$digest();
    }
    vm.result = function (data) {
      jQ('#createBank').modal('hide');
      alertify.success(data.msg);
    }
    vm.createBankCard = function () {
      httpRequest.post("wechatitem", vm.createBankForm, vm.result);
    }
    vm.updateBankCard = function () {
      jQ('#editBank').modal('hide');
      httpRequest.put("wechatitem", vm.editBankForm, vm.result);
    }
    vm.showeditBank = function () {
      jQ('#editBank').modal('show');
    }
    vm.updateAgent = function (data) {
      jQ('#updatePlatform').modal('hide');
      jQ('#createPlatform').modal('hide');
      if (data.code == 200) {
        alertify.success(data.msg);
      } else
        alertify.error(data.msg);
      vm.get(1);
    }
    vm.createAgent = function () {
      httpRequest.post("agent", vm.createAgentitem, vm.updateAgent)
    }
    vm.editAgentupdate = function () {
      httpRequest.put("agent", vm.editAgent, vm.updateAgent)
    }
    vm.editBank = function (index) {
      vm.bankindex = index;
      vm.editBankForm = angular.copy(vm.bankList[index]);
    }
    vm.showeditAgent = function () {
      vm.editAgent = angular.copy(vm.bankList[vm.bankindex]);
      jQ('#updatePlatform').modal('show');
    }
    //if($rootScope.password == '123456'){
    //  $state.go('home.update');
    //}
    //var vm = this;
    //$('.downloading:eq(0)').css('width',$('.contentdiv').offset().left+'px');
    //$('.downloading:eq(1)').css('width',$('.contentdiv').offset().left+'px');
    //window.onresize = function(){
    //  $('.downloading:eq(0)').css('width',$('.contentdiv').offset().left+'px');
    //  //$('.downloading:eq(0)').css('width',$('.container').css('margin-left'));
    //  $('.downloading:eq(1)').css('width',$('.contentdiv').offset().left+'px');
    //}
  }
})();
