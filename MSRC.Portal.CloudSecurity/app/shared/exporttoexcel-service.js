(function () {
    angular.module('msrcCloudPortal')
        .service('exportService', exportService);

    exportService.$inject = ['$rootScope'];

    function exportService($rootScope) {
        this.$rootScope = $rootScope;
    }

    exportService.prototype = Object.create({
        ToExcel: function (data, filename, type) {
            var file = new Blob([data], { type: type || 'text/csv' });
            saveAs(file, filename || 'download.csv');
        }
    })
})();