angular.module('iceCreamApp', ['ngDialog']);

//app is main Angular instance, ngDialog controls pop-up full screen and is loaded on index.html

angular.module('iceCreamApp')

    .directive("fixedHeader", function () {
    return {
        restrict: "E",
        templateUrl: "./views/fixed-header.html"
    };
})

//view for a row display of a journey on first page
.directive("basicJourney", function () {
    return {
        restrict: "E",
        templateUrl: "./views/basic-journey.html"
    };
})

//view for a row display of a journey on first page
.directive("detailJourney", function () {
    return {
        restrict: "E",
        templateUrl: "./views/detail-journey.html"
    };
})
