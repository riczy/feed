feed.app.factory('RecipeService', 
	['$http', function($http){
      
      var resourceUrl = 'api/recipes';
      
      return {
         /**
          * Creates a new recipe.
          * 
          * @param   recipeObj {feed.model.recipe} The recipe object to save.
          *          Required.
          * @returns The promise object of the http ajax call. This allows the
          *          caller to chain onsuccess and onerror functions.
          */
         create : function(recipeObj) {
            return $http.post(resourceUrl, recipeObj);
         },
         
         /**
          * Saves an existing recipe.
          * 
          * @param   recipeObj {feed.model.recipe} The recipe object to save.
          *          Required.
          * @returns The promise object of the http ajax call. This allows the
          *          caller to chain onsuccess and onerror functions.
          */
         save : function(recipeObj) {
            return $http.put(resourceUrls, recipeObj);
         }
      };
   }]
   );