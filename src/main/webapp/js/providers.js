feed.app.config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.
                state('home', {
                    url: '/'
                }).
                state('recipe-add', {
                    url: '/recipe/new',
                    templateUrl: 'partials/recipe-edit.html',
                    controller: 'RecipeAddController',
                    data: {
                        type: 'simple'
                    }

                }).
                state('recipe-add-tpi', {
                    url: '/recipe/tpi/new',
                    templateUrl: 'partials/recipe-edit.html',
                    controller: 'RecipeAddController',
                    data: {
                        type: 'tpi'
                    }
                }).
                state('recipe-add-tpr', {
                    url: '/recipe/tpr/new',
                    templateUrl: 'partials/recipe-edit.html',
                    controller: 'RecipeAddController',
                    data: {
                        type: 'tpr'
                    }
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
    ]
);

feed.app.config(['$provide', '$httpProvider',
        function ($provide, $httpProvider) {

            $provide.factory('interceptor', ['$q', '$location', function ($q, $location) {
                return {
                    responseError: function (responseObj) {
                        if (responseObj.status == 403) {
                            window.location = "forbidden.html";
                            return $q.reject(responseObj);
                        }
                        return $q.reject(responseObj);
                    }
                };
            }]);

            $httpProvider.interceptors.push('interceptor');

        }]
);