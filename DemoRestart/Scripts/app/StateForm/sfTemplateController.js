demoRestartApp.controller("sfTemplateController",
    function sfTemplateController($scope, $routeParams, $location, DataService) {
        if ($routeParams.stateId) {
            $scope.ActionTxt = "Edit";
            DataService.getState($routeParams.stateId)
                .then(function (response) {
                    $scope.state = response.data;
                }, function (response) {

                })
        } else {
            $scope.ActionTxt = "Add";
            $scope.state = {};
        }

        $scope.btnSubmitClick = function () {
            if ($routeParams.stateId) {
                DataService.editState($scope.state)
                    .then(function (response) {
                        GoBack();
                    }, function (response) {
                        
                    })
            } else {
                DataService.addState($scope.state)
                    .then(function (response) {
                        GoBack();
                    }, function (response) {
                        
                    })
            }
        }

        var GoBack = function () {
            $location.path('/state');
        };
});