//
//  Copyright (C) Microsoft. All rights reserved.    
// 

(function () {
    'use strict';

    angular
        .module('msrcCloudPortal')
        .directive('msrcCvss', CVSScore);

    CVSScore.$inject = [];

    function CVSScore() {
        return {
            restrict: 'AE',
            /*scope :{
                affectedProduct:'='
            },*/ 
            templateUrl: '../app/directives/msrc-cvss.html',
        }
    }
})();