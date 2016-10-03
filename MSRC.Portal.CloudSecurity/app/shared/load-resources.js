(function () {
    'use strict';

    angular
        .module('msrcCloudPortal')
        .service('loadResourcesService', loadResourcesService);

    loadResourcesService.$inject = ['$q', '$localStorage', 'angularLoad', 'constants'];

    function loadResourcesService($q, $localStorage, angularLoad, constants) {
        var service = this;
        service.$q = $q;
        service.$localStorage = $localStorage;
        service.angularLoad = angularLoad;
        service.constants = constants;
    }

    loadResourcesService.prototype = Object.create({
        loadScript: function (viewModel, resourceName) {
            var deferred = this.$q.defer();
            var self = this;
            var constants = self.constants;
            self.angularLoad.loadScript(constants.resourceUrl + constants.resourceNameSpace + resourceName + "." + self.$localStorage.locale + ".js").then(function () {               
                viewModel.resources = msrcCloudPortal.Resources[viewModel.resourceName][self.$localStorage.locale];
                viewModel.$rootScope.title = viewModel.resources.pageTitle;
                viewModel.$rootScope.$broadcast("resourceLoaded", resourceName);
                deferred.resolve();
            });

            return deferred.promise;
        }
    });
})();