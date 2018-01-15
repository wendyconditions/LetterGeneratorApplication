(function () {
    "use strict";

    angular
        .module("CoverLetterApp")
        .factory("coverLetterService", coverLetterService);

    coverLetterService.$inject = ["$http", "$q"];

    function coverLetterService($http, $q) {
        var service = {
            getJobData: _getJobData
        };

        return service;

        ///////////

        function _getJobData(jobInfo) {
            var settings = {
                method: "POST"
                , data: jobInfo
                , url: "/api/coverletter/job"
            };
            return $http(settings)
                .then(null, _getJobDataError);
        }

        function _getJobDataError(error) {
            return $q.reject(error);
        }
    }
})();

//(function () {
//    "use strict";

//    angular
//        .module("CoverLetterApp")
//        .factory("myService", myService);

//    function myService() {
//        var obj = {};

//        obj.arr = [];

//        obj.add = function (message) { //message is coming from the child controller
//            obj.arr.push({ id: obj.arr.length, exp: message });
//        };

//        return obj;
//    }
//})();