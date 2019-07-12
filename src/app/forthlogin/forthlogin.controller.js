(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('forthLoginController', forthLoginController);

  /** @ngInject */
  function forthLoginController($scope, $rootScope, httpRequest, $stateParams, $state) {
    var vm = this;
    var secret = "";
    vm.login = function (data) {
      httpRequest.post("login", vm.user, vm.goto);
      // alert("123");otpauth://totp/dierfang03?secret=UP7TP6U57KEUZ76G
    }
    vm.gotolist = function (data) {
      if (data.code == 200)
        $state.go('forthloginhome.forthaccount');
      else
        alertify.error(data.msg)
    }
    vm.create = function (data, msg) {
      if (data) {
        httpRequest.get("getAuthictor?code=" + msg + "&secret=UP7TP6U57KEUZ76G",vm.gotolist)
      }
    }
    vm.goto = function (data) {
      if (!data.data) {
        alertify.error("用户名或者密码错误");
        return
      }
      console.log("data:" + data);
      secret = data.data.paySecret;
      if (data.code == 200) {
        // $state.go('forthloginhome.forthaccount');
        $rootScope.user = data.data;
        var pormptresult = alertify.prompt("请输入谷歌验证码", vm.create);
        // alertify.success("登录成功");
      }
      else
        alertify.error(data.msg)
    }
  }
})();
