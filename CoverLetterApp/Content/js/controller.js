(function () {
    "use strict";

    angular
        .module("CoverLetterApp")
        .controller("letterController", letterController);

    letterController.$inject = ["coverLetterService", "$scope"];

    function letterController(coverLetterService, $scope) {
        var vm = this;
        vm.data = {};
        vm.btnUrl = _btnUrl;
        vm.jobInfo = [];
        vm.tagRemoved = _tagRemoved;
        vm.btnResubmit = _resubmit;

        vm.dataLoading = {
            message: "",
            load: false
        };

        ///////////////

        function _tagRemoved(tag) {
            for (var key in vm.formInfo.exp) {
                if (tag.text == key) {
                    delete vm.formInfo.exp[key];
                }
            }

        }

        var counter = 0;

        function _resubmit(url) {
            counter = counter + 30;

            var nextPageUrl = {
                url: url.url + "&start=" + counter
            }

            coverLetterService.getJobData(nextPageUrl)
                .then(_btnUrlSuccess, _btnUrlError);
        }

        function _btnUrl(url) {
            var patt = new RegExp("https://www.indeed.com/");
            var res = patt.test(url.url);

            if (res) {
                vm.dataLoading = {
                    message: "loading...",
                    load: true
                };

                coverLetterService.getJobData(url)
                    .then(_btnUrlSuccess, _btnUrlError);

                //vm.data = {}; // reset form
            } else {
                vm.dataLoading = {
                    message: "Invalid Url. Try again. Hint: Check if it's an Indeed.com Url",
                    load: true
                };
            }
        }


        //It's not you, it's me! There's an error on my side. Let me work on that. Please come back soon and try again.", //error when program throws an error object reference, error on MY part, not the user
        function _btnUrlSuccess(response) {
            vm.dataLoading.load = false;
            var index = response.data.job;

            if (response.status === 204) {
                vm.dataLoading = {
                    message: "Unfortunately, that Url did not produce suitable results. Try another Url search.",
                    load: true
                };
                return;
            } else {
                for (var i = 0; i < index.length; i++) {
                    vm.jobInfo.push(index[i]);
                }
                //for (var i = 0; i < vm.jobInfo.length; i++) {
                //    console.log(vm.jobInfo[i].qualInfo);
                //    for (var k = 0; k < vm.jobInfo[i].qualInfo.quals.length; k++) {
                //        console.log(vm.jobInfo[i].qualInfo.quals[k]);
                //        // put string through matching
                //        for (var key in vm.formInfo.exp) {
                //            console.log(key);
                //            if (vm.jobInfo[i].qualInfo.quals[k].match(/key/, 'g')) {
                //                var match = {
                //                    keyword: key,
                //                    mywork: vm.formInfo.exp[key],
                //                    theirwork: vm.jobInfo[i].qualInfo.quals[k]
                //                };
                //                vm.jobInfo[i].qualInfo.matches.push(match);
                //            }
                //        }
                //    }
                //}

                //String(obj.quals[i].qual).toLowerCase().match(keyword, 'g')

                for (var key in vm.formInfo.exp) {
                    for (var i = 0; i < vm.jobInfo.length; i++) {
                        for (var k = 0; k < vm.jobInfo[i].qualInfo.quals.length; k++) {
                            if (String(vm.jobInfo[i].qualInfo.quals[k]).toLowerCase().match(key, 'g')) {
                                var match = {
                                    keyword: key,
                                    mywork: vm.formInfo.exp[key],
                                    theirwork: vm.jobInfo[i].qualInfo.quals[k]
                                };
                                vm.jobInfo[i].qualInfo.matches.push(match);
                            }
                        }
                    }
                }
                console.log(vm.jobInfo);
            }
        }

        function _btnUrlError() {
            // Need to handle this error properly, alert service 
            console.log("Error");

            vm.dataLoading = {
                message: "Error occurred! Check the URL and try again.",
                load: true
            };
        }
    }
})();

//(function () {
//    "use strict";
//    angular.module("CoverLetterApp")
//        .controller("experienceController", experienceController);

//    experienceController.$inject = ["coverLetterService", "$scope"];

//    function experienceController(coverLetterService, $scope) {
//        var ec = this;
//        ec.experience = { fields: [] };

//        ec.addToArr = _add;
//        //ec.experience = []; 

//        $scope.vm.cities = ec.experience;

//        function _add(message) {
//            ec.experience.push(message);
//        }

//    }
//})();

(function () {
    "use strict";
    angular.module("CoverLetterApp")
        .directive("bwInitTagsInput", bwInitTagsInput);

    bwInitTagsInput.$inject = ['$timeout'];

    function bwInitTagsInput($timeout) {
        return {
            restrict: "A",
        }
    }
})();