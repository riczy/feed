var feed = feed || {};

feed.app = angular.module('app', 
	[
		'ui.sortable', 
		'ui.router',
		'ui.bootstrap'
	]
);

feed.app.config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.
                state('error', {
                    url: '/error',
                    templateUrl: 'partials/error.html',
                    controller: 'ErrorController'
                }).
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
                state('recipe-search', {
                    url: '/recipe/search',
                    templateUrl: 'partials/recipe-search.html',
                    controller: 'RecipeSearchController'
                }).
                state('recipe-edit', {
                    url: '/recipe/{id}/edit',
                    templateUrl: 'partials/recipe-edit.html',
                    controller: 'RecipeEditController'
                }).
                state('recipe-view', {
                    url: '/recipe/{id}',
                    templateUrl: 'partials/recipe-view.html',
                    controller: 'RecipeViewController'
                })
                ;
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

/**
 * <p>Returns true if the given obj parameter is neither undefined
 * nor null. Returns false if the given obj parameter is undefined
 * or null.</p>
 * 
 * @param   obj {Object} An object or element.
 * @return  true if obj has a value and false if obj is undefined
 *          or null.
 */
feed.isNone = function(obj) {

   return (obj===undefined || obj===null); 
};

/**
 * <p>Returns true if obj is of type string and it has an empty
 * string value. In addition, returns true if obj is undefined or
 * null. Returns false in all other cases.
 * 
 * @param   obj An object or element.
 * @return  true if obj is an empty string or if obj is undefined or
 *          null; false otherwise.
 */
feed.isEmpty = function(obj) {

   if (feed.isNone(obj)) return true;

   if (typeof obj == "string") {
      return $.trim(obj).length == 0;
   }

   return false;
};
