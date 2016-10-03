//
//  Copyright (C) Microsoft. All rights reserved.    
// 

(function () {
    'use strict';

    angular.module('msrcCloudPortal')
        .controller('authenticateController', authenticateController);

    authenticateController.$inject = ['$scope', '$rootScope', '$localStorage', 'adalAuthenticationService'];

    function authenticateController($scope, $rootScope, $localStorage, adalService) {
        var vm = this;
        vm.isSignedIn = adalService.userInfo.isAuthenticated;
        vm.UserName = adalService.userInfo.isAuthenticated ? adalService.userInfo.profile.name : "";
        vm.SigninText = vm.isSignedIn ? $rootScope.commonResources.signoutText : $rootScope.commonResources.signinText;

        vm.login = function () {
            adalService.login();
        };

        vm.logout = function () {
            delete $localStorage.transitionToState;
            delete $localStorage.hasTransitionStateParams;
            adalService.logOut();
            vm.SigninText = $rootScope.commonResources.signinText;
            vm.isSignedIn = false;
        };

        $scope.$on("adal:loginSuccess", function () {
            vm.SigninText = $rootScope.commonResources.signoutText;
            vm.isSignedIn = true;
            vm.UserName = adalService.userInfo.profile.name;
        });
    }
})();