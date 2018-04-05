import { Battleship } from './battleship.js';

export const Player = {
  createHumanPlayer: function() {
    return {
      board: Battleship.createBoard(),

      /* attacks coord of opponent's board */
      attack: function(opponent, coord) {
        opponent.board.receiveAttack(coord);
      }
    };
  },

  createRandomAI: function() {
    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function getRemainingSqaures() {
      let remainingSquares = [];
      const GRIDSIZE = 100;
      for (let i = 0; i < GRIDSIZE; i++) {
        remainingSquares.push(i);
      }
      return shuffle(remainingSquares);
    }

    return {
      board: Battleship.createBoard(),

      remainingSquares: getRemainingSqaures(),

      attack: function(opponent){
        opponent.board.receiveAttack(this.remainingSquares.pop());
      }

    };
  }
};
