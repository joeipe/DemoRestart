﻿demoRestartApp.controller("cfIndexController",
    function sfIndexController($scope, $location, DataService) {
        var getCategories = function () {
            DataService.getCategories().then(function (response) {
                $scope.Categories = response.data;
            });
        };

        $scope.showAddCategoryForm = function () {
            $location.path("/addCategory");
        }

        $scope.showEditCategoryForm = function (categoryId) {
            $location.path("/editCategory/" + categoryId);
        }

        $scope.deleteCategory = function (categoryId) {
            var wantToDel = confirm("Are you sure you want to delete?");
            if (wantToDel) {
                DataService.deleteCategory(categoryId).then(function (reponse) {
                    getCategories();
                });
            }
        }

        getCategories();
    });