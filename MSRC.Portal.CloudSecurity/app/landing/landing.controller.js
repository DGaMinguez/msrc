(function () {
    'use strict';

    angular.module('msrcCloudPortal')
        .controller('landingPageController', landingPageController);
    
    function landingPageController() {
        this.currentYear = new Date().getFullYear();
    };

   // angular.bootstrap(document.getElementById("copyRightYear"), ['msrcCloudPortal.landingPage']);
})();
