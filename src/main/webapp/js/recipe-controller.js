angular
   .module('feed.controllers')
   .controller('RecipeSearchController', ['$scope', 
      function($scope) {
         $scope.text = "";
         $scope.search = function() {
            
         };
      }
   ])
   .controller('RecipeAddController', ['$scope', '$modal', 'RecipeService',
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
               .create()
               .success(function(){
                  console.log("success");
               })
               .error(function(){
                  console.log("error");
               });
         };
      }
   ])
   .controller('RecipeEditController', ['$scope', '$stateParams',
      function($scope, $stateParams) {
         $scope.pageTitle = "Recipe " + $stateParams.id;
        
      }
   ])
   .controller('RecipeViewController', ['$scope', 
      function($scope) {
         
      }
   ])
   ;
