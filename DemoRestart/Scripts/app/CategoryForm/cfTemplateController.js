demoRestartApp.controller("cfTemplateController",
    function sfTemplateController($scope, $routeParams, $location, $timeout, Upload, DataService) {
        if ($routeParams.categoryId) {
            $scope.ActionTxt = "Edit";
            DataService.getCategory($routeParams.categoryId).then(function (response) {
                $scope.category = response.data;
                var file = new Blob([$scope.category.picture], { type: 'image/jpeg' });
                $scope.imgfile = file;
            })
        } else {
            $scope.ActionTxt = "Add";
            $scope.category = {};
        }

        $scope.btnSubmitClick = function () {
            if ($routeParams.categoryId) {
                DataService.editCategory($scope.category).then(function (response) {
                    GoBack();
                })
            } else {
                DataService.addCategory($scope.category).then(function (response) {
                    GoBack();
                })
            }
        }

        var GoBack = function () {
            $location.path('/category');
        };

        $scope.upload = function (file) {
            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $scope.category.picture = reader.result;
                }
                reader.readAsArrayBuffer(file);
            }
            $scope.imgfile = file;
        };
    });