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
                , url: "http://localhost:50023/api/coverletter/job"
            };
            return $http(settings)
                .then(null, _getJobDataError);
        }

        function _getJobDataError(error) {
            return $q.reject(error);
        }
    }
})();