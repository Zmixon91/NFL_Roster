app.controller('RosterController', function() {
    this.test = true;
    this.myRoster = [];
    
    this.addPlayer = function(player) {
        this.myRoster.push({playerName: player.name, playerPosition: player.position, playerNumber: player.number});
    };
});