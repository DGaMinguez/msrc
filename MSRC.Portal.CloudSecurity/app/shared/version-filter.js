(function () {

    angular.module('msrcCloudPortal')
           .filter('versionFilter', VersionFilter);

    VersionFilter.$inject = ['$stateParams'];
    function VersionFilter($stateParams) {
        return function (input) {
            var regex = /([a-zA-Z])/g
            
            return parseFloat(input.replace(regex, "")).toFixed(1);
        }
    };

})();