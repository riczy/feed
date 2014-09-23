angular
   .module('app', ['ui.sortable', 'ui.router', 'ui.bootstrap', 'feed.controllers'])
   .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
         $urlRouterProvider.otherwise('/');
         $stateProvider.
            state('home', {
               url: '/'
            }).
            state('recipe-add', {
               url: '/recipe/new',
               templateUrl: 'partials/recipe-edit.html',
               controller: 'RecipeAddController'
            }).
            state('recipe-edit', {
               url: '/recipe/{id}/edit',
               templateUrl: 'partials/recipe-edit.html',
               controller: 'RecipeEditController'
            }).
            state('recipe-view', {
               url: '/recipe/{id}',
               templateUrl: 'partials/recipe.html',
               controller: 'RecipeViewController'
            }).
            state('recipe-search', {
               url: '/recipe/search',
               templateUrl: 'partials/recipe-search.html',
               controller: 'RecipeSearchController'
            });
      }
   ]);