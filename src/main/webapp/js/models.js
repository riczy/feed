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
           addIngredient : function(item, quantity, measurement) {
              this.ingredients.push({
                 quantity: quantity || "",
                 measurement: measurement || "",
                 item: item || "",
                 isEmpty : function() {
                 	return feed.isEmpty(this.quantity) &&
                 		feed.isEmpty(this.measurement) && feed.isEmpty(this.item);
                 }
              }); 
           },
           removeIngredient : function(index) {
              if (index >= 0 && index < this.ingredients.length) {
                 this.ingredients.splice(index, 1);
                 return true;
              }
              return false;
           },
           addStep : function(text) {
              this.steps.push({
                 text: text || "",
                 isEmpty : function() {
                 	return feed.isEmpty(this.text);
                 }
              });
           },
           removeStep : function(index) {
              if (index >= 0 && index < this.steps.length) {
                 this.steps.splice(index, 1);
                 return true;
              }
              return false;
           },
           compressedCopy : function() {
	           function compress(collection) {
	              var compressedCollection = [];
	           	  for (var i = 0; i < collection.length; i++) {
	           	     if (!collection[i].isEmpty()) {
	           	     	compressedCollection.push(collection[i]);
	           	     }
	           	  }
	           	  return compressedCollection;
	           };
           	  var obj = { title : this.title };
           	  obj.steps = compress(this.steps);
           	  obj.ingredients = compress(this.ingredients);
           	  
           	  return ((obj.title || obj.title.length == 0) && 
           	  	 obj.steps.length == 0 && obj.ingredients.length == 0) ? null : obj;
           },
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
      },
      compressedCopy : function() {
      	 var obj = {
           title : this.title,
           description : this.description,
           sections : []
      	 };
      	 
      	 for (var i = 0; i < this.sections.length; i++) {
      	 	var tempSection = this.sections[i].compressedCopy();
      	 	if (tempSection) {
      	 		obj.sections.push(tempSection);
      	 	}
      	 }
      	 return obj;
      }
      
   };

   modelObject.setObject(data);
   return modelObject;
   
};