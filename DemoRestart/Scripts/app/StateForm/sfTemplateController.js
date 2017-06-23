demoRestartApp.controller("sfTemplateController",
    function sfTemplateController($scope, $routeParams, $location, DataService) {
        if ($routeParams.stateId) {
            $scope.ActionTxt = "Edit";
            DataService.getState($routeParams.stateId).then(function (response) {
                $scope.state = response.data;
            })
        } else {
            $scope.ActionTxt = "Add";
            $scope.state = {};
        }

        $scope.editableState = angular.copy($scope.state);

        $scope.btnSubmitClick = function () {
            if ($scope.editableState != 0) {
                DataService.editState($scope.editableState).then(function (response) {
                })
            } else {
                DataService.addState($scope.editableState).then(function (response) {
                })
            }
            $scope.state = angular.copy($scope.editableState);
            $location.path('/state');
        }
});