(function (angular) {
    'use strict';

    angular.module('app', [
        // 3rd party
        'ionic',
        'ionic.cloud',
        'ionic.service.core', // needed for ionic analytics
        'ionic.service.analytics',
        'ngCordova',
        'tmh.dynamicLocale',
        'pascalprecht.translate',
        'ngIOS9UIWebViewPatch',
        'ui.router',
        'ionic-material',
        'ui.bootstrap',
        'nvd3',

        // services
        'app.auth',
        'app.login',
        'app.dashboard',
        'app.activity'
    ])
        .constant('AvailableLanguages', ['en-US', 'ru-RU', 'el-GR'])
        .constant('DefaultLanguage', 'en-US')
        .config(translateConfig)
        .config(appConfig)
        .config(ionicConfig)
        .config(pushConfig);

    // @ngInject
    function translateConfig($translateProvider, DefaultLanguage) {
        $translateProvider.useStaticFilesLoader({
            'prefix': 'i18n/',
            'suffix': '.json'
        });
        $translateProvider.preferredLanguage(DefaultLanguage);
    }
    // @ngInject
    function appConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                template: '<ion-nav-view class="app" name="appView"></ion-nav-view>'
            });

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var user = false;
            var state = $injector.get('$state');
            if (user) {
                // go to home
            } else {
                state.go('app.login');
            }
            return $location.path();
        });
    }

    // @ngInject
    function ionicConfig($ionicConfigProvider, $provide, $ionicAutoTrackProvider,
                         CONFIG, $cordovaInAppBrowserProvider) {
        $provide.decorator('$exceptionHandler', ['$delegate', '$window', function ($delegate, $window) {
            return function (exception, cause) {
                // Decorating standard exception handling behaviour by sending exception to crashlytics plugin
                var message = exception.toString();
                var stacktrace = ($window.printStackTrace) ? $window.printStackTrace({e: exception}) : 'Stack Trace Not Available';
                $delegate(exception, cause);
                if ($window.navigator.crashlytics) $window.navigator.crashlytics.logException('ERROR: ' + message + ', stacktrace: ' + stacktrace);
            };
        }]);

        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.text(' ');
        $ionicConfigProvider.views.swipeBackEnabled(false);
        $ionicConfigProvider.tabs.position('top');
        $ionicConfigProvider.navBar.alignTitle('left');

        if (CONFIG.devMode) {
            console.info('Analytics tracking is disabled in dev mode, update package.json to enable tracking');
            $ionicAutoTrackProvider.disableTracking();
        }

        $cordovaInAppBrowserProvider.setDefaultOptions({
            location: 'no',
            clearcache: 'no',
            toolbar: 'yes'
        })

    }

    function pushConfig($ionicCloudProvider) {
        $ionicCloudProvider.init({
            "core": {
                "app_id": "f91779ba"
            },
            "push": {
                "sender_id": "315672071336",
                "pluginConfig": {
                    "ios": {
                        "badge": true,
                        "sound": true
                    },
                    "android": {
                        "iconColor": "#343434"
                    }
                }
            }
        });
    }
}(angular));

