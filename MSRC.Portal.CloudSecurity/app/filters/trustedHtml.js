//
//  Copyright (C) Microsoft. All rights reserved.    
// 

(function () {
    'use strict';

    angular.module('msrcCloudPortal')
        .filter('trustedHtml', trustedHtmlFilter);

    trustedHtmlFilter.$inject = ['$sce'];
       
    function trustedHtmlFilter($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }
}());