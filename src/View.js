export const View = {
  /*
   * DOMElement - the element to append the grid sqaures to.
   * Board - the player's board containing what's in each square
   * isTargetBoard - if true, will not render ship squares
   * clickFunction - function called when a square is clicked
   */
  renderBoard: function(DOMElement, board, isTargetBoard, clickFunction) {
    this.clearParent(DOMElement);

    const BOARD_SIZE = 100;
    for (let i = 0; i < BOARD_SIZE; i++) {
      let newSquare = document.createElement('div');
      newSquare.classList.add('square');
      this.addSquareContentClass(board, newSquare, i, isTargetBoard);
      newSquare.setAttribute('data-square-num', i);

      /* add board object to div's prototype to access in the even handler */
      newSquare.currentBoard = board;
      if (clickFunction) newSquare.addEventListener('click', clickFunction);
      DOMElement.append(newSquare);
    }
  },

  clearParent(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  },

  addSquareContentClass: function(board, newSquare, i, isTargetBoard) {
    /* open square */
    if (!board.grid[i]) {
      /* missed */
      if (board.shots.includes(i)) {
        newSquare.classList.add('miss');
      } else {
        /* water */
        newSquare.classList.add('water');
      }
    } else {
      /* ship */
      /* is this part of the ship hit? */
      if (board.grid[i].ship.hitAt[board.grid[i].part]) {
        newSquare.classList.add('hit');
      } else {
        if (!isTargetBoard) newSquare.classList.add('ship');
        else               newSquare.classList.add('water');
      }
    }
  }
};
