'use strict';

var app = angular.module('auther', ['ui.router']);

//TODO understand what's happening here
// set up Angular
app.config(function ($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);


  $urlRouterProvider.when('/auth/:provider', function () {
  window.location.reload();
  });

  $urlRouterProvider.otherwise('/');
});

// Here is your client ID
// 184694102779-r0oear1m0ron3nm5q54k2onfh2oamg10.apps.googleusercontent.com

// client secret
// DtqSmI00_6k9HkpNvwLX1Pr1