'use strict';

// $viewPathProvider, to allow overriding system default views
angular.module('mean.system').provider('$viewPath', function() {
  function ViewPathProvider() {
    var overrides = {};

    this.path = function(path) {
      return function() {
        return overrides[path] || path;
      };
    };

    this.override = function(defaultPath, newPath) {
      if (overrides[defaultPath]) {
        throw new Error('View already has an override: ' + defaultPath);
      }
      overrides[defaultPath] = newPath;
      return this;
    };

    this.$get = function() {
      return this;
    };
  }

  return new ViewPathProvider();
});

// $meanStateProvider, provider to wire up $viewPathProvider to $stateProvider
angular.module('mean.system').provider('$meanState', ['$stateProvider', '$viewPathProvider', function($stateProvider, $viewPathProvider) {
  function MeanStateProvider() {
    this.state = function(stateName, data) {
      if (data.templateUrl) {
        data.templateUrl = $viewPathProvider.path(data.templateUrl);
      }
      $stateProvider.state(stateName, data);
      return this; 
    };

    this.$get = function() {
      return this;
    };
  }

  return new MeanStateProvider();
}]);

//Setting up route
angular.module('mean.system').config(['$meanStateProvider', '$urlRouterProvider',
  function($meanStateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $meanStateProvider
      .state('home', {
        url: '/',
        templateUrl: 'system/views/index.html'
      }).state('packages', {
        url: '/packages',
        templateUrl: 'system/views/packages.html'
      }).state('package', {
        url: '/package',
        templateUrl: 'system/views/package.html'
      }).state('categories', {
        url: '/categories',
        templateUrl: 'system/views/categories.html'
      });
  }
]).config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
