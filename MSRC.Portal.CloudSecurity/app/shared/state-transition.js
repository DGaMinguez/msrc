(function () {
    'use strict';

    angular.module('msrcCloudPortal')
        .service('stateTransitionService', stateTransition);

    stateTransition.$inject = ['$rootScope','$state', '$stateParams', '$localStorage'];

    function stateTransition($rootScope, $state, $stateParams, $localStorage) {
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$localStorage = $localStorage;
        this.$stateParams = $stateParams;
    }

    stateTransition.prototype = Object.create({
        transition: function (stateName) {
            var self = this;
            if (!self.$rootScope.userInfo.isAuthenticated) { // if not authenticated, store the state and transition
                var toState = self.$state.get(stateName);
                self.$localStorage.transitionToState = toState;
                self.$state.go(stateName, { locale: self.$stateParams.locale }, { location: 'replace', reload: true });
            } else {
                self.$state.go(stateName, { locale: self.$stateParams.locale }, { notify: true, reload: true, location: "replace", inherit: false });
            }
        }
    })

})();