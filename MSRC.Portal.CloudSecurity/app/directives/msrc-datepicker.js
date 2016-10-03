//
//  Copyright (C) Microsoft. All rights reserved.    
// 

(function () {
    'use strict';

    angular
        .module('msrcCloudPortal')
        .directive('msrcDatepicker', Datepicker);

    Datepicker.$inject = [];
    
    function Datepicker() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                $(function () {
                    var today = new Date();
                    var minDate = new Date('01/01/1998');//[TODO] first bulletin release date - hold it as a constant (but leave it here for now)
                    var coverageYears = today.getFullYear() - minDate.getFullYear();
                    var options = {
                            showAnim: 'slideDown',
                            numberOfMonths: 1,
                            showWeek: false,
                            changeMonth: true,
                            changeYear: true,
                            yearRange: -coverageYears + ':+0',
                            showButtonPanel: true,
                            minDate: new Date(minDate),
                            maxDate: today,
                        onSelect: function(date) {
                            scope.$apply(function() {
                                ngModelCtrl.$setViewValue(date);
                            });
                        }
                    };

                    element.datepicker(options);
                });
            }
        }
    }
})();