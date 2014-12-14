//main controller: receives data in and assigns it to a $scope holder
//config for pop-up second screen is also here, template linked here as well


angular.module('iceCreamApp')
    .controller('mainCtrl', ["$scope", "ngDialog", "$http", function mainCtrl($scope, ngDialog, $http) {


$scope.searchOptions = {
SainsActive: true,
TescoActive: true,
MorriActive: true,
OcadoActive: true,
AsdaActive: true,
WaitrActive: true
}

$scope.orderByField = '-dealDiff';

 $http.get('http://lit-eyrie-4678.herokuapp.com/').
    success(function(data, status, headers, config) {
      $scope.arrayProductData = data;
      $scope.arrayProductData.forEach(function(item){
        findLowestPrice(item);
      }
      )
      
      
      
    }).
    error(function(data, status, headers, config) {
      // log error
    });
    
    
    
    function findLowestPrice(iceCreamObj) {
      
      var pricearray=[];
      var activearray=[];
      iceCreamObj.avgPrice = "NA";
      iceCreamObj.lowestPrice = "NA";
      iceCreamObj.dealDiff = "NA";
      //DRY adam
      if(iceCreamObj.SainsPrice>0&&$scope.searchOptions.SainsActive) activearray.push(iceCreamObj.SainsPrice);
      if(iceCreamObj.TescoPrice>0&&$scope.searchOptions.TescoActive) activearray.push(iceCreamObj.TescoPrice);
      if(iceCreamObj.MorriPrice>0&&$scope.searchOptions.MorriActive) activearray.push(iceCreamObj.MorriPrice);
      if(iceCreamObj.OcadoPrice>0&&$scope.searchOptions.OcadoActive) activearray.push(iceCreamObj.OcadoPrice);
      if(iceCreamObj.AsdaPrice>0&&$scope.searchOptions.AsdaActive)activearray.push(iceCreamObj.AsdaPrice);
      if(iceCreamObj.WaitrPrice>0&&$scope.searchOptions.WaitrActive) activearray.push(iceCreamObj.WaitrPrice);
      
      if(iceCreamObj.SainsPrice>0) pricearray.push(iceCreamObj.SainsPrice);
      if(iceCreamObj.TescoPrice>0) pricearray.push(iceCreamObj.TescoPrice);
      if(iceCreamObj.MorriPrice>0) pricearray.push(iceCreamObj.MorriPrice);
      if(iceCreamObj.OcadoPrice>0) pricearray.push(iceCreamObj.OcadoPrice);
      if(iceCreamObj.AsdaPrice>0)pricearray.push(iceCreamObj.AsdaPrice);
      if(iceCreamObj.WaitrPrice>0) pricearray.push(iceCreamObj.WaitrPrice);
      
        
      iceCreamObj.avgPrice = Array.avg(pricearray);
      
      if(activearray.length>0) {
      iceCreamObj.lowestPrice = Array.min(activearray);
      iceCreamObj.dealDiff = iceCreamObj.avgPrice - iceCreamObj.lowestPrice;
      //iceCreamObj.dealPercent = (iceCreamObj.dealDiff/iceCreamObj.avgPrice)*100;
        
      }
      
      return iceCreamObj;
    }
    
    
    Array.min = function( array ){
    return Math.min.apply( Math, array );
};

    Array.avg = function( array ){
    
    var sum = 0;
      for( var i = 0; i < array.length; i++ ){
          sum += array[i];
      }
      
      return sum/array.length;
    
};

$scope.isNumber = angular.isNumber;

$scope.submit = function (newSearchOptions) {
    
    $scope.searchOptions = newSearchOptions;
    for (var item in $scope.arrayProductData) {
      findLowestPrice($scope.arrayProductData[item]);
    }

}

    $scope.advancedSearch = function () {
        ngDialog.open({
            templateUrl: './views/advanced-search.html',
            className: 'ngdialog-theme-plain',
            overlay: false,
            scope: $scope
        });
    };
    
    
    $scope.about = function () {
        ngDialog.open({
            templateUrl: './views/about-icescanner.html',
            className: 'ngdialog-theme-plain',
            overlay: false,
            scope: $scope
        });
    };




}]);