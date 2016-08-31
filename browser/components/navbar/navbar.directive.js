'use strict';

app.directive('navbar', function ($state, $location, AuthFactory) {
  return {
    restrict: 'E',
    templateUrl: '/browser/components/navbar/navbar.html',
    link: function (scope) {
      scope.pathStartsWithStatePath = function (state) {
        //returns bool on whether your url starts with the state name passed in as the parameter
        var partial = $state.href(state);
        var path = $location.path();
        return path.startsWith(partial); //startsWith is a string method
      };

      scope.logout = function () {
        AuthFactory.logout()
        .then(function() {
          $state.go('home');
        })
      }
    }
  }
});
