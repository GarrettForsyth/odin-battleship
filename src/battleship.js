export const Battleship = {
  createShip: function({ length }) {
    return {
      length,
      hitAt: Array(length).fill(false),

      isSunk: function() {
        return !this.hitAt.some(spot => spot === false);
      },

      hit: function(at) {
        if (at < 0 || at > this.hitAt.length)
          throw new Error('Index out of range of ship length.');
        this.hitAt[at] = true;
      }
    };
  },

  createBoard: function() {
    return {
      numCols: 10,
      numRows: 10,
      grid: [],

      throwErrorIfOffRightEdge: function(startCoord, length) {
        if (
          Math.floor((startCoord + length) / 10) > Math.floor(startCoord / 10)
        ) {
          throw new Error('Ship placed off board horizontally.');
        }
      },

      throwErrorIfOffBottomEdge: function(startCoord, length) {
        if (startCoord + length * 10 >= 100) {
          throw new Error('Ship placed off board vertically.');
        }
      },

      throwErrorIfSquareAlredyOccupied: function(indices) {
        indices.forEach(index => {
          if (this.grid[index]) throw new Error('Ship placed on an occupied square.');
        });
      },

      /* Returns an array of grid indices a ship would take up */
      getGridIndices(startCoord, direction, length) {
        let indices = [];
        if (direction === 'h') {
          this.addHorizontalIndices(indices, startCoord, length);
        } else if (direction === 'v') {
          this.addVerticalIndices(indices, startCoord, length);
        } else {
          throw new Error('Placement has invalid direction.');
        }

        return indices;
      },

      addHorizontalIndices: function(indices, startCoord, length) {
        this.throwErrorIfOffRightEdge(startCoord, length);
        for (let i = startCoord; i < length + startCoord; i++) {
          indices.push(i);
        }
      },

      addVerticalIndices: function(indices, startCoord, length) {
        this.throwErrorIfOffBottomEdge(startCoord, length);
        for (let i = startCoord; i < startCoord + (length*10); i += 10) {
          indices.push(i);
        }
      },

      /* sets grid at position of ship start at 1 (since zero isn't truthy)
      */
      placeShip: function(startCoord, direction, length) {
        const indices = this.getGridIndices(startCoord, direction, length);
        this.throwErrorIfSquareAlredyOccupied(indices);
        let newShip = Battleship.createShip(length);
        let shipPart = 0;
        indices.forEach(index => {
          this.grid[index] = { ship: newShip, part: shipPart };
          shipPart += 1;
        });
      },

      receiveAttack: function(coord) {
        if (!this.grid[coord]) return false;
        else {
          let { ship, part } = this.grid[coord];
          ship.hit(part);
          return true;
        }
      }
    };
  }
};
