//
//  Copyright (C) Microsoft. All rights reserved.    
// 

(function() {
    'use strict';

    angular.module('msrcCloudPortal')
        .factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$rootScope', '$q'];

    function httpInterceptor($rootScope, $q) {
        $rootScope.error = null;

        return {
            responseErrror: responseError
        };
        
        function responseError(error) {
            if (error.status >= 500) {
                $rootScope.error = 'An internal application error has occured.';
            }

            return $q.reject(response);
        }
    }
})();