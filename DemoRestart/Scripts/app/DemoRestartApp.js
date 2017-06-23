var demoRestartApp = angular.module("demoRestartApp", ["ngRoute"]);

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
        .otherwise({ redirectTo: "/home" });
});