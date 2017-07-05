demoRestartApp.controller("cfTemplateController",
    function sfTemplateController($scope, $routeParams, $location, $timeout, DataService, Upload, cfpLoadingBar) {
        var onError = function (response) {
            $scope.message = response.statusText + "\r\n";
            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    $scope.message += response.data.modelState[key] + "\r\n";
                }
            }
            if (response.data.exceptionMessage) {
                $scope.message += response.data.exceptionMessage;
            }
            $scope.errorOnPage = true;
        };

        if ($routeParams.categoryId) {
            $scope.ActionTxt = "Edit";
            cfpLoadingBar.start();
            DataService.getCategory($routeParams.categoryId)
                .then(function (response) {
                    $scope.category = response.data;
                    $scope.errorOnPage = false;
                }, onError)
                .finally(function () {
                    cfpLoadingBar.complete();
                });
        } else {
            $scope.ActionTxt = "Add";
            $scope.category = {};
        }

        $scope.btnSubmitClick = function () {
            if ($scope.Categoryform.$invalid) return false;

            if ($scope.category.categoryID) {
                DataService.editCategory($scope.category)
                    .then(function (response) {
                        GoBack();
                    }, onError);
            } else {
                DataService.addCategory($scope.category)
                    .then(function (response) {
                        GoBack();
                    }, onError);
            }
        };

        $scope.uploadFile = function (file) {
            if (file) {
                cfpLoadingBar.start();
                Upload.upload({
                    url: "/api/files/upload", // webapi url
                    method: "POST",
                    //data: { fileUploadObj: $scope.fileUploadObj },
                    file: file
                }).progress(function (evt) {
                    // get upload percentage
                    //console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function (data, status, headers, config) {
                    $scope.category.pictureID = data.returnData;
                    cfpLoadingBar.complete();
                }).error(function (data, status, headers, config) {
                    $scope.message = status + "\r\n";
                    $scope.errorOnPage = true;
                    cfpLoadingBar.complete();
                });
            } else {
                $scope.category.pictureID = null;
            }
        };

        var GoBack = function () {
            $location.path('/category');
        };
    });