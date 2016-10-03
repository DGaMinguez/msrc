(function () {
    'use strict';

    angular.module('msrcCloudPortal')
        .controller('localeController', localeController);

    localeController.$inject = ['$rootScope', '$state', '$localStorage', 'constants'];

    function localeController($rootScope, $state, $localStorage, constants) {
        /* jshint validthis:true */
        var vm = this;
        vm.$state = $state;
        vm.locales = constants.supportedLocales;
        vm.selectedLocale = constants.supportedLocales[$localStorage.locale || "en-us"];

        $rootScope.$on("localeChange", function (event, locale) {
            vm.selectedLocale = vm.locales[locale];
        });
    }

    localeController.prototype = Object.create({
        init: function () {

        },
        changeLocale: function (selectedLocale) {
            var vm = this;
            vm.selectedLocale = vm.locales[selectedLocale];
            var currentState = vm.$state.current;
            vm.$state.go(currentState.name, { locale: vm.selectedLocale.locale }, { reload: true }).then(function () {                
                window.location.reload(); //reload the app on locale change. This will bind the technet dropdown and searchbox for new locale. 
            });
        }
    });
})();
