angular
   .module('app', [])
   .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
         $urlRouterProvider.otherwise('/');
         $stateProvider.
            state('home', {
               url: '/'
            }).
            state('recipe-add', {
               url: 'recipe/add',
               templateUrl: 'partials/recipe.html',
               controller: 'RecipeAddController'
            });
      }
   ]);