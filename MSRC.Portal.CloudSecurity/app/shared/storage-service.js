//
//  Copyright (C) Microsoft. All rights reserved.    
// 

(function () {
    'use strict';

    angular
        .module('msrcCloudPortal')
        .factory('storageService', storageService);

    storageService.$inject = [];

    function storageService() {
        var storage = null;

        if (navigator.cookieEnabled) {
            storage = Modernizr.localstorage ? localStorage : sessionStorage;
        }

        var sessionKey = 'session';
        var myFiltersKeyDefault = 'myFilters'; 
        var filterOptionsKey = 'filterOptions';

        return {
            canUseStorage: canUseStorage,
            setSession: setSession,
            getSession: getSession,
            clearSession: clearSession,
            setFilterOptions: setFilterOptions,
            getFilterOptions: getFilterOptions,
            setMyFilter: setMyFilter,
            getMyFilter: getMyFilter
        };

        function canUseStorage() {
            return navigator.cookieEnabled;
        }

        function setSession(session) {
            storage.setItem(sessionKey, JSON.stringify(session));
        }

        function getSession() {
            return JSON.parse(storage.getItem(sessionKey));
        }

        function setFilterOptions(filterOptions) {
            storage.setItem(filterOptionsKey, JSON.stringify(filterOptions));
        }

        function getFilterOptions() {
            return JSON.parse(storage.getItem(filterOptionsKey));
        }

        function setMyFilter(myFiltersKey, myFilter) {
            storage.setItem(!myFiltersKey ? myFiltersKeyDefault : myFiltersKey, JSON.stringify(myFilter));
        }

        function getMyFilter(myFiltersKey) {

            return JSON.parse(storage.getItem(!myFiltersKey ? myFiltersKeyDefault : myFiltersKey));
        }
        
        function clearSession() {
            storage.removeItem(sessionKey);
        }
    }
})();