(function () {
    var app = angular.module('rosterModule', []);
    // Roster Controller
    app.controller('RosterController', ['league',function (league) {
        // Define Controller Vars
        var self = this
        this.nFLRoster = [];
        // Add Player to Roster
        this.addPlayer = function (player) {
            var defaultPhoto = 'https://auth.cbssports.com/images/players/unknown-player-170x170.png';
            league.myRoster.push({ fullname: player.name, position: player.position, jersey: player.number, photo: defaultPhoto });
        };
        // Remove Player from Roster
        this.removePlayer = function (target) {
            league.myRoster.splice(target, 1);
        }
        // Grab CBS API
        this.getAPI = function () {
            var url = "http://bcw-getter.herokuapp.com/?url=";
            var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
            var apiUrl = url + encodeURIComponent(url2);
            $.get(apiUrl).success(function (res) {
                var jsonToObj = JSON.parse(res);
                self.nFLRoster = jsonToObj.body.players;
            })
        }

        this.sortAPI = function () {
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
            console.log(this.nFLRoster.length);
            this.nFLRoster = this.nFLRoster.filter(filterProStatus);
            console.log(this.nFLRoster.length);
            this.nFLRoster = this.nFLRoster.filter(filterJersey);
            console.log(this.nFLRoster.length);
        }

        this.showTeam = function (filt) {
            // Filter to a specific team
            function filterTeam(obj) {
                if (obj.pro_team === filt) {
                    return true;
                }
            }
            league.myRoster = this.nFLRoster.filter(filterTeam);
            console.log(league.myRoster.length);
        }
        // Clear the Roster
        this.clearRoster = function () {
            league.myRoster = [];
            console.log(league.myRoster.length);
        }

    }]);
    app.directive('playerCard', ['league',function() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/roster/playerCard.html'
        };
    }]);
})();