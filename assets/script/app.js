// Roster var
var myRoster = [];
var id = 0;

// Player Constructor
function Player(name, position, playerNumber) {
    this.id = id++
    this.name = name;
    this.position = position;
    this.playerNumber = playerNumber;
    this.card = '<div class="playerCard" id="' + id + '"><input type="button" id="1" class="btn btn-danger" value="Remove"><div><img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" alt=""><p>' + name + '</p><p>' + position + '</p><p>' + playerNumber + '</p></div></div>';
};
// Draw roster to screen
function drawRoster() {
    $('.player-roster').empty();
    myRoster.forEach(function (player) {
        $('.player-roster').append(player.card);
    });
};

/*
<div class="player-card">
    <input type="button" class="btn btn-danger" value="Remove">
    <div>
        <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" alt="">
        <p>Player Name</p>
        <p>Position</p>
        <p>#27</p>
    </div>
</div>
*/