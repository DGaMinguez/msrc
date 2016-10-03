(function() {
    'use strict';

    angular
        .module('msrcCloudPortal')
        .directive('msrcLink', msrc_link);

    msrc_link.$inject = ['$rootScope', '$window','$interval'];
    
    function msrc_link ($rootScope, $window, $interval) {
        // Usage:
        //     <msrc_link></msrc_link>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            var linkUri = attrs.link;
            var resourceKey = attrs.resourcekey;
            var controllerName = attrs.resourcename;           
            
            $rootScope.$on("resourceLoaded", function (event, resourceName) {
                if (controllerName === resourceName) {
                    var resourceText = scope.vm.resources[resourceKey];
                    var linkStartIndex = resourceText.indexOf("<link>");
                    var linkEndIndex = resourceText.indexOf("</link>");
                    var regex = /link/gi;

                    resourceText = resourceText.replace(regex, "a");

                    regex = /<a>/gi;
                    resourceText = resourceText.replace(regex, "<a href='" + encodeURI(linkUri) + "'>");

                    element.append(resourceText);
                }
            });
        }
    }

})();