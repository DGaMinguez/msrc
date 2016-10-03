//
//  Copyright (C) Microsoft. All rights reserved.    
// 

(function () {
    'use strict';

    angular
        .module('msrcCloudPortal')
        .directive('msrcMultiselect', DropdownMultiselect)
        .filter('msrcDropDownSelectedText', DropdownSelectedText);

    DropdownMultiselect.$inject = [];
    function DropdownMultiselect() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=',                
                onClose: '&'
            },
            templateUrl: '../app/directives/msrc-multiselect.html',
            controller: DropDownSelectController
        }
    }

    DropDownSelectController.$inject = ['$scope', '$timeout'];
    function DropDownSelectController($scope, $timeout)
    {
        $scope.openDropdown = function () {
            $scope.open = !$scope.open;
        };

        $scope.closeDropdown = function () {            
            $scope.closeTimer = $timeout(function () {
                if ($scope.open) {
                    $scope.open = false;
                    $scope.onClose()
                }
            }, 400);
        };

        $scope.orderByClause = function () {
            return $scope.model.orderby || "name";
        };

        $scope.clearCloseDropdown = function () {
            if ($scope.open) {
                $timeout.cancel($scope.closeTimer);
            }
        };

        $scope.selectAll = function () {
            $scope.model.selectedIds = [];
            angular.forEach($scope.model.options, function (item) {
                $scope.model.selectedIds.push(item.id);                        
            });
            $scope.model.isAllSelected = true;
        };

        $scope.deselectAll = function () {
            $scope.model.selectedIds = [];
            $scope.model.isAllSelected = true;
        };

        $scope.toggleSelection = function (option) {
            var intIndex = -1;
            angular.forEach($scope.model.selectedIds, function (item, index) {
                if (item === option.id) {
                    intIndex = index;
                }
            });

            if (intIndex >= 0) {
                $scope.model.selectedIds.splice(intIndex, 1);
            } else {
                $scope.model.selectedIds.push(option.id);
            }

            $scope.model.isAllSelected = ($scope.model.options.length === $scope.model.selectedIds.length) || ($scope.model.selectedIds.length === 0);
        };

        $scope.getClassName = function (option) {
            var varClassName = 'glyphicon glyphicon-remove';
            angular.forEach($scope.model.selectedIds, function (item) {
                if (item === option.id) {
                    varClassName = 'glyphicon glyphicon-ok green';
                }
            });
            return (varClassName);
        };
       
        $scope.$parent.$watch('vm.searchOrFilter', function () {                                                            
            $scope.model.isDisabled = $scope.$parent.vm.searchOrFilter != 'Filter';                  
        });
    }


    function DropdownSelectedText() {
        return function (model) {
            if (model.isAllSelected) {
                return model.allSelectedText;
            } else {
                return model.selectedIds.length + " " + model.labelText;
            }
        }
    }
})();