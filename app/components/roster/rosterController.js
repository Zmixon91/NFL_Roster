app.controller('RosterController', function () {
    // Define Controller Vars
    var self = this
    this.myRoster = [];
    this.nFLRoster = [];
    // Add Player to Roster
    this.addPlayer = function (player) {
        this.myRoster.push({ playerName: player.name, playerPosition: player.position, playerNumber: player.number });
    };
    // Remove Player from Roster
    this.removePlayer = function (target) {
        this.myRoster.splice(target, 1);
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
        this.myRoster = this.nFLRoster.filter(filterTeam);
        console.log(this.myRoster.length);
    }

});