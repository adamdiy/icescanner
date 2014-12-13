//this module pulls in data and serves it to mainCtrl
//manipulation of data is also in here: eg. calculating duration, trimming seconds
//validation could be done here as well: eg. missing train company providers

angular.module('iceCreamApp')
    .controller("journeyDataSvc", ["$http","$q","$scope", function journeyDataSvc($scope,   $http, $q) {

    var masterJson = [];
    var location = "./data/";
    var files = ["journeysWithPrices.json"];

    function reformatTimes(record) {
        var timeDepart = record.startTime.split(":");
        var timeArrive = record.arrivalTime.split(":");
        
        record.arrivalTime = timeArrive[0]+":"+timeArrive[1];
        record.startTime = timeDepart[0]+":"+timeDepart[1];
    }

    //adds duration field to each record
    function addDuration(record) {

        var timeDepart = record.startTime.split(":");
        var timeArrive = record.arrivalTime.split(":");
        
        record.arrivalTime = timeArrive[0]+":"+timeArrive[1];
        record.startTime = timeDepart[0]+":"+timeDepart[1];

        for (var i = 0; i < timeDepart.length; i++) {
            timeDepart[i] = +timeDepart[i];
        }
        for (i = 0; i < timeArrive.length; i++) {
            timeArrive[i] = +timeArrive[i];
        }

        if (!record.startTime || !record.arrivalTime) {
            record.duration = "N/A";
            return;
        }

        var setHours = function (hours) {
            parseInt(hours, 10);
        };
        
        if(timeArrive[1].length==1) timeArrive[1].length+"0";
        if(timeDepart[1].length==1) timeDepart[1].length+"0";

        setHours(timeDepart[0]);
        setHours(timeArrive[0]);

        if (timeArrive[0] < timeDepart[0]) timeArrive[0] += 24;

        var duration = ((timeArrive[0] * 60) + timeArrive[1]) - ((timeDepart[0] * 60) + timeDepart[1]);
        duration = parseInt(duration / 60) + "h" + (duration % 60) + "m";

        record.duration = duration;
    }

    //exposes service method to pass data into mainCtrl
    

    this.returnAllJourneys = function () {
        var ajaxUrl = 'http://www.mysupermarket.co.uk/Api.aspx?Command={"Output":"JSONP","Commands":[{"Name":"Basket","Params":{"ProductPrices":{"117":["Waitrose","ASDA","Morrisons","Ocado","Sainsburys","Tesco"],"121":["Waitrose","ASDA","Morrisons","Ocado","Sainsburys","Tesco"],"205":["Waitrose","ASDA","Morrisons","Ocado","Sainsburys","Tesco"],"564":["Waitrose","ASDA","Morrisons","Ocado","Sainsburys","Tesco"],"236204":["Waitrose","ASDA","Morrisons","Ocado","Sainsburys","Tesco"],"277075":["Waitrose","ASDA","Morrisons","Ocado","Sainsburys","Tesco"]}}}]}&banner=34';
        
        $.jsonp({
        url: ajaxUrl,
        callbackParameter: "callback",
        callback: "callbackForActivate"
    });

return callbackForActivate = function (response) {
    var result = response[0].Result;
    allData = result.ProductPrices;
    alert(JSON.stringify(allData));
    return allData;
}
        
        
        // return $http.jsonp(ajaxUrl).success(function(data, status, headers, config){
        //     alert(status);
        //     return data;
        // });
    };

        
      


}]);