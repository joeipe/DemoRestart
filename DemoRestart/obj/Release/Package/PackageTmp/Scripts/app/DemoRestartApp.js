var demoRestartApp = angular.module("demoRestartApp", ["ngRoute", "ngFileUpload", "angular-loading-bar"]);

demoRestartApp.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "/Scripts/app/HomeForm/hfIndex.html"
        })
        .when("/state", {
            templateUrl: "/Scripts/app/StateForm/sfIndex.html",
            controller: "sfIndexController"
        })
        .when("/addState", {
            templateUrl: "/Scripts/app/StateForm/sfTemplate.html",
            controller: "sfTemplateController"
        })
        .when("/editState/:stateId", {
            templateUrl: "/Scripts/app/StateForm/sfTemplate.html",
            controller: "sfTemplateController"
        })
        .when("/category", {
            templateUrl: "/Scripts/app/CategoryForm/cfIndex.html",
            controller: "cfIndexController"
        })
        .when("/addCategory", {
            templateUrl: "/Scripts/app/CategoryForm/cfTemplate.html",
            controller: "cfTemplateController"
        })
        .when("/editCategory/:categoryId", {
            templateUrl: "/Scripts/app/CategoryForm/cfTemplate.html",
            controller: "cfTemplateController"
        })
        .otherwise({ redirectTo: "/home" });
});