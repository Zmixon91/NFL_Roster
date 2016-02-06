var app = angular.module('rosterModule', []);
// Roster Controller
app.controller('RosterController', function ($scope) {
    // Define Controller Vars
    $scope.nFLRoster = [];
    $scope.myRoster = [];
    // Add Player to Roster
    $scope.addPlayer = function (player) {
        var defaultPhoto = 'https://auth.cbssports.com/images/players/unknown-player-170x170.png';
        $scope.myRoster.push({ fullname: player.name, position: player.position, jersey: player.number, photo: defaultPhoto });
    };
    // Remove Player from Roster
    $scope.removePlayer = function (target) {
        $scope.myRoster.splice(target, 1);
    }
    // Grab CBS API
    $scope.getAPI = function () {
        var url = "http://bcw-getter.herokuapp.com/?url=";
        var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(url2);
        $.get(apiUrl).success(function (res) {
            var jsonToObj = JSON.parse(res);
            $scope.nFLRoster = jsonToObj.body.players;
        })
    }

    $scope.sortAPI = function () {
        // Sort only pro players
        function filterProStatus(obj) {
            if (obj.pro_status === "A") {
                return true;
            }
        }
        // Sort to only players with Jersey numbers
        function filterJersey(obj) {
            if (obj.hasOwnProperty("jersey")) {
                return true;
            }
        }
        console.log($scope.nFLRoster.length);
        $scope.nFLRoster = $scope.nFLRoster.filter(filterProStatus);
        console.log($scope.nFLRoster.length);
        $scope.nFLRoster = $scope.nFLRoster.filter(filterJersey);
        console.log($scope.nFLRoster.length);
    }

    $scope.showTeam = function (filt) {
        // Filter to a specific team
        function filterTeam(obj) {
            if (obj.pro_team === filt) {
                return true;
            }
        }
        $scope.myRoster = $scope.nFLRoster.filter(filterTeam);
        console.log($scope.myRoster.length);
    }
    // Clear the Roster
    $scope.clearRoster = function () {
        $scope.myRoster = [];
        console.log($scope.myRoster.length);
    }

});
app.directive('playerCard', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/components/roster/playerCard.html'
    };
});