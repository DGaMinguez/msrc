//
//  Copyright (C) Microsoft. All rights reserved.    
// 

(function () {
    'use strict';

    angular.module('msrcCloudPortal')
     .controller('exceptionRequestController', exceptionRequestController);

    exceptionRequestController.$inject = ['$rootScope', '$state', '$stateParams', 'exceptionRequestService', 'stateTransitionService', 'loadResourcesService'];
    
    function exceptionRequestController($rootScope, $state, $stateParams, exceptionRequestService, stateTransitionService, loadResourcesService) {
        var vm = this;
        vm.error = null;
        vm.resources = {};
        vm.resourceName = "exceptionrequest";
        vm.$rootScope = $rootScope;
        vm.$state = $state;
        vm.$stateParams = $stateParams;
        vm.exceptionRequestService = exceptionRequestService;
        vm.stateTransitionService = stateTransitionService;

        vm.init(loadResourcesService);

        vm.sortOptions = {
            sortBy: 'submittedDate',
            sortReverse: true
        };

        vm.initNewRequest();
    }

    exceptionRequestController.prototype = Object.create({
        init: function(resourceService) {
            var vm = this;
            resourceService.loadScript(vm, vm.resourceName);
            vm.getUserExceptionRequests();
        },

        getUserExceptionRequests: function() {
            var vm = this;
            vm.exceptionRequestService.getUserExceptionRequests().then(function(exceptionRequests) {
                if (exceptionRequests && exceptionRequests.items && exceptionRequests.count && exceptionRequests.count > 0) {
                    vm.previouslySubmittedRequests = exceptionRequests.items;
                    vm.hasRequests = true;
                }
                else {
                    vm.previouslySubmittedRequests = [];
                    vm.hasRequests = false;
                }
            });
        },

        createNewRequest: function () {
            var vm = this;
            vm.exceptionRequestService.createNewRequest(vm.newRequest)
                .then(function (createdRequest) {
                    vm.previouslySubmittedRequests.unshift(createdRequest);
                    vm.initNewRequest();
                    vm.newRequest.trackingId = createdRequest.trackingId;
                    vm.newRequest.success = true;
                });
        },

        initNewRequest: function () {
            var vm = this;
            vm.newRequest = {
                subscriptionId: '',
                contactEmail: '',
                expectedVolumeId: '0',
                ipAddresses: '',
                justification: '',
                success: false,
                trackingId: ''
            };
        },
    });
})();