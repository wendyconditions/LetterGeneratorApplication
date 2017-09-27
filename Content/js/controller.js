(function () {
    "use strict";

    angular
        .module("CoverLetterApp")
        .controller("letterController", letterController);

    letterController.$inject = ["coverLetterService"];

    function letterController(coverLetterService) {
        var vm = this;
        //vm.$onInit = _init;
        vm.data = {};
        vm.otherInfo = [];
        vm.btnUrl = _btnUrl;

        ///////////////

        function _btnUrl(url) {
            coverLetterService.getJobData(url).then(_btnUrlSuccess, _btnUrlError);
            vm.data = {};
        }

        vm.jobInfo = [];

        function _btnUrlSuccess(response) {

            for (var i = 0; i < response.data.job.length; i++) {
                var jobData = {
                    title: response.data.job[i].title
                    , company: response.data.job[i].company
                    , quals: response.data.job[i].quals
                };
               vm.jobInfo.push(jobData);
            }
            console.log(vm.jobInfo);
        }

        function _btnUrlError() {
            console.log("api error");
        }
    }

})();