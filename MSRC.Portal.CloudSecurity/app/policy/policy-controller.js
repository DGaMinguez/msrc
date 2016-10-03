//
//  Copyright (C) Microsoft. All rights reserved.    
// 

(function () {
    'use strict';

    angular.module('msrcCloudPortal')
     .controller('policyController', policyController);

    policyController.$inject = ['$rootScope', '$state', '$stateParams', 'stateTransitionService', 'loadResourcesService'];
    
    function policyController($rootScope, $state, $stateParams, stateTransitionService, loadResourcesService) {
        var vm = this;
        vm.error = null;
        vm.resources = {};
        vm.resourceName = "policy";
        vm.$rootScope = $rootScope;
        vm.$state = $state;
        vm.$stateParams = $stateParams;
        vm.stateTransitionService = stateTransitionService;

        vm.init(loadResourcesService);
    }

    policyController.prototype = Object.create({
        init: function (resourceService) {
            var vm = this;
            resourceService.loadScript(vm, vm.resourceName);
        }
    });

})();