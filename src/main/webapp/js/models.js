feed.model = feed.model || {};

feed.model.recipe = {
    SIMPLE : "simple",
    TPI : "tpi",
    TPR : "tpr"
};

feed.model.recipe.initialize = function (format) {

    var obj = feed.model.recipe.create(format);

    if (format == feed.model.recipe.TPI) {
        obj.addSection(2, 0, true, true, false);
        obj.addSection(2, 0, true, true, false);
        obj.addSection(0, 2, false, false, true);
    } else if (format == feed.model.recipe.TPR) {
        obj.addSection(2, 2, true, true, true);
        obj.addSection(2, 2, true, true, true);
    } else {
        obj.addSection(2, 2, false, true, true);
    }

    return obj;
};

feed.model.recipe.create = function (data) {

    var modelObject = {
        setObject: function (data) {
            var data = data || {};
            this.id = data.id || null;
            this.format = data.format || feed.model.recipe.SIMPLE;
            this.title = data.title || "";
            this.description = data.description || "";
            this.sections = data.sections || [];
        },
        /* Sets the id of this instance.
         *
         * @param   {String} The unique id of this recipe instance.
         */
        setId: function (id) {
            this.id = id;
        },
        /* Returns this object in the format it is expected in the API.
         *
         * @return  {Object} This object in the format expected by the API.
         */
        asApiObject: function () {
            for (var i = this.sections.length - 1; i >= 0; i--) {
                var tempSection = this.sections[i].clean();
                if (!tempSection) {
                    this.sections.splice(i, 1);
                }
            }
            return this;
        },
        createSection: function (showTitle, showIngredients, showSteps) {
            return {
                display : {
                    showTitle: showTitle,
                    showIngredients: showIngredients,
                    showSteps : showSteps
                },
                title: "",
                ingredients: [],
                steps: [],
                addIngredient: function (item, quantity, measurement) {
                    this.ingredients.push({
                        quantity: quantity || "",
                        measurement: measurement || "",
                        item: item || "",
                        isEmpty: function () {
                            return feed.isEmpty(this.quantity) &&
                                feed.isEmpty(this.measurement) && feed.isEmpty(this.item);
                        }
                    });
                },
                addStep: function (text) {
                    this.steps.push({
                        text: text || "",
                        isEmpty: function () {
                            return feed.isEmpty(this.text);
                        }
                    });
                },
                removeIngredient: function (index) {
                    if (index >= 0 && index < this.ingredients.length) {
                        this.ingredients.splice(index, 1);
                        return true;
                    }
                    return false;
                },
                removeStep: function (index) {
                    if (index >= 0 && index < this.steps.length) {
                        this.steps.splice(index, 1);
                        return true;
                    }
                    return false;
                },
                clean: function() {
                    function removeEmptyObjectsFromArray(collection) {
                        for (var i = collection.length - 1; i >= 0; i--) {
                            if (collection[i].isEmpty()) {
                                collection.splice(i, 1);
                            }
                        }
                    };
                    removeEmptyObjectsFromArray(this.steps);
                    removeEmptyObjectsFromArray(this.ingredients);

                    return (this.title && this.steps.length == 0
                        && this.ingredients.length == 0) ? null : this;

                }
                /*
                compressedCopy: function () {
                    function compress(collection) {
                        var compressedCollection = [];
                        for (var i = 0; i < collection.length; i++) {
                            if (!collection[i].isEmpty()) {
                                compressedCollection.push(collection[i]);
                            }
                        }
                        return compressedCollection;
                    };
                    var obj = { title: this.title };
                    obj.steps = compress(this.steps);
                    obj.ingredients = compress(this.ingredients);

                    return (obj.title && obj.steps.length == 0
                        && obj.ingredients.length == 0) ? null : obj;
                }
                */
            };
            return section;
        },
        /**
         * Adds a section to this recipe instance.
         *
         * @param   ingredientCount {Number} Optional. The number of blank ingredient
         *          objects to add to the section.
         * @param   stepCount {Number} Optional. The number of blank steps to add
         *          to the section.
         * @param   showTitle {boolean} Optional, defaults to false. Answers
         *          if the section title is displayed in the UI.
         * @param   showIngredients {boolean} Optional, defaults to false. Answers
         *          if the section's ingredient list is displayed in the UI.
         * @param   showSteps {boolean} Optional, defaults to false. Answers
         *          if the section's step is displayed in the UI.
         * @returns {Number} The index of the section that was added.
         */
        addSection: function (ingredientCount, stepCount, showTitle, showIngredients, showSteps) {
            var section = this.createSection(showTitle, showIngredients, showSteps);
            if (ingredientCount) {
                for (var i = 0; i < ingredientCount; i++) section.addIngredient();
            }
            if (stepCount) {
                for (i = 0; i < stepCount; i++) section.addStep();
            }
            this.sections.push(section);
            return this.sections.length - 1;
        },
        hasSection: function (index) {
            return index >= 0 && index < this.sections.length;
        },
        addIngredient: function (sectionIndex) {
            if (this.hasSection(sectionIndex)) {
                this.sections[sectionIndex].addIngredient();
                return true;
            }
            return false;
        },
        addStep: function (sectionIndex) {
            if (this.hasSection(sectionIndex)) {
                this.sections[sectionIndex].addStep();
                return true;
            }
            return false;
        },
        removeIngredient: function (sectionIndex, ingredientIndex) {
            if (this.hasSection(sectionIndex)) {
                return this.sections[sectionIndex].removeIngredient(ingredientIndex);
            }
            return false;
        },
        removeStep: function (sectionIndex, stepIndex) {
            if (this.hasSection(sectionIndex)) {
                return this.sections[sectionIndex].removeStep(stepIndex);
            }
            return false;
        },
        /* Answers true if this is a simple recipe format and false if not.
         */
        isSimple: function() {
            return this.format == feed.model.recipe.SIMPLE;
        },
        /* Answers true if this is a two-part ingredient recipe format and false
         * if not.
         */
        isTpi: function() {
            return this.format == feed.model.recipe.TPI;
        },
        /* Answers true if this is a two-part recipe format and false if not.
         */
        isTpr: function() {
            return this.format == feed.model.recipe.TPR;
        }

    };

    modelObject.setObject(data);
    return modelObject;

};