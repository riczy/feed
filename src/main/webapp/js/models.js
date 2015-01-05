feed.model = feed.model || {};

feed.model.recipe = {
    SIMPLE : "simple",
    TPI : "tpi",
    TPR : "tpr"
};

feed.model.recipe.initialize = function (data) {

    var data = data || {},
        obj = feed.model.recipe.create(data);

    if (data.format == feed.model.recipe.TPI) {
        obj.createNewSection(2, 0, true, true, false);
        obj.createNewSection(2, 0, true, true, false);
        obj.createNewSection(0, 2, false, false, true);
    } else if (data.format == feed.model.recipe.TPR) {
        obj.createNewSection(2, 2, true, true, true);
        obj.createNewSection(2, 2, true, true, true);
    } else {
        obj.createNewSection(2, 2, false, true, true);
    }

    return obj;
};

feed.model.recipe.create = function (data) {

    var modelObject = {
        setObject: function (data) {
            var data = data || {};
            this.id = data.id || null;
            this.format = data.format || feed.model.recipe.SIMPLE;
            this.title = data.title || null;
            this.description = data.description || null;
            this.createdDate = data.createdDate || null;
            this.modifiedDate = data.modifiedDate || null;
            this.sections = [];
            if (data.sections) {
                for (var i = 0; i < data.sections.length; i++) {
                    this.addSection(data.sections[i]);
                }
            }
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
        /* Adds a section to this recipe instance. Uses the data values to set
         * the section object with data.
         *
         * @param   data {Object} The section object used to fill out this section.
         *
         */
        addSection: function (data) {
            data = data || {};
            data.display = data.display || {};

            var section = {
                display: {
                    showTitle: (feed.isNone(data.display.showTitle)) ? false : data.display.showTitle,
                    showIngredients: (feed.isNone(data.display.showIngredients)) ? false : data.display.showIngredients,
                    showSteps : (feed.isNone(data.display.showSteps)) ? false : data.display.showSteps
                },
                title: data.title || null,
                ingredients: [],
                steps: [],
                addIngredient: function (data) {
                    data = data || {};
                    this.ingredients.push({
                        quantity: data.quantity || null,
                        measurement: data.measurement || null,
                        item: data.item || null,
                        isEmpty: function () {
                            return feed.isEmpty(this.quantity) &&
                                feed.isEmpty(this.measurement) && feed.isEmpty(this.item);
                        }
                    });
                },
                addStep: function (data) {
                    data = data || {};
                    this.steps.push({
                        text: data.text || null,
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
            };

            if (data.ingredients) {
                for (var i = 0; i < data.ingredients.length; i++) {
                    section.addIngredient(data.ingredients[i]);
                }
            }
            if (data.steps) {
                for (var i = 0; i < data.steps.length; i++) {
                    section.addStep(data.steps[i]);
                }
            }
            this.sections.push(section);
            return section;
        },
        /**
         * Creates a new a section to this recipe instance that contains no
         * values.
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
        createNewSection: function (ingredientCount, stepCount, showTitle, showIngredients, showSteps) {
            var section = this.addSection({
                display : {
                    showTitle : feed.isNone(showTitle) ? false : showTitle,
                    showIngredients : feed.isNone(showIngredients) ? false : showIngredients,
                    showSteps : feed.isNone(showSteps) ? false : showSteps }});

            if (ingredientCount) {
                for (var i = 0; i < ingredientCount; i++) section.addIngredient();
            }
            if (stepCount) {
                for (i = 0; i < stepCount; i++) section.addStep();
            }

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