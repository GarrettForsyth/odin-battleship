import { Player } from '../player.js';

let player1;
let player2;
let comp1;
beforeEach(() => {
  player1 = Player.createHumanPlayer();
  player2 = Player.createHumanPlayer();
  comp1 = Player.createRandomAI();
});

test('a player can attack another player\'s board' , ()=> {
  player2.board.placeShip(0, 'h', 3);

  expect(player2.board.isGameOver()).toBe(false);

  player1.attack(player2, 0);
  player1.attack(player2, 1);
  player1.attack(player2, 2);

  expect(player2.board.isGameOver()).toBe(true);
});

