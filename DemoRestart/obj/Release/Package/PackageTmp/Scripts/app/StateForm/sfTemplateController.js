demoRestartApp.controller("sfTemplateController",
    function sfTemplateController($scope, $routeParams, $location, DataService, cfpLoadingBar) {
        if ($routeParams.stateId) {
            $scope.ActionTxt = "Edit";
            cfpLoadingBar.start();
            DataService.getState($routeParams.stateId)
                .then(function (response) {
                    $scope.state = response.data;
                }, function (response) {

                }).finally(function () {
                    cfpLoadingBar.complete();
                });
        } else {
            $scope.ActionTxt = "Add";
            $scope.state = {};
        }

        $scope.btnSubmitClick = function () {
            if ($scope.stateform.$invalid) return false;
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