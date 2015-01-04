feed.app.controller('MainController', ['$scope', '$location',
    function ($scope, $location) {

        $scope.text = "";

        $scope.search = function () {
            if ($scope.text) {
                $location.path("recipe/search?text="+$scope.text);
            }
        }
    }
]);

feed.app.controller('RecipeSearchController', ['$scope', '$stateParams', '$location', 'RecipeService', 'ErrorService',
    function ($scope, $stateParams, $location, RecipeService, ErrorService) {

        $scope.results = [];

        RecipeService
            .search($stateParams.text)
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

        $scope.recipe = feed.model.recipe.initialize($state.current.data.type);

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
