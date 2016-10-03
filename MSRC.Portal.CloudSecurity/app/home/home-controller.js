//
//  Copyright (C) Microsoft. All rights reserved.    
// 

(function () {
    'use strict';

    angular.module('msrcCloudPortal')
        .controller('homeController', homeController);

    homeController.$inject = ['$rootScope', '$scope', 'loadResourcesService', 'stateTransitionService'];

    function homeController($rootScope, $scope, loadResourcesService, stateTransitionService) {
        var vm = this;
        $rootScope.title = '';
        vm.error = null;
        vm.$rootScope = $rootScope;
        vm.resources = {};
        vm.resourceName = "home"; //this resolves to the resource name on the server
        vm.stateTransitionService = stateTransitionService;

        vm.init(loadResourcesService);
    }

    homeController.prototype = Object.create({
        init: function (resourceService) {
            var vm = this;
            if (!!msrcCloudPortal.Resources && !!msrcCloudPortal.Resources.home) {
                vm.resources = msrcCloudPortal.Resources[vm.resourceName][vm.$rootScope.activeLocale];
            }
            resourceService.loadScript(vm, vm.resourceName).then(function () {
                vm.$rootScope.windowTitle = vm.resources.windowTitle;
            });
        }
    });
})();