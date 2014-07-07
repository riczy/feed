angular
   .module('feed.controllers')
   .controller('RecipeAddController', ['$scope', '$modal', 
      function($scope, $modal) {
         $scope.recipe = feed.model.recipe.templates.simple();
         $scope.addSection = function() {
            
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
      }
   ])
   .controller('RecipeSearchController', ['$scope', 
      function($scope) {
         
      }
   ])
   ;

feed = feed || {};
feed.model = feed.model || {};
feed.model.recipe = {};
feed.model.recipe.templates = {
   simple : function() {
      var obj = feed.model.recipe.create();
      var index = obj.addSection();
      obj.sections[index].addIngredient();
      obj.sections[index].addIngredient();
      obj.sections[index].addIngredient();
      obj.sections[index].addStep();
      obj.sections[index].addStep();
      return obj;
   },
   twoPartIngredient : function() {
      var obj = feed.model.recipe.create();
      var index = obj.addSection();
      obj.sections[index].addIngredient();
      obj.sections[index].addIngredient();
      index = obj.addSection();
      obj.sections[index].addIngredient();
      obj.sections[index].addIngredient();
      obj.sections[index].addStep();
      obj.sections[index].addStep();
      return obj;
   },
   twoPartRecipe : function () {
      var obj = feed.model.recipe.create();
      var index = obj.addSection();
      obj.sections[index].addIngredient();
      obj.sections[index].addIngredient();
      obj.sections[index].addStep();
      obj.sections[index].addStep();
      index = obj.addSection();
      obj.sections[index].addIngredient();
      obj.sections[index].addIngredient();
      obj.sections[index].addStep();
      obj.sections[index].addStep();
      return obj;
   }
};
feed.model.recipe.create = function(data) {
   
   var modelObject = {
      setObject : function(data) {
         var data = data || {};
         this.title = data.title || "";
         this.description = data.description || "";
         this.sections = data.sections || [];
      },
      createSection : function() {
        return {
           title : "",
           ingredients : [],
           steps : [],
           addIngredient : function() {
              this.ingredients.push({
                 quantity: "",
                 type: "",
                 item: ""
              }); 
           },
           removeIngredient : function(index) {
              if (index >= 0 && index < this.ingredients.length) {
                 this.ingredients.splice(index, 1);
                 return true;
              }
              return false;
           },
           addStep : function() {
              this.steps.push({
                 text: ""
              });
           },
           removeStep : function(index) {
              if (index >= 0 && index < this.steps.length) {
                 this.steps.splice(index, 1);
                 return true;
              }
              return false;
           }
        };
      },
      addSection : function() {
         var newSection = this.createSection();
         this.sections.push(newSection);
         return this.sections.length - 1;
      },
      hasSection : function(index) {
         return index >= 0 && index < this.sections.length;
      },
      addIngredient : function(sectionIndex) {
         if (this.hasSection(sectionIndex)) {
            this.sections[sectionIndex].addIngredient();
            return true;
         }
         return false;
      },
      addStep : function(sectionIndex) {
         if (this.hasSection(sectionIndex)) {
            this.sections[sectionIndex].addStep();
            return true;
         } 
         return false;
      },
      removeIngredient : function(sectionIndex, ingredientIndex) {
         if (this.hasSection(sectionIndex)) {
            return this.sections[sectionIndex].removeIngredient(ingredientIndex);
         }
         return false;
      },
      removeStep : function(sectionIndex, stepIndex) {
         if (this.hasSection(sectionIndex)) {
            return this.sections[sectionIndex].removeStep(stepIndex);
         }
         return false;
      }
      
   };

   modelObject.setObject(data);
   return modelObject;
   
};