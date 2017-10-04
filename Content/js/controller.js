(function () {
    "use strict";

    angular
        .module("CoverLetterApp")
        .controller("letterController", letterController);

    letterController.$inject = ["coverLetterService"];

    function letterController(coverLetterService) {
        var vm = this;
        vm.data = {};
        vm.btnUrl = _btnUrl;
        vm.jobInfo = [];

        ///////////////

        function _btnUrl(url) {
            coverLetterService.getJobData(url).then(_btnUrlSuccess, _btnUrlError);
            vm.data = {};
        }


        function _btnUrlSuccess(response) {
            var allQualIndex = response.data.job[0].quals; 
            var obj = {
                company: response.data.job[0].company,
                title: response.data.job[0].title,
                quals: []
            };

            for (var k = 0; k < allQualIndex.length; k++) {
                var qualifications = {
                    x: allQualIndex[k],
                    y: []
                };
                obj.quals.push(qualifications);
            }
            console.log(obj);
        }

        // I might need this for later, WIP

        //for (var i = 0; i < response.data.job.length; i++) {
        //    var specs = response.data.job[i].quals;
        //    for (var k = 0; k < specs.length; k++) {
        //        if (String(specs[k]).match(/HTML/, 'g')) {
        //            qualifications.push(specs[k]);
        //        } else if (String(specs[k]).match(/responsive design/, 'g')) {
        //            qualifications.push(specs[k]);
        //        } 
        //    }
        //    console.log(qualifications);
        //}



        function _btnUrlError() {
            // Need to handle this error properly, alert service 
            console.log("Error");
        }
    }
})();