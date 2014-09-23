/**
 * Relies on app-init.js being loaded first.
 */

feed = feed || {};
feed.model = feed.model || {};
feed.model.recipe = {};

feed.model.recipe.templates = {
   simple : function() {
      var obj = feed.model.recipe.create();
      obj.addSection(3, 2);
      return obj;
   },
   twoPartIngredient : function() {
      var obj = feed.model.recipe.create();
      obj.addSection(2, 0);
      obj.addSection(2, 2);
      return obj;
   },
   twoPartRecipe : function () {
      var obj = feed.model.recipe.create();
      obj.addSection(2, 2);
      obj.addSection(2, 2);
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
                 measurement: "",
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
      /**
       * @description
       * Adds a section to this instance.
       * 
       * @param   ingredientCount {Number} Optional. The number of blank ingredient
       *          objects to add to the section.
       * @param   stepCount {Number} Optional. The number of blank steps to add
       *          to the section.
       * @returns {Number} The index of the section that was added.
       */
      addSection : function(ingredientCount, stepCount) {
         var section = this.createSection();
         if (ingredientCount) {
            for (var i = 0; i < ingredientCount; i++) section.addIngredient();
         }
         if (stepCount) {
            for (i = 0; i < stepCount; i++) section.addStep();
         }
         this.sections.push(section);
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