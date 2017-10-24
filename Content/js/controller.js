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
        ///////////////

        function _btnUrl(url) {
            coverLetterService.getJobData(url).then(_btnUrlSuccess, _btnUrlError);
            vm.data = {};
        }

        vm.jobInfo = [];

        function _btnUrlSuccess(response) {
            var allQualIndex = response.data.job[0].quals;
            var obj = {
                company: response.data.job[0].company,
                title: response.data.job[0].title,
                quals: []
            };

            for (var k = 0; k < allQualIndex.length; k++) {
                var qualifications = {
                    qual: allQualIndex[k],
                    match: []
                };
                obj.quals.push(qualifications);
            }


            for (var i = 0; i < obj.quals.length; i++) {
                var sass = "I am good at Sass";
                var html = "10+ years of HTML5 and CSS3 experience";
                var angular = "Equivalent of 2 years professional experience in AngularJS";
                var sql = "Equivalent of 2 years professional T-SQL experience using Microsoft SQL Server/ Studio Mangement";
                var css = "My css is excellent";
                if (String(obj.quals[i].qual).match(/SASS/, 'g')) {
                    obj.quals[i].match = sass;
                } else if (String(obj.quals[i].qual).toLowerCase().match(/html/, 'g')) {
                    obj.quals[i].match = html;
                } else if (String(obj.quals[i].qual).toLowerCase().match(/angular/, 'g')) {
                    obj.quals[i].match = angular;
                } else if (String(obj.quals[i].qual).toLowerCase().match(/CSS/, 'g')) {
                    obj.quals[i].match = css;
                } else if (String(obj.quals[i].qual).toLowerCase().match(/sql/, 'g')) {
                    obj.quals[i].match = sql;
                } else {
                    obj.quals[i].match = null;
                }
            }

            vm.jobInfo.push(obj);
            console.log(vm.jobInfo);
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