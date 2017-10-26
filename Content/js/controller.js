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
        vm.formInfo = null;
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
                    qual: allQualIndex[k],
                    match: []
                };
                obj.quals.push(qualifications);
            }

            var sass = "I am good at Sass";
            var html = "Experience developing in HTML, CSS, and JavaScript, specifically jQuery libraries";
            var angular = "Equivalent of 2 years professional experience in AngularJS";
            var sql = "Equivalent of 2 years professional T-SQL experience using Microsoft SQL Server/ Studio Mangement";
            var css = "My css is excellent";
            var js = "Fluent in JavaScript, ES5, ES6";
            var slack = "Created custom slack bots";
            var git = "Used GitHub and Git for version control on most projects";
            var jquery = "2+ years experience with javascript libraries";

            // Work in progress, successfully matched form data to query, next will be to add multiple, using a for loop
            // and possible recursion. Then I will delete anything that is hard coded. wooo!

            var keyword = vm.formInfo.tags;
            var experience = vm.formInfo.exp;
            

            for (var i = 0; i < obj.quals.length; i++) {
                if (String(obj.quals[i].qual).match(/SASS/, 'g')) {
                    obj.quals[i].match = sass;
                } else if (String(obj.quals[i].qual).toLowerCase().match(keyword, 'g')) {
                    obj.quals[i].match = experience;
                } else if (String(obj.quals[i].qual).toLowerCase().match(/angular/, 'g')) {
                    obj.quals[i].match = angular;
                } else if (String(obj.quals[i].qual).toLowerCase().match(/css/, 'g')) {
                    obj.quals[i].match = css;
                } else if (String(obj.quals[i].qual).toLowerCase().match(/sql/, 'g')) {
                    obj.quals[i].match = sql;
                } else if (String(obj.quals[i].qual).toLowerCase().match(/javascript/, 'g')) {
                    obj.quals[i].match = js;
                } else if (String(obj.quals[i].qual).toLowerCase().match(/slack/, 'g')) {
                    obj.quals[i].match = slack;
                } else if (String(obj.quals[i].qual).toLowerCase().match(/git/, 'g')) {
                    obj.quals[i].match = git;
                } else {
                    obj.quals[i].match = null;
                }
            }
            vm.jobInfo.push(obj);
            console.log(vm.jobInfo);
        }

        function _btnUrlError() {
            // Need to handle this error properly, alert service 
            console.log("Error");
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