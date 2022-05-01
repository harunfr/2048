import GameBoard from '../GameElements/GameBoard';

const gameBoard = new GameBoard();

test('move left', () => {
  gameBoard.grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ];
  const expected = [
    [0, 0, 0, 0],
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [2, 0, 0, 0],
  ];
  gameBoard.moveLeft();
  expect(gameBoard.grid).toEqual(expected);
});

test('move right', () => {
  gameBoard.grid = [
    [0, 0, 0, 0],
    [0, 4, 0, 0],
    [0, 0, 0, 0],
    [0, 2, 0, 0],
  ];
  const expected = [
    [0, 0, 0, 0],
    [0, 0, 0, 4],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ];
  gameBoard.moveRight();
  expect(gameBoard.grid).toEqual(expected);
});

test('move up', () => {
  gameBoard.grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 2, 0, 2],
  ];
  const expected = [
    [0, 2, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  gameBoard.moveUp();
  expect(gameBoard.grid).toEqual(expected);
});

test('move down', () => {
  gameBoard.grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [2, 2, 0, 2],
    [0, 0, 0, 0],
  ];
  const expected = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [2, 2, 0, 2],
  ];
  gameBoard.moveDown();
  expect(gameBoard.grid).toEqual(expected);
});

test('just moves left, does not merge', () => {
  gameBoard.grid = [
    [0, 0, 0, 0],
    [0, 2, 2, 2],
    [0, 0, 2, 0],
    [2, 2, 0, 2],
  ];
  const expected = [
    [0, 0, 0, 0],
    [2, 2, 2, 0],
    [2, 0, 0, 0],
    [2, 2, 2, 0],
  ];
  gameBoard.moveLeft();
  expect(gameBoard.grid).toEqual(expected);
});

test('just moves right, does not merge', () => {
  gameBoard.grid = [
    [2, 0, 2, 0],
    [0, 2, 2, 2],
    [0, 0, 0, 0],
    [2, 0, 2, 0],
  ];
  const expected = [
    [0, 0, 2, 2],
    [0, 2, 2, 2],
    [0, 0, 0, 0],
    [0, 0, 2, 2],
  ];
  gameBoard.moveRight();
  expect(gameBoard.grid).toEqual(expected);
});

test('just moves up, does not merge', () => {
  gameBoard.grid = [
    [0, 0, 2, 0],
    [0, 2, 2, 2],
    [2, 2, 0, 2],
    [2, 0, 0, 2],
  ];
  const expected = [
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [0, 0, 0, 2],
    [0, 0, 0, 0],
  ];
  gameBoard.moveUp();
  expect(gameBoard.grid).toEqual(expected);
});

test('just moves down, does not merge', () => {
  gameBoard.grid = [
    [2, 2, 2, 0],
    [2, 2, 0, 2],
    [2, 2, 2, 0],
    [2, 0, 0, 0],
  ];
  const expected = [
    [2, 0, 0, 0],
    [2, 2, 0, 0],
    [2, 2, 2, 0],
    [2, 2, 2, 2],
  ];
  gameBoard.moveDown();
  expect(gameBoard.grid).toEqual(expected);
});
test('merges left', () => {
  gameBoard.grid = [
    [0, 2, 2, 0],
    [2, 0, 0, 2],
    [2, 2, 2, 0],
    [2, 2, 2, 2],
  ];
  const expected = [
    [0, 4, 0, 0],
    [4, 0, 0, 0],
    [4, 0, 2, 0],
    [4, 0, 4, 0],
  ];
  gameBoard.mergeLeft();
  expect(gameBoard.grid).toEqual(expected);
});
test('merges right', () => {
  gameBoard.grid = [
    [0, 0, 2, 2],
    [2, 2, 2, 0],
    [2, 2, 2, 2],
    [0, 2, 2, 0],
  ];
  const expected = [
    [0, 0, 0, 4],
    [2, 0, 4, 0],
    [0, 4, 0, 4],
    [0, 0, 4, 0],
  ];
  gameBoard.mergeRight();
  expect(gameBoard.grid).toEqual(expected);
});
test('merges up', () => {
  gameBoard.grid = [
    [0, 2, 2, 0],
    [2, 0, 2, 0],
    [0, 2, 2, 0],
    [0, 2, 0, 0],
  ];
  const expected = [
    [0, 4, 4, 0],
    [2, 0, 0, 0],
    [0, 0, 2, 0],
    [0, 2, 0, 0],
  ];
  gameBoard.mergeUp();
  expect(gameBoard.grid).toEqual(expected);
});
test('merges down', () => {
  gameBoard.grid = [
    [0, 0, 0, 0],
    [2, 2, 2, 0],
    [2, 2, 2, 2],
    [0, 2, 0, 2],
  ];
  const expected = [
    [0, 0, 0, 0],
    [0, 2, 0, 0],
    [4, 0, 4, 0],
    [0, 4, 0, 4],
  ];
  gameBoard.mergeDown();
  expect(gameBoard.grid).toEqual(expected);
});
xtest('complete', () => {
  gameBoard.grid = [
    [8, 2, 4, 64],
    [16, 4, 2, 8],
    [16, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const expected = [
    [8, 2, 4, 64],
    [16, 4, 2, 8],
    [16, 0, 0, 0],
    [0, 0, 2, 0], // in bottom row there is new number
  ];
  gameBoard.complete();
  expect(gameBoard.grid).toEqual(expected);
});

xtest('complete with bigger numbers', () => {
  gameBoard.grid = [
    [8, 128, 512, 16],
    [16, 64, 8, 2],
    [4, 4, 2, 0],
    [0, 0, 0, 0],
  ];
  const expected = [
    [8, 128, 512, 16],
    [16, 64, 8, 2],
    [4, 4, 2, 2], // new number is in third row
    [0, 0, 0, 0],
  ];
  gameBoard.complete();
  expect(gameBoard.grid).toEqual(expected);
});

// Test Template

// 'changeMe'
// // -----------------------
// {
//  const gameBoard.grid = [
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//   ]
//   gameBoard.enterMethodNameHere()

//  const expected = [
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//   ]
// }
