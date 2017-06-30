demoRestartApp.controller("cfTemplateController",
    function sfTemplateController($scope, $routeParams, $location, $timeout, Upload, DataService) {
        if ($routeParams.categoryId) {
            $scope.ActionTxt = "Edit";
            DataService.getCategory($routeParams.categoryId)
                .then(function (response) {
                    $scope.category = response.data;
                    var file = new Blob([$scope.category.picture], { type: 'image/jpeg' });
                    $scope.imgfile = file;
                }, function (response) {
                    $scope.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage) {
                        $scope.message += response.data.exceptionMessage;
                    }
                })
        } else {
            $scope.ActionTxt = "Add";
            $scope.category = {};
        }

        $scope.btnSubmitClick = function () {
            if ($routeParams.categoryId) {
                DataService.editCategory($scope.category)
                    .then(function (response) {
                        GoBack();
                    }, function (response) {
                        $scope.message = response.statusText + "\r\n";
                        if (response.data.modelState) {
                            for (var key in response.data.modelState) {
                                $scope.message += response.data.modelState[key] + "\r\n";
                            }
                        }
                        if (response.data.exceptionMessage) {
                            $scope.message += response.data.exceptionMessage;
                        }
                    })
            } else {
                DataService.addCategory($scope.category)
                    .then(function (response) {
                        GoBack();
                    }, function (response) {
                        $scope.message = response.statusText + "\r\n";
                        if (response.data.modelState) {
                            for (var key in response.data.modelState) {
                                $scope.message += response.data.modelState[key] + "\r\n";
                            }
                        } 
                        if (response.data.exceptionMessage) {
                            $scope.message += response.data.exceptionMessage;
                        }
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