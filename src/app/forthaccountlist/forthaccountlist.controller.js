(function () {
  'use strict';

  angular
    .module('pmsJs')
    .controller('forthaccountlistController', forthaccountlistController);
  /** @ngInject */
  function forthaccountlistController($scope, $timeout, httpRequest, $rootScope, $state, loc_language_cn, getDefault, $filter, jQ) {
    var vm = this;
    vm.notice = {"title": "ads", "content": "因业务需求，入款卡已更新为济南瓦维商贸有限公司，请您认清最新入款卡进行充值，感谢您的配合。华彩祝您生活愉快，盈利多多。"};
    vm.bankList = [{
      "id": "123",
      "bankcard": "15153201040004896",
      "bankname": "济南瓦维商贸有限公司",
      "bankaddress": "济南市文苑支行",
      "bankType": "农业银行",
      "state": "NORMAL"
    }, {
      "id": "123",
      "bankcard": "44050158051100001542",
      "bankname": "广州琪其贸易部",
      "bankaddress": "广州南国花园支行",
      "bankType": "建设银行",
      "state": "NORMAL"
    }]
    vm.editBank = function (index) {
      vm.bankindex = index;
      vm.editBankForm = vm.bankList[index];
    }
    vm.update = function () {
      jQ('#editBankitem').modal('show');
    }
    vm.updatead = function () {
      // alert(vm.content);
      httpRequest.post("postNotice", vm.notice, vm.updateresult);
    }
    vm.updateresult = function (data) {
      console.log("data:" + data);
    }
    vm.getAds = function () {
      httpRequest.get("getNotice?title=ads", vm.setContent);
    }
    vm.setContent = function (data) {
      //data.data.content
      vm.notice.content = data.data.content;
      console.log("adsdata:" + data);
    }
    vm.result = function (data) {
      alertify.success("修改成功");
      jQ('#editBankitem').modal('hide');
      // vm.bankList = data.data;
      console.log("data:" + data);
      vm.getList();
    }
    vm.resultlist = function (data) {
      // alertify.success("查询成功");
      // jQ('#editBankitem').modal('hide');
      vm.bankList = data.data;
      console.log("data:" + data);
    }
    vm.updateitem = function () {
      // vm.editBankForm = {
      vm.editBankFormitem = {
        "id": vm.editBankForm.id,
        "bankcard": vm.editBankForm.bankcard,
        "bankname": vm.editBankForm.bankname,
        "bankaddress": vm.editBankForm.bankaddress,
        "bankType": vm.editBankForm.bankType,
        "state": vm.editBankForm.state
      };
      // alert("修改完成");
      httpRequest.post("updatebankitem", vm.editBankFormitem, vm.result);
    }
    vm.getList = function () {
      httpRequest.get("getbankitem", vm.resultlist)
    }
    vm.getList();
    vm.getAds();
  }
})();
