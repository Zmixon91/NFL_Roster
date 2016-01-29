// Roster var
var myRoster = [];
// Player Constructor
function Player(name, position, playerNumber) {
    this.name = name;
    this.position = position;
    this.playerNumber = playerNumber;
    drawRoster();
};

function createCard(player){
    var card = $('<div class="playerCard">');
    var myButton = $('<input type="button" class="btn btn-danger" value="Remove">');
    myButton.click(function () {
        debugger;
        card.remove();
        myRoster.splice(myRoster.indexOf(player), 1);
    });
    
    card.append(myButton);
    card.append('<div><img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" alt=""><p>' + player.name + '</p><p>' + player.position + '</p><p>' + player.playerNumber + '</p></div></div>');
    return card;
}

// Draw roster to screen
function drawRoster() {
    $('.player-roster').empty();
    myRoster.forEach(function (player) {
        $('.player-roster').append(createCard(player));
    });
};
// jQjunk
// HTML vars
var submitButton = jQuery('#mySubmit');
// Add player to page and roster
function addPlayer(e) {
    e.preventDefault();
    var playerName = $("[name='playerName']").val();
    var playerPosition = $("[name='playerPosition']").val();
    var playerNumber = $("[name='playerNumber']").val();
    myRoster.push(new Player(playerName, playerPosition, playerNumber));
    drawRoster();
}
// Page interaction
submitButton.click(addPlayer);