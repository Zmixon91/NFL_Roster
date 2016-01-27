var removeButton = jQuery('.btn-danger');

function removePlayer(e) {
    var btn = $(e.target);
    var card = btn.closest('.playerCard');
    var myID = parseInt(card.attr('id')) - 1;
    myRoster.forEach(function (player) {
        if (player.id === myID) {
            myRoster.splice(player.id, 1);
        }
    });
    card.remove();
    drawRoster();
}

var submitButton = jQuery('#mySubmit');

function addPlayer(e) {
    e.preventDefault(); 
    var playerName = $("[name='playerName']").val();
    var playerPosition = $("[name='playerPosition']").val();
    var playerNumber = $("[name='playerNumber']").val();
    myRoster.push(new Player(playerName, playerPosition, playerNumber));
    drawRoster();
}

removeButton.click(removePlayer);
submitButton.click(addPlayer);