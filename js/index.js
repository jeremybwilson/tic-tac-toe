
// Make Your Mark
// Take Turns
// “X” and “O”
// Win Logic: align 3 in a row, in a column, or diagonally
// Declare a Tie
// The Game is Finished

/*----- constants -----*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*----- app's state (variables) -----*/
let board;
// create turn variable
let turn = 'X';
// create win variable
let win;

/*----- cached element references -----*/
// grab all our squares
const squares = Array.from(document.querySelectorAll('#board div'));

/*----- event listeners -----*/
// listen for the click on on the board
document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);

/*----- functions -----*/

// create a function iterate over the board and inject the mark into the correct divs

function getWinner(){
  // create a winner variable
  let winner = null;

  winningCombos.forEach(function(combo, index){
    if(board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
  });
  return winner ? winner : board.includes('') ? null : 'T';
};

function handleTurn(event) {
  let index = squares.findIndex(function(square){
    return square === event.target;
  });
  board[index] = turn;
  //  use ternary operator to change state of 'turn' variable
  turn = turn === 'X' ? '0' : 'X';
  win = getWinner();
  // call the render function
  render();
};

function init(){  // function to initialize game board
  // initialize the 3 x 3 grid
  board =[
    '', '', '',
    '', '', '',
    '', '', '',
  ]
  // call the render function
  render();
};

function render() {
  board.forEach(function(value, index){
    //this sets the text content of the square of the same position to the mark on the board.
    //this moves the value of the board item into the squares[index]
    squares[index].textContent = value;
  });

  // update the messages in the h2 tag
  messages.textContent = win === 'T' ? `That's a tie, queen!` : win ? `${win} wins the game!` : `It's ${turn}'s turn!`;
};

// call the function
init();
