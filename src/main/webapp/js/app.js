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
                    url: '/',
                    templateUrl: 'partials/recipe-list.html',
                    controller: 'HomeController'
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
                    url: '/recipe/search?text&limit&skip',
                    templateUrl: 'partials/recipe-list.html',
                    controller: 'RecipeSearchController'
                }).
                state('recipe-edit', {
                    url: '/recipe/{id}/edit',
                    templateUrl: 'partials/recipe-edit.html',
                    controller: 'RecipeAddController'
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
/**
* <p>Places an object of criteria into a url to be used for
* search for resource items.</p>
*
* Examples:
* resourceUrl = /app/r/rsrc
* criteria = {} or null or undefined
* return = /app/r/rsrc
*
* criteria = { status : [1, 3], name : "Henry" }
* return = /app/r/rsrc?status=1&status=3&name=Henry
*
* criteria = { status : null }
* return = /app/r/rsrc
*
* @param resourceUrl - {String} The url of the resource for which
* this url is being expanded with search criteria. For
* example: /app-name/r/resource-name. Required.
* @param criteria - {Object} An object containing names and
* values of the criteria to use for searching a resource.
* For example: { status : [1, 3], name : "Henry" }
* @return A url that combines the given resourceUrl and the criteria.
*/
feed.asSearchUri = function(resourceUrl, criteria) {
    var key, value, temp, i,
        hasInitialCriterion = false,
        url = resourceUrl,
        criteria = criteria || {};

    for (key in criteria) {
        temp = "";
        value = criteria[key];
        if (!feed.isNone(value)) {
            if (typeof value === 'object' && value instanceof Array && value.length > 0) {
                /*
                * MULTIPLE VALUES SEPARATED BY ","; THIS WAY IS NOT BEING HANDLED BY REST.
                for (i = 0; i < value.length; i++) {
                if (i > 0) temp += ",";
                temp += encodeURIComponent(value[i]);
                }
                if (!feed.isEmpty(temp)) temp = key + "=" + temp;
                */
                for (i = 0; i < value.length; i++) {
                    if (i > 0) temp += "&";
                    temp += (key + "=" + encodeURIComponent(value[i]));
                }
            }
            else {
                temp = key + "=" + encodeURIComponent(value);
            }
            if (!feed.isEmpty(temp)) {
                if (!hasInitialCriterion) {
                    url += "?" + temp;
                    hasInitialCriterion = true;
                }
                else {
                    url += "&" + temp;
                }
            }
        }
    }
    return url;
};
