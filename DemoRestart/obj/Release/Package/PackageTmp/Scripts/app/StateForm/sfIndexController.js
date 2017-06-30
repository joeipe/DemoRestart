demoRestartApp.controller("sfIndexController", 
    function sfIndexController($scope, $location, DataService) {
        var getStates = function () {
            DataService.getStates()
                .then(function (response) {
                    $scope.states = response.data;
                }, function (response) {

                });
        };

        $scope.showAddStateForm = function () {
            $location.path("/addState");
        }

        $scope.showEditStateForm = function (stateId) {
            $location.path("/editState/" + stateId);
        }

        $scope.deleteState = function (stateId) {
            var wantToDel = confirm("Are you sure you want to delete?");
            if (wantToDel) {
                DataService.deleteState(stateId)
                    .then(function (reponse) {
                        getStates();
                    }, function (response) {

                    });
            }
        }

        getStates();
});