(function () {
    "use strict";

    angular
        .module("CoverLetterApp")
        .factory("coverLetterService", coverLetterService);

    coverLetterService.$inject = ["$http"];

    function coverLetterService($http) {
        var service = {
            getJobData: _getJobData
        };

        return service;

        ///////////

        function _getJobData(jobInfo) {
            var settings = {
                method: "POST"
                , params: jobInfo
                , url: "/api/coverletter"
            };
            return $http(settings);
        }
    }
})();