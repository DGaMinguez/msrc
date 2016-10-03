//
//  Copyright (C) Microsoft. All rights reserved.    
// 

(function () {
    'use strict';

    angular.module('msrcCloudPortal').directive('msrcLoadingSpinner', function () {
        return {
            restrict: 'A',
            replace: false,
            transclude: true,
            scope: {
                loading: '=msrcLoadingSpinner'
            },
            templateUrl: '../app/directives/msrc-loading-spinner.html'
        };
    });
}());