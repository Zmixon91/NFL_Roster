var removeButton = jQuery('.btn-danger');

function removePlayer(e) {
    var btn = $(e.target);
    var card = btn.closest('.playerCard');
    var myID = parseInt(card.attr('id')) - 1;
    myRoster.forEach(function (player, i) {
        if (player.id === myID) {
            myRoster.splice(i, 1);
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

$('.player-roster').on('click', '.btn-danger', removePlayer);
submitButton.click(addPlayer);