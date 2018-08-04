(function () {
    "use strict";

    angular
        .module("CoverLetterApp")
        .controller("letterController", letterController);

    letterController.$inject = ["coverLetterService", "$scope"];

    function letterController(coverLetterService, $scope) {
        var vm = this;
        var counter = 1;
        vm.data = {};
        vm.btnUrl = _btnUrl;
        vm.jobInfo = [];
        vm.btnScroll = _btnScroll;
        vm.tagRemoved = _tagRemoved;
        vm.btnResubmit = _resubmit;
        vm.dataLoading = {
            message: "",
            load: false
        };
        
        ///////////////

        function _btnScroll() {
            var position = $(".step").offset().top;
            $("html, body").animate({ "scrollTop": position }, 1000);
        }

        function _tagRemoved(tag) {
            if (typeof vm.formInfo === 'undefined') {
                console.log('consumed');
            } else {
                for (var key in vm.formInfo.exp) {
                    if (tag.text == key) {
                        delete vm.formInfo.exp[key];
                    }
                }
            }

        }

        function _resubmit(data) {
            vm.dataLoading = {
                message: "loading...",
                load: false,
                resub: true
            };

            // increase counter
            counter++

            // create link
            var url = document.createElement('a');
            url.href = data.url;

            // gather pieces
            var search = url.search;
            var origin = url.origin;
            var pathname = url.pathname;

            // generate search query
            var searchString = generateSearchString(search);

            // get new url
            var newUrl = gnerateNewUrl(origin, pathname, searchString, counter);

            // create object
            var obj = {
                url: newUrl
            }
            // send url to service
            coverLetterService.getJobData(obj)
                .then(_btnUrlSuccess, _btnUrlError);
        }

        function generateSearchString(url) {
            var newSearch = url.replace(/[=&]/g, '-')
                .replace(/[+]/g, '_')
                .replace(/[?]/g, '');
            return newSearch;
        }

        function gnerateNewUrl(origin, pathname, searchString, counter) {
            var createUrl = origin + pathname + '/' + searchString + "-radius-30-startPage-" + counter + "-jobs";
            return createUrl;
        }


        function _btnUrl(url) {
            var patt = new RegExp("https://www.dice.com/");
            var res = patt.test(url.url);

            // reuse this submit for re-submit
            // check if vm.formInfo is undefined, then check if vm.formInfo.exp is undefined
            // set vm.forminfo.exp to undefined if not found
            //console.log(vm.formInfo);

            if (res) {
                vm.dataLoading = {
                    message: "loading...",
                    load: true,
                    resub: false
                };

                coverLetterService.getJobData(url)
                    .then(_btnUrlSuccess, _btnUrlError);
            } else {
                vm.dataLoading = {
                    message: "Invalid Url. Try again. Hint: Check if it's an Dice.com Url",
                    load: true
                };
            }
        }

        //vm.formInfo.exp = undefined;

        function _btnUrlSuccess(response) {
            vm.dataLoading.load = false;
            vm.dataLoading.resub = false;

            var index = response.data;
            
            if (response.status === 204) {
                vm.dataLoading = {
                    message: "Unfortunately, that Url did not produce suitable results. Try another Url search.",
                    load: true
                };
                return;
            } else if (angular.isDefined(vm.formInfo.exp)) {
                // matching key words with response
                for (var key in vm.formInfo.exp) {
                    for (var i = 0; i < index.length; i++) {
                        for (var k = 0; k < index[i].qualInfo.quals.length; k++) {
                            if (String(index[i].qualInfo.quals[k]).toLowerCase().match(key, 'g')) {
                                var match = {
                                    keyword: key,
                                    mywork: vm.formInfo.exp[key],
                                    theirwork: index[i].qualInfo.quals[k]
                                };
                                index[i].qualInfo.matches.push(match);
                            }
                        }
                    }
                }

                // pushing matched objects to jobInfo array
                for (var i = 0; i < index.length; i++) {
                    vm.jobInfo.push(index[i]);
                }
                //console.log(vm.jobInfo);
            } else  {
                console.log('testing mode');
            }
        }

        function _btnUrlError(e) {
            // 500 expected
            console.log(e);

            vm.dataLoading = {
                message: "It's not you, it's me! There's an error on my side. Let me work on that. Please come back soon and try again.",
                load: true
            };
        }
    }
})();

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

(function () {
    "use strict";
    angular
        .module("CoverLetterApp")
        .filter('newLines', function () {
            return function (text) {
                return text.replace(/\n/g, '<br/>');
            }
        }
    );
})();