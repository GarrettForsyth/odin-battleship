import '../assets/sass/main.scss';
import { View } from './View.js';
import { Player } from './player.js';

let player1;
let player2;
function startGame() {
  player1 = Player.createHumanPlayer();
  player2 = Player.createRandomAI();
}

function placePieces(player) {
  player.board.placeShip(0,'h',3);
  player.board.placeShip(9,'v',4);
  player.board.placeShip(55,'v',3);
  player.board.placeShip(24,'h',4);
  player.board.placeShip(90,'h',2);
  player.board.placeShip(30,'v',5);
  player.board.placeShip(77,'v',3);
}

startGame();
placePieces(player1);
placePieces(player2);

let boardView = document.querySelector('.player-board');
let targetView = document.querySelector('.target-board');

function attackSquare() {
  if(!player1.board.isGameOver()) {
    player1.attack(player2, parseInt(this.dataset.squareNum));

  }
  else alert('Game Over!');
  if(!player2.board.isGameOver()) computerTurn();
  else alert('Game Over!');
  View.renderBoard(boardView, player1.board, false);
  View.renderBoard(targetView, player2.board, true, attackSquare);
}

function computerTurn(){
  player2.attack(player1);
}

View.renderBoard(boardView, player1.board, false);
View.renderBoard(targetView, player2.board, true, attackSquare);








