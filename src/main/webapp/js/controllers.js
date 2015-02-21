feed.app.controller('NavController', ['$scope', '$state', 'RecipeService', 'ErrorService',
    function ($scope, $state, RecipeService, ErrorService) {

        $scope.text = "";

        $scope.search = function () {
            if ($scope.text) {
                $state.go("recipe-search", {text : $scope.text});

            }
        }
    }
]);

feed.app.controller('HomeController', ['$scope', '$state', 'RecipeService', 'ErrorService',
    function ($scope, $state, RecipeService, ErrorService) {

        $scope.results = [];
        $scope.resultsCount = 0;

        var pageMinimum = 1,
            page = pageMinimum,
            pageSize = 4;

        fetchResultsCount = function() {
            RecipeService
                .count({})
                .success(function (data, status) {
                    $scope.resultsCount = data;
                })
                .error(function (data, status) {
                    ErrorService.setTitle("An error occurred when fetching the recipes.");
                    ErrorService.setMessage(data);
                    $state.go("error");
                });
        };

        fetchPage = function() {
            RecipeService
                .search({
                    page : page,
                    pageSize : pageSize,
                    sortBy : "modifiedDateDescending"
                })
                .success(function (data, status) {
                    $scope.results = data;
                })
                .error(function (data, status) {
                    ErrorService.setTitle("An error occurred when fetching the recipes.");
                    ErrorService.setMessage(data);
                    $state.go("error");
                });
        };

        $scope.canGoNext = function() {
            return $scope.resultsCount >= (page * pageSize) + 1;
        };

        $scope.canGoPrevious = function() {
            return page > pageMinimum;
        };

        $scope.next = function() {
            if ($scope.canGoNext()) {
                page++;
                fetchPage();
            }
        };

        $scope.previous = function() {
            if ($scope.canGoPrevious()) {
                page--;
                fetchPage();
            }
        };

        $scope.view = function(id) {
            $state.go("recipe-view", {id : id});
        };

        fetchResultsCount();
        fetchPage();

    }
]);

feed.app.controller('RecipeSearchController', ['$scope', '$stateParams', '$state', 'RecipeService', 'ErrorService',
    function ($scope, $stateParams, $state, RecipeService, ErrorService) {

        $scope.results = [];

        RecipeService
            .search($stateParams)
            .success(function (data, status) {
                $scope.results = data;
            })
            .error(function (data, status) {
                ErrorService.setTitle("An error occurred when searching for recipes.");
                ErrorService.setMessage(data);
                $state.go("error");
            });

        $scope.view = function(id) {
            $state.go("recipe-view", {id : id});
        };

    }
]);

feed.app.controller('RecipeAddController', ['$scope', '$state', '$stateParams', 'RecipeService', 'MeasurementService', 'ErrorService',
    function ($scope, $state, $stateParams, RecipeService, MeasurementService, ErrorService) {

        var editMode = !feed.isEmpty($stateParams.id);

        MeasurementService.getAll()
            .success(function(data, status) {
                $scope.measurements = data;
            })
            .error(function(data, status) {
                $scope.measurements = [{name: "tablespoon"},{name: "teaspoon"},{name: "cup"}];
            });

        $scope.addIngredient = function (sectionIndex) {
            $scope.recipe.addIngredient(sectionIndex);
        };
        $scope.addStep = function (sectionIndex) {
            $scope.recipe.addStep(sectionIndex);
        };
        $scope.removeIngredient = function (sectionIndex, ingredientIndex) {
            $scope.recipe.removeIngredient(sectionIndex, ingredientIndex);
        };
        $scope.removeStep = function (sectionIndex, stepIndex) {
            $scope.recipe.removeStep(sectionIndex, stepIndex);
        };
        $scope.save = function () {
            var obj = $scope.recipe.asApiObject();
            var response = ($scope.recipe.id) ?
                RecipeService.update(obj) : RecipeService.create(obj);

            response
                .success(function (data, status) {
                    $scope.recipe.setObject(data);
                })
                .error(function (data, status) {
                    ErrorService.setTitle("An error occurred when saving the recipe.");
                    ErrorService.setMessage(data);
                    $state.go("error");
                });
        };

        if (editMode) {
            RecipeService.fetch($stateParams.id)
                .success(function(data, status) {
                    $scope.recipe = feed.model.recipe.create(data);
                })
                .error(function(data, status) {
                    ErrorService.setTitle("An error occurred when fetching the recipe.");
                    ErrorService.setMessage(data);
                    $state.go("error");
                })
        } else {
            $scope.recipe = feed.model.recipe.initialize({format : $state.current.data.type});
        }
    }
]);

feed.app.controller('RecipeViewController', ['$scope', '$stateParams', '$state', 'RecipeService', 'ErrorService',
    function ($scope, $stateParams, $state, RecipeService, ErrorService) {

        $scope.recipe = {};

        RecipeService
            .fetch($stateParams.id)
            .success(function (data, status) {
                $scope.recipe = data;
            })
            .error(function (data, status) {
                ErrorService.setTitle("An error occurred when searching for the recipe.");
                ErrorService.setMessage(data);
                $state.go("error");
            });

        $scope.edit = function() {
            $state.go("recipe-edit", {id : $stateParams.id});
        };

        $scope.delete = function() {
            RecipeService
                .delete($stateParams.id)
                .success(function(data, status) {
                    $state.go("home");
                })
                .error(function (data, status) {
                    ErrorService.setTitle("An error occurred when deleting a recipe.");
                    ErrorService.setMessage(data);
                    $state.go("error");
                });
        };

    }
]);

feed.app.controller('ErrorController', [ '$scope', 'ErrorService',
    function($scope, ErrorService) {

        $scope.title = ErrorService.getTitle();
        $scope.message = ErrorService.getMessage();
        ErrorService.reset();
    }
]);
