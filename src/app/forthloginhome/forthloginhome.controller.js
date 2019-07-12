(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('forthloginHomeController', forthloginHomeController);
  /** @ngInject */
  function forthloginHomeController($scope, $timeout, httpRequest, $rootScope, $state, loc_language_cn, getDefault, $filter) {
    var vm = this;
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
    vm.logout = function () {
      $state.go("forthlogin");
    }
    $rootScope.lagconfig = loc_language_cn;
    getDefault.getAllstrong();
    // alert($rootScope.user.userName);
    vm.changtabs = [{"text": "账号管理", "link": "forthloginhome.forthaccount"}, {
      "text": "记录查询",
      "link": "forthloginhome.merchatlist"
    },{
      "text": "提案列表",
      "link": "forthloginhome.forthproposallist"
    }];
    if($rootScope.user.userName=="dierfang05"){
      vm.changtabs = [{"text": "账号管理", "link": "forthloginhome.forthaccount"}, {
        "text": "记录查询",
        "link": "forthloginhome.merchatlist"
      },{
        "text": "用户列表",
        "link": "forthloginhome.forthuserlist"
      },{
        "text": "提案列表",
        "link": "forthloginhome.forthproposallist"
      }];
    }

    vm.selected = vm.changtabs[0];
    vm.changTab = function (index) {
      vm.selected = vm.changtabs[index];
      $('title').text(vm.selected.text);
      $state.go(vm.selected.link)
    }
  }
})();
