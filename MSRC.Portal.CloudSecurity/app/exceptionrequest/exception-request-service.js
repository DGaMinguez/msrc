//
//  Copyright (C) Microsoft. All rights reserved.    
// 

(function () {
    'use strict';

    angular.module('msrcCloudPortal')
        .factory('exceptionRequestService', ['$http', '$localStorage', '$state', 'adalAuthenticationService', exceptionRequestService]);

    exceptionRequestService.$inject = ['storageService'];

    function exceptionRequestService($http, $localStorage, $state, adalAuthenticationService) {
        $http.defaults.headers.post['Content-Type'] = 'application/json';
        $http.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

        var exceptionRequestApiBaseUrl = 'api/exception-request/';

        return {
            getUserExceptionRequests: getUserExceptionRequests,
            createNewRequest: createNewRequest
        };

        function ErrorResponse(stateName, NoContentFoundCallback) {
            return function (response) {
                console.log('401 error response code : ' + response.status);
                if (response.status === 401) {
                    var toState = $state.get(stateName);
                    toState.hasTransitionStateParams = !!toState.saveTransitionStateParams;
                    $localStorage.transitionToState = toState;
                    adalAuthenticationService.login();
                } else if (response.status === 404) { // no content found
                    // NoContentFoundCallback();
                } else {
                    console.log(response);
                }
            }
        }

        function getUserExceptionRequests() {
            return $http.get(exceptionRequestApiBaseUrl + '/requests')
                .then(
                    function (response) {
                        return response.data;
                    },
                    new ErrorResponse('app.exceptionrequest'));
        }

        function createNewRequest(formPayload) {
            return $http(
                {
                    method: 'PUT',
                    url: exceptionRequestApiBaseUrl + '/request',
                    data: JSON.stringify(formPayload)
                })
                .then(
                    function (response) {
                        return response.data;
                    },
                    new ErrorResponse('app.exceptionrequest'));
        }
    }
})();
