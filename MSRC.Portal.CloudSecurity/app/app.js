//
//  Copyright (C) Microsoft. All rights reserved.    
// 

(function () {
    'use strict';

    angular.module('msrcCloudPortal', ['ngSanitize', 'ngStorage', 'ui.router', 'ngclipboard', 'AdalAngular','angularLoad','sprintf'])
        .constant('constants', {
            apiBaseUrl: 'api/',
            resourceUrl: "../Scripts/Resources/",
            resourceNameSpace: "msrcCloudPortal.Resources.",
            commonResourceName:"common",
            debounceDelayInMilliseconds: 500,
            storageBlockedMessage: "Sites are blocked from setting and reading any data. Your browser must allow cookies.",
            supportedLocales: {
                "en-us": { locale: "en-us", text: "United States (English)" },
                "en-gb": { locale: "en-gb", text: "United Kingdom (English)" },
                "pt-br": { locale: "pt-br", text: "Brasil (Português)" },
                "de-de": { locale: "de-de", text: "Deutschland (Deutsch)" },
                "fr-fr": { locale: "fr-fr", text: "France (Français)" },
                "ko-kr": { locale: "ko-kr", text: "한국(한국어)" },
                "zh-cn": { locale: "zh-cn", text: "中国（简体中文" },
                "zh-tw": { locale: "zh-tw", text: "台灣(繁體中文)" },
                "ja-jp": { locale: "ja-jp", text: "日本 (日本語)" }
            }
        })
        .config(Config)
        .run(Run);

    Config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'adalAuthenticationServiceProvider', '$localStorageProvider', '$sessionStorageProvider'];

    function Config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, adalProvider, $localStorageProvider, $sessionStorageProvider) {
        $localStorageProvider.setKeyPrefix('msrcCloud.');                            
        $sessionStorageProvider.setKeyPrefix('msrcCloud.');

        adalProvider.init({

            // Use this value for the public instance of Azure AD
            instance: msrcCloudPortal.Adal.instance,

            // The 'common' endpoint is used for multi-tenant applications like this one
            tenant: msrcCloudPortal.Adal.tenant,

            // Your application id from the registration portal
            clientId: msrcCloudPortal.Adal.clientID,

            redirectUri:location.origin,

            // If you're using IE, uncommment this line - the default HTML5 sessionStorage does not work for localhost.
            cacheLocation: (Modernizr.localstorage ? 'localStorage' : '')
        }, $httpProvider);

        $stateProvider.state('app', {
            abstract: true,
            url: '/{locale:(?:en-US|en-GB|de-DE|pt-BR|zh-CN|zh-TW|ja-JP|fr-FR|ko-KR|en-us|en-gb|de-de|pt-br|zh-cn|zh-tw|ja-jp|fr-fr|ko-kr)}',
            template: '<ui-view/>'
        });

        $stateProvider
            .state('app.home', {
                views: {
                    "": {
                        templateUrl: "../app/home/home.html?v=" + msrcCloudPortal.staticFileVer,
                        controller: 'homeController',
                        controllerAs: 'vm',
                    }
                },
                url: "/",
                cssClass: 'securityhome'
            })
            .state('app.detail', {
                url: "/security-guidance/CVEs/:cveNumber",
                templateUrl: "../app/guidance/security-guidance-detail.html?v=" + msrcCloudPortal.staticFileVer,
                controller: 'securityGuidanceDetailController',
                resolve: {
                    cveDetail: getSecurityGuidanceDetail
                },
                controllerAs: 'vm',
                requireADLogin: true,
                cssClass: 'securitydetails',
                saveTransitionStateParams: true
            })
            .state('app.policy', {
                url: "/policy",
                templateUrl: "../app/policy/policy.html?v=" + msrcCloudPortal.staticFileVer,
                controller: 'policyController',
                controllerAs: 'vm',
                cssClass: 'securityCloudPolicy'
            })
            .state('app.exceptionrequest', {
                url: "/exception-request",
                templateUrl: "../app/exceptionrequest/exception-request.html?v=" + msrcCloudPortal.staticFileVer,
                controller: 'exceptionRequestController',
                controllerAs: 'vm',
                cssClass: 'securityCloudException'
            });

        var defaultLocale = 'en-us';
        var locale = Modernizr.localstorage ? ($localStorageProvider.get("locale") || defaultLocale) : defaultLocale;       
        locale = locale.toLowerCase();
        
        $urlRouterProvider.otherwise('/' + locale + '/');
        $locationProvider.html5Mode(true).hashPrefix('!');
        
        getReleaseNoteDetail.$inject = ['securityGuidanceService', '$stateParams', '$localStorage', '$rootScope'];
        function getReleaseNoteDetail(securityGuidanceService, $stateParams, $localStorage, $rootScope) {
            setLocale($stateParams, $localStorage, $rootScope);
            return securityGuidanceService.getReleaseNoteDetail($stateParams.releasenoteId);
        }

        getSecurityGuidanceDetail.$inject = ['securityGuidanceService', '$stateParams', '$localStorage', '$rootScope'];
        function getSecurityGuidanceDetail(securityGuidanceService, $stateParams, $localStorage, $rootScope) {
            setLocale($stateParams, $localStorage, $rootScope);
            return securityGuidanceService.getSecurityGuidanceDetail($stateParams.cveNumber);
        }

        getSecurityGuidance.$inject = ['securityGuidanceService', 'myFilterSetting', '$filter', '$localStorage', '$stateParams', '$rootScope'];
        function getSecurityGuidance(securityGuidanceService, myFilterSetting, $filter, $localStorage, $stateParams, $rootScope) {
            setLocale($stateParams, $localStorage, $rootScope);
           
            if (myFilterSetting.isSearch && myFilterSetting.queryText) {
                return securityGuidanceService.searchSecurityGuidance(myFilterSetting);
            } else {
                return securityGuidanceService.getSecurityGuidance(myFilterSetting);
            }
        }

        getSecurityGuidanceSummary.$inject = ['securityGuidanceService', 'myFilterSetting', '$filter','$stateParams','$localStorage','$rootScope'];
        function getSecurityGuidanceSummary(securityGuidanceService, myFilterSetting, $filter, $stateParams, $localStorage,$rootScope) {            
            setLocale($stateParams, $localStorage, $rootScope);
            return securityGuidanceService.getSecurityGuidanceSummary(myFilterSetting);           
        }

        getMyFilters.$inject = ['storageService', 'defaultFilterSettings', '$localStorage', '$sessionStorage'];
        function getMyFilters(storageService, defaultFilterSettings, $localStorage, $sessionStorage) {
            var storageKey_myfilters = this.data && this.data.storageKey_myfilters ? this.data.storageKey_myfilters : undefined;
          
            var localstorage_myfilters;
            var sessionstorage_myfilters;

            if (storageKey_myfilters == 'softwareupdatefilter') {                
                localstorage_myfilters = $localStorage.localstorageMyfilters_summary;
                sessionstorage_myfilters = $sessionStorage.sessionstorageMyfilters_summary;
            }
            else if (storageKey_myfilters == 'securityguidancefilter') {
                localstorage_myfilters = $localStorage.localstorageMyfilters_guidance;
                sessionstorage_myfilters = $sessionStorage.sessionstorageMyfilters_guidance;
            }

            var myFilterSetting_local = (!localstorage_myfilters || Object.keys(localstorage_myfilters).length === 0) ? defaultFilterSettings.local : localstorage_myfilters;
            var myFilterSetting_session = (!sessionstorage_myfilters || Object.keys(sessionstorage_myfilters).length === 0) ? defaultFilterSettings.session : sessionstorage_myfilters;

            var myFilterSetting = angular.extend({}, myFilterSetting_local, myFilterSetting_session);

            return (!myFilterSetting || Object.keys(myFilterSetting).length === 0) ? defaultFilterSettings : myFilterSetting;
        }

        getDefaultfilterSettings.$inject = ['latestPatchDate', 'filterSettingService'];
        function getDefaultfilterSettings(latestPatchDate, filterSettingService) {

            var storageKey_myfilters = this.data && this.data.storageKey_myfilters ? this.data.storageKey_myfilters : undefined;

            var defaultDate = angular.copy(latestPatchDate);
            defaultDate.setDate(latestPatchDate.getDate() + 1);

            var defaultFilter_guidance = filterSettingService.defaults.getGuidanceFilter(defaultDate);
            var defaultFilter_summary = filterSettingService.defaults.getSummaryFilter(defaultDate);

            var defaultFilter;

            if (storageKey_myfilters == 'softwareupdatefilter') {
                defaultFilter = defaultFilter_summary;
            }
            else if (storageKey_myfilters == 'securityguidancefilter') {
                defaultFilter = defaultFilter_guidance;
            }

            return defaultFilter;
        }

        getReleaseNotes.$inject = ['securityGuidanceService', 'myFilterSetting'];
        function getReleaseNotes(securityGuidanceService, myFilterSetting) {
            return securityGuidanceService.getReleaseNotes(myFilterSetting);
        }

        getFilterOptions.$inject = ['filterSettingService'];
        function getFilterOptions(filterSettingService) {
            return filterSettingService.getFilterOptions();
        }

        getLatestPatchDate.$inject = ['filterSettingService'];
        function getLatestPatchDate(filterSettingService) {
            return filterSettingService.getLatestPatchDate();
        }

        getAcknowledgments.$inject = ['securityGuidanceService', '$localStorage', '$stateParams', '$rootScope'];
        function getAcknowledgments(securityGuidanceService, $localStorage, $stateParams, $rootScope) {
            setLocale($stateParams, $localStorage, $rootScope);
            var year = new Date().getFullYear();
            return securityGuidanceService.getAcknowledgments(year);
        }

        getUserDetails.$inject = ['developerService', '$localStorage', '$stateParams', '$rootScope', 'adalAuthenticationService'];
        function getUserDetails(developerService, $localStorage, $stateParams, $rootScope, adalService) {
            setLocale($stateParams, $localStorage, $rootScope);
            return developerService.getUserDetails();
        }

        getLoggedOnUserInfo.$inject = ['adalAuthenticationService'];
        function getLoggedOnUserInfo(adalService) {
            return adalService.userInfo;
        }

        function setLocale($stateParams, $localStorage, $rootScope) {
            if ($stateParams.locale !== undefined) {               
                $rootScope.$broadcast("localeChange", $stateParams.locale);
                $rootScope.activeLocale = $stateParams.locale;
                $localStorage.locale = $rootScope.activeLocale;
            }
        }

        $httpProvider.interceptors.push('httpInterceptor');
    }

    Run.$inject = ['$rootScope', '$state', '$timeout', '$window', '$stateParams', '$localStorage', 'adalAuthenticationService','angularLoad', 'constants'];

    function Run($rootScope, $state, $timeout, $window, $stateParams, $localStorage, adalService, angularLoad, constants) {
        $window.msrcCloudPortal = $window.msrcCloudPortal || {}; // namespace for resources 
        $rootScope.title = 'Security TechCenter';
        $rootScope.showCVSSTab = msrcCloudPortal.showCVSSTab;
        $rootScope.showAdvFilterSettings = msrcCloudPortal.showAdvFilterSettings;
        $rootScope.environmentHeader = msrcCloudPortal.environmentHeader;
        $rootScope.staticFileVer = msrcCloudPortal.staticFileVer;
        $rootScope.firstload = true;
        $rootScope.stateChanging = true;
        $rootScope.longRunningStateChange = true;
        initializeStateChangeHooks($rootScope, $state, $timeout, $stateParams, $localStorage, adalService, angularLoad, constants);
        $rootScope.$state = $state;
        $rootScope.currentYear = new Date().getFullYear();

        if (!$window.location.origin) {
            var port = $window.location.port ? ':' + $window.location.port : '';
            $window.location.origin = $window.location.protocol + "//" + $window.location.hostname + port;
        }
    }

    function initializeStateChangeHooks($rootScope, $state, $timeout, $stateParams, $localStorage, adalService, angularLoad, constants) {
        var stateChangeDelay = 100; //is in milliseconds

        function isADLoginRequired(route) {
            return !!route.requireADLogin;
        }

        function saveState(stateName) {
            var toState = $state.get(stateName);
            $localStorage.transitionToState = toState;
        }

        var stateChangeHandler = function (e, nextRoute) {
            var _oauthData = $rootScope.userInfo;

            if (nextRoute && isADLoginRequired(nextRoute)) {
                var currentDate = new Date();
                var expiryDate = (new Date(0)).setUTCSeconds(_oauthData.profile.exp);

                if (_oauthData.isAuthenticated && currentDate > expiryDate) {
                    saveState(nextRoute.name);
                    adalService.login();
                }
            }
        };

        // Route change event tracking to receive fragment and also auto renew tokens
        $rootScope.$on('$stateChangeStart', stateChangeHandler);

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.stateChanging = true;
            $rootScope.loading = false;
            $timeout(function() {
                if ($rootScope.stateChanging) {
                    $rootScope.longRunningStateChange = true;
                    $rootScope.loading = true;
                }

                var transitionState = $localStorage.transitionToState;
                if (transitionState && $rootScope.userInfo.isAuthenticated) {
                    if ((toState.url === "/" && transitionState.url.indexOf(toState.url) !== -1) || transitionState.url.indexOf(toState.url) === -1) {
                        console.log("Transitioning into new state " + transitionState.url);
                        var params = {};
                        if (transitionState.hasTransitionStateParams) {
                            params = $localStorage.transitionStateParams
                        }

                        params.locale = $localStorage.locale;
                        $state.go(transitionState.name, params, { reload: true });
                    }
                }
            }, stateChangeDelay);
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
            if ($stateParams.locale !== undefined) {                
                $rootScope.activeLocale = $stateParams.locale.toLowerCase();
                $localStorage.locale = $rootScope.activeLocale.toLowerCase();
            }
            
            var transitionState = $localStorage.transitionToState;
            if (transitionState && $rootScope.userInfo.isAuthenticated) {
                if ((toState.url !== "/" && toState.url !== transitionState.url && transitionState.url.indexOf(toState.url) !== -1) || (toState.url !== "/" && !toState.hasTransitionStateParams && transitionState.url.indexOf(toState.url) !== -1)) {
                    console.log("Delete transition state " + toState.url + " " + transitionState.url);
                    delete toState.hasTransitionStateParams;
                    delete transitionState.hasTransitionStateParams;
                    delete $localStorage.transitionToState;                    
                }
            }
            $rootScope.stateChanging = false;
            $rootScope.longRunningStateChange = false;
            $rootScope.loading = false;
            
            $rootScope.$on("$includeContentLoaded", function (event, templateName) {
                if (templateName.indexOf("header") > -1 && msrcCloudPortal.firstLoad) {
                    angularLoad.loadScript(msrcCloudPortal.combinedTechnetUrl);
                    angularLoad.loadScript("../Scripts/searchbox." + $stateParams.locale.toLowerCase() + ".js");       
                }
            });

            if (msrcCloudPortal.firstLoad) { 
                if (!$rootScope.commonResources) { // loads the common resources that has localized resource string for headers /foooter
                    angularLoad.loadScript(constants.resourceUrl + constants.resourceNameSpace + constants.commonResourceName + "." + $localStorage.locale + ".js").then(function () {
                        var resources = msrcCloudPortal.Resources[constants.commonResourceName][$localStorage.locale];
                        $rootScope.commonResources = resources;
                    });
                }
            }
            msrcCloudPortal.firstload = false;
            $rootScope.$previousState = fromState;
        });

        $rootScope.$on('$stateChangeError', function () {
            $rootScope.stateChanging = false;
            $rootScope.loading = false;
            $rootScope.longRunningStateChange = false;
        });
    }
})();
