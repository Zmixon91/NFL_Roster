(function () {
    var app = angular.module('nFLRoster', ['rosterModule']);
    app.factory('league',function() {
        var myRoster = [];
        return myRoster;
    });
})();