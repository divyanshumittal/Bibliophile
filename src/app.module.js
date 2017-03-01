(function (angular) {
    'use strict';

    angular.module('app', [
        // 3rd party
        'ionic',
        'ionic.cloud',
        'ngCordova',
        'tmh.dynamicLocale',
        'pascalprecht.translate',
        'ngIOS9UIWebViewPatch',
        'ui.router',
        'ionic-material',
        'ui.bootstrap',
        'nvd3',
        'ion-autocomplete',
        'ngMessages',

        // services
        'app.auth',
        'app.login',
        'app.register',
        'app.readingList',
        'app.userProfile',
        'app.bookDetails',
        'app.home',
        'app.home.dashboard',
        'app.home.activity',
        'app.home.leaderboard'
    ])
        .constant('AvailableLanguages', ['en-US', 'ru-RU', 'el-GR'])
        .constant('DefaultLanguage', 'en-US')
        .config(translateConfig)
        .config(appConfig)
        .config(ionicConfig)
        .config(pushConfig)
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);

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
                template: '<div class="app"><ion-nav-view name="appView"></ion-nav-view></div>',
                controller: function($window) {
                    init();

                    function init() {
                        if ($window.innerHeight > 750) {
                            angular.element( document.querySelector( '.app' ) ).addClass('custom-tablet-styles');
                        }
                    }
                }
             });

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var state = $injector.get('$state');
            var user = $injector.get('$ionicUser');
            
            // if (user.id) {
            //     state.go('app.home.activity', { registerForPush: true });
            // } else {                
                state.go('app.login');
            // }
           
            return $location.path();
        });
    }

    // @ngInject
    function ionicConfig($ionicConfigProvider, $provide, CONFIG, $cordovaInAppBrowserProvider) {
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
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.navBar.alignTitle('left');

        if (CONFIG.devMode) {
            console.info('Analytics tracking is disabled in dev mode, update package.json to enable tracking');
            // enable once its available on ionic
        }

        $cordovaInAppBrowserProvider.setDefaultOptions({
            location: 'no',
            clearcache: 'no',
            toolbar: 'yes'
        })

    }

    function pushConfig($ionicCloudProvider)  {
        $ionicCloudProvider.init({
            "core": {
                "app_id": "f91779ba"
            },
            "auth": {
                "google": {
                  "webClientId": "504292416203-lev95rntka1ki9npsqcg283nmb4qldtn.apps.googleusercontent.com"
                }
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

