import { Battleship } from '../battleship.js';

let ship;
let board;
beforeEach( () => {
  const shipInput = { length: 3 };
  ship = Battleship.createShip(shipInput); 
  board = Battleship.createBoard();
});

test('given correct parameters, createShip() creates a ship object', ()=> {
  expect(ship.length).toBe(3);
  expect(ship.hitAt).toEqual([false,false,false]);
  expect(ship.isSunk()).toBe(false);

});

test('calling hit(num) marks the ship as hit at that number', ()=> {
  ship.hit(2);
  expect(ship.hitAt).toEqual([false,false,true]);
});

test('hit throws an error if called with -ve numbers', () => {
  function badHit() {
    ship.hit(-1);
  }
  expect(badHit).toThrowError(Error);
});

test('hit throws an error if called with numbers larger than length', () => {
  function badHit() {
    ship.hit(10);
  }

  expect(badHit).toThrowError(Error);
});

test('isSunk() returns true if entire length of ship is hit', ()=> {
  for (let i = 0; i < ship.length; i++) {
    ship.hit(i);
  }
  expect(ship.isSunk()).toBe(true);
});

test('isSunk() returns false if a spot is not hit', ()=> {
  for (let i = 0; i < ship.length -1; i++) {
    ship.hit(i);
  }
  expect(ship.isSunk()).toBe(false);
});

test('boards can place ships horizontally', () => {
  board.placeShip(12, 'h', 5);
  expect(!!board.grid[12]).toBe(true);
  expect(!!board.grid[13]).toBe(true);
  expect(!!board.grid[14]).toBe(true);
  expect(!!board.grid[15]).toBe(true);
  expect(!!board.grid[16]).toBe(true);
  expect(!!board.grid[17]).toBe(false);
});

test('boards can place ships vertically', ()=> {
  board.placeShip(0, 'v', 3);
  expect(!!board.grid[0]).toBe(true);
  expect(!!board.grid[10]).toBe(true);
  expect(!!board.grid[20]).toBe(true);
  expect(!!board.grid[30]).toBe(false);

  board.placeShip(9, 'v', 3);
  expect(!!board.grid[9]).toBe(true);
  expect(!!board.grid[19]).toBe(true);
  expect(!!board.grid[29]).toBe(true);
});

test('throws an error an an invalid direction', () => {
  function badPlace(){
    board.placeShip(0,'bad', 5);
  }
  expect(badPlace).toThrowError('Placement has invalid direction.');
});

test('throws error if ship is placed off board horizontally', () => {
  function badPlaceHor(){
    board.placeShip(9,'h', 5);
  }
  expect(badPlaceHor).toThrowError('Ship placed off board horizontally.');
});

test('throws error if ship is placed off board vertically', () => {
  function badPlaceVer(){
    board.placeShip(90,'v', 5);
  }
  expect(badPlaceVer).toThrowError('Ship placed off board vertically.');
});

test('throws error if ship is placed on another ship', () => {
  function badPlaceVer(){
    board.placeShip(0,'h', 5);
    board.placeShip(3,'v', 5);
  }
  expect(badPlaceVer).toThrowError('Ship placed on an occupied square.');
});

test('receiveAttack() returns miss when given an empty square', ()=> {
  expect(board.receiveAttack(0)).toBe(false);
});

test('receiveAttack() returns hit when given an occupied square', ()=> {
  board.placeShip(0, 'h', 3);
  expect(board.receiveAttack(0)).toBe(true);
});


  
