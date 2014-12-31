feed.app.controller('RecipeSearchController', ['$scope', '$location', 'RecipeService', 'ErrorService',
    function ($scope, $location, RecipeService, ErrorService) {

        $scope.text = "";
        $scope.results = [];

        $scope.search = function () {
            $scope.results = [];
            RecipeService
                .search($scope.text)
                .success(function (data, status) {
                    $scope.results = data;
                })
                .error(function (data, status) {
                    ErrorService.setTitle("An error occurred when searching for recipes.");
                    ErrorService.setMessage(data);
                    $location.path("/error");
                });
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

        $scope.addSection = function () {
            $scope.recipe.addSection(3, 1);
        };
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
        $scope.create = function () {
            RecipeService
                .create($scope.recipe.asApiObject())
                .success(function (data, status) {
                    $scope.recipe.setId(data);
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

feed.app.controller('RecipeViewController', ['$scope',
    function ($scope) {

    }
]);

feed.app.controller('ErrorController', [ '$scope', 'ErrorService',
    function($scope, ErrorService) {

        $scope.title = ErrorService.getTitle();
        $scope.message = ErrorService.getMessage();
        ErrorService.reset();
   }
]);
