feed.app.controller('RecipeSearchController', ['$scope', 
      function($scope) {
         $scope.text = "";
         $scope.search = function() {
            
         };
      }
   ]);
   
feed.app.controller('RecipeAddController', ['$scope', '$modal', 'RecipeService',
      function($scope, $modal, RecipeService) {
      
         $scope.pageTitle = "New Recipe";
         $scope.recipe = feed.model.recipe.templates.simple();
         $scope.addSection = function() {
            $scope.recipe.addSection(3, 1);
         };
         $scope.addIngredient = function(sectionIndex) {
            $scope.recipe.addIngredient(sectionIndex);
         };
         $scope.addStep = function(sectionIndex) {
            $scope.recipe.addStep(sectionIndex);
         };
         $scope.removeIngredient = function(sectionIndex, ingredientIndex) {
            $scope.recipe.removeIngredient(sectionIndex, ingredientIndex);
         };
         $scope.removeStep = function(sectionIndex, stepIndex) {
            $scope.recipe.removeStep(sectionIndex, stepIndex);
         };
         $scope.create = function() {
            RecipeService
               .create($scope.recipe.compressedCopy())
               .success(function(){
                  console.log("success");
               })
               .error(function(){
                  console.log("error");
               });
         };
      }
   ]);
   
feed.app.controller('RecipeEditController', ['$scope', '$stateParams',
      function($scope, $stateParams) {
         $scope.pageTitle = "Recipe " + $stateParams.id;
        
      }
   ]);
   
feed.app.controller('RecipeViewController', ['$scope', 
      function($scope) {
         
      }
   ]);
