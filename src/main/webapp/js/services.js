feed.app.factory('RecipeService', 
    ['$http', function($http){

        var resourceUrl = 'api/recipe';

        return {
            /* Creates a new recipe.
             *
             * @param   recipeObj {feed.model.recipe} The recipe object to save.
             *          Required.
             * @return  The promise object of the http ajax call. This allows the
             *          caller to chain onsuccess and onerror functions.
             */
            create : function(recipeObj) {
                return $http.post(resourceUrl, recipeObj);
            },
            /* Saves an existing recipe.
             *
             * @param   recipeObj {feed.model.recipe} The recipe object to save.
             *          Required.
             * @return  The promise object of the http ajax call. This allows the
             *          caller to chain onsuccess and onerror functions.
             */
            update : function(recipeObj) {
                return $http.put(resourceUrl, recipeObj);
            },
            /* Searches for recipes containing the given text.
             *
             * @param   criteria {Object} The criteria for searching. Required.
             */
            search : function(criteria) {
                var url = feed.asSearchUri(resourceUrl + "/search", criteria);
                return $http.get(url);
            },
            /* Searches for recipes containing the given text.
             *
             * @param   criteria {Object} The criteria for searching. Required.
             */
            count : function(criteria) {
                var url = feed.asSearchUri(resourceUrl + "/search/count", criteria);
                return $http.get(url);
            },
            /* Finds the recipe object that is identified by the id given.
             *
             * @param   id {String} The unique identifier of the recipe to fetch.
             */
            fetch : function(id) {
                return $http.get(resourceUrl + "/" + id);
            }
        };
    }]
);

feed.app.factory('MeasurementService',
    ['$http', function($http) {

        var resourceUrl = 'api/measurement';

        return {
            /* Returns all the default measurement types in the system.
             *
             * @return  A promise object that upon success contains an array of
             *          measurements.
             */
            getAll : function() {
                return $http.get(resourceUrl);
            }
        };
    }]
);

feed.app.factory('ErrorService',
    [ function() {

      return {
         title : "",
         message : "",
         getMessage : function() {
            return this.message;
         },
         setMessage : function(message) {
            this.message = message;
         },
         getTitle : function() {
            return this.title;
         },
         setTitle : function(title) {
            this.title = title;
         },
         reset : function() {
            this.title = "";
            this.message = "";
         }
      };

   }]
);