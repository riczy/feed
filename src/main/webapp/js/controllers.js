feed.app.controller('NavController', ['$scope', '$location', 'RecipeService', 'ErrorService',
    function ($scope, $location, RecipeService, ErrorService) {

        $scope.text = "";

        $scope.search = function () {
            if ($scope.text) {
                $location.url("recipe/search?text="+$scope.text);
            }
        }
    }
]);

feed.app.controller('HomeController', ['$scope', '$location', 'RecipeService', 'ErrorService',
    function ($scope, $location, RecipeService, ErrorService) {

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
                    $location.path("/error");
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
                    $location.path("/error");
                });
        };

        getCurrentPageMin = function() {
            return ((page - 1) * pageSize) + 1;
        };

        getCurrentPageMax = function() {
            return page * pageSize;
        };

        $scope.canGoNext = function() {
            return $scope.resultsCount >= getCurrentPageMax() + 1;
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
            $location.path("recipe/" + id);
        };

        fetchResultsCount();
        fetchPage();

    }
]);

feed.app.controller('RecipeSearchController', ['$scope', '$stateParams', '$location', 'RecipeService', 'ErrorService',
    function ($scope, $stateParams, $location, RecipeService, ErrorService) {

        $scope.results = [];

// todo: changed from $stateParams.text. not working though. what is  in $dtateParams?
        RecipeService
            .search($stateParams)
            .success(function (data, status) {
                $scope.results = data;
            })
            .error(function (data, status) {
                ErrorService.setTitle("An error occurred when searching for recipes.");
                ErrorService.setMessage(data);
                $location.path("/error");
            });
        $scope.view = function(id) {
            $location.path("recipe/" + id);
        };

    }
]);

feed.app.controller('RecipeAddController', ['$scope', '$state', '$location', 'RecipeService', 'MeasurementService', 'ErrorService',
    function ($scope, $state, $location, RecipeService, MeasurementService, ErrorService) {

        $scope.recipe = feed.model.recipe.initialize({format : $state.current.data.type});

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
                    $location.path("/error");
                });
        };
    }
]);

feed.app.controller('RecipeEditController', ['$scope', '$stateParams',
    function ($scope, $stateParams) {
        $scope.pageTitle = "Recipe " + $stateParams.id;

    }
]);

feed.app.controller('RecipeViewController', ['$scope', '$stateParams', '$location', 'RecipeService', 'ErrorService',
    function ($scope, $stateParams, $location, RecipeService, ErrorService) {

        $scope.recipe = {};

        RecipeService
            .fetch($stateParams.id)
            .success(function (data, status) {
                $scope.recipe = data;
            })
            .error(function (data, status) {
                ErrorService.setTitle("An error occurred when searching for the recipe.");
                ErrorService.setMessage(data);
                $location.path("/error");
            });

    }
]);

feed.app.controller('ErrorController', [ '$scope', 'ErrorService',
    function($scope, ErrorService) {

        $scope.title = ErrorService.getTitle();
        $scope.message = ErrorService.getMessage();
        ErrorService.reset();
   }
]);
