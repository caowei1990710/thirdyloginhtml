(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('forthmerchatlistController', forthmerchatlistController);

  /** @ngInject */
  function forthmerchatlistController($scope, $rootScope, httpRequest, $stateParams, $state) {
    var vm = this;
    var itemindex;
    vm.setContent = function (data) {
      vm.DepositList = data.data;
      console.log("data:" + data);
    }
    vm.getList = function (data) {
      httpRequest.get("depositlist", vm.setContent)
    }
    vm.rebuild = function (index) {
      itemindex = index;
      pormptresult = alertify.prompt("请输入会员账号", vm.sendHttp);
      // httpRequest.put()qi
      // httpRequest.put("updatebank",{"id":vm.DepositList[index].id,"userName":vm.DepositList[index].userName,"payAccount":vm.DepositList[index].payAccount},vm.setContent)
    }
    vm.resend = function (index) {
      httpRequest.get("depositresend?depositid=" + vm.DepositList[index].depositNumber);
    }
    vm.sendHttp = function (data, msg) {
      if (data)
        httpRequest.put("updatebank", {"id": vm.DepositList[itemindex].id, "userName": msg}, vm.setContent)
    }
    vm.matchresult = function(data){
      alertify.success(data.msg);
      vm.getList();
    }
    vm.rematch = function (index) {
      httpRequest.get("toMatch?depositNumber=" + vm.DepositList[index].depositNumber,vm.matchresult)
    }
    vm.getList();
    // vm.login = function(){
    //   alert("123");
    // }
  }
})
();
