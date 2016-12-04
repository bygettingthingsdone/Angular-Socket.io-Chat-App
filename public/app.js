'use strict';

angular
  .module('app', [
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    'ngLodash',
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $routeProvider
      .when('/main', {
        templateUrl: 'main/main.html',
        controller: 'MainCtrl'
      })
      .when('/join', {
        templateUrl: 'join/join.html',
        controller: 'JoinCtrl'
      })
      .otherwise({
        redirectTo: '/join'
      });
  });
