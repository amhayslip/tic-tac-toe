
// Using NaN instead of null is a clever hack. See checkForWinner for details.

var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

veggiewins = []
junkfoodwins = []

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;
var winner = null;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
    // TODO: Check for rest of game winning cases
  )
  {
    winner = currentPlayer
    

  $(document).on('game-win', function (e, winner) {
      console.log(winner + ' has won');
  });

  $(document).trigger('game-win', winner );
    // TODO: Trigger 'game-win' event with the winning player as the event data
  }
};


$(document).on('click', '#board .space', function (e) {
var spaceNum = $(e.currentTarget).index();
  if (spaces[spaceNum]) {
     alert("You can't do that!");
     console.log(spaces[spaceNum]);
  }
  else {
     console.log(currentPlayer + ' clicked on space #' + spaceNum);
  // Mark the space with the current player's name
  // TODO: Don't mark it unless the space is blank
     spaces[spaceNum] = currentPlayer;
  // Add class to elem so css can take care of the visuals
     $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
  checkForWinner();
  setNextTurn();
  }
});

$(document).on('game-win', function (e, winner) {
    alert(winner + " has won!");
  // TODO: Alert who won the game CHECK
});



// Start the game
setNextTurn();
