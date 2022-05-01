export default class GameBoard {
  gameGrid: number[][] = this.getInitialGrid();

  getInitialGrid(): number[][] {
    const initialGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const firstRandomRowIndex: number = Math.floor(Math.random() * 4);
    const firstRandomNumberIndex: number = Math.floor(Math.random() * 4);
    let secondRandomRowIndex: number = Math.floor(Math.random() * 4);
    let secondRandomNumberIndex: number = Math.floor(Math.random() * 4);

    let numbersLeft = 2;

    while (numbersLeft > 0) {
      if (firstRandomNumberIndex === secondRandomNumberIndex) {
        secondRandomNumberIndex = Math.floor(Math.random() * 4);
      } else {
        numbersLeft -= 1;
      }
      if (firstRandomRowIndex === secondRandomRowIndex) {
        secondRandomRowIndex = Math.floor(Math.random() * 4);
      } else {
        numbersLeft -= 1;
      }
    }
    initialGrid[firstRandomRowIndex][firstRandomNumberIndex] = 2;
    initialGrid[secondRandomRowIndex][secondRandomNumberIndex] = 2;
    return initialGrid;
  }

  get grid() {
    return this.gameGrid;
  }

  set grid(value) {
    this.gameGrid = value;
  }

  get isGameEnded(): boolean {
    const includesEmptyBlock: boolean = this.grid.some((row) =>
      row.some((block) => block === 0));
    if (includesEmptyBlock) {
      return false;
    }
    const gridInitialState = this.grid.slice(0);

    this.playLeft();
    const isMutatedAfterLeft = gridInitialState.toString() !== this.grid.toString();
    if (isMutatedAfterLeft) {
      this.grid = gridInitialState;
      return false;
    }

    this.playRight();
    const isMutatedAfterRight = gridInitialState.toString() !== this.grid.toString();
    if (isMutatedAfterRight) {
      this.grid = gridInitialState;
      return false;
    }

    this.playUp();
    const isMutatedAfterUp = gridInitialState.toString() !== this.grid.toString();
    if (isMutatedAfterUp) {
      this.grid = gridInitialState;
      return false;
    }

    this.playDown();
    const isMutatedAfterDown = gridInitialState.toString() !== this.grid.toString();
    if (isMutatedAfterDown) {
      this.grid = gridInitialState;
      return false;
    }

    return true;
  }

  playLeft() {
    const snapShotOfGrid = [...this.gameGrid].toString();
    this.mergeLeft();
    this.moveLeft();
    const isMutated = snapShotOfGrid !== this.grid.toString();
    if (isMutated) {
      this.complete();
    }
  }

  playRight() {
    const snapShotOfGrid = [...this.gameGrid].toString();
    this.mergeRight();
    this.moveRight();
    const isMutated = snapShotOfGrid !== this.grid.toString();
    if (isMutated) {
      this.complete();
    }
  }

  playUp() {
    const snapShotOfGrid = [...this.gameGrid].toString();
    this.mergeUp();
    this.moveUp();
    const isMutated = snapShotOfGrid !== this.grid.toString();
    if (isMutated) {
      this.complete();
    }
  }

  playDown() {
    const snapShotOfGrid = [...this.gameGrid].toString();
    this.mergeDown();
    this.moveDown();
    const isMutated = snapShotOfGrid !== this.grid.toString();
    if (isMutated) {
      this.complete();
    }
  }

  mergeLeft(): void {
    for (const row of this.grid) {
      let pair = 1;
      let numberIndex = -1;
      for (let i = 0; i < row.length; i += 1) {
        if (row[i] === 0) {
          continue;
        }
        if (pair === row[i]) {
          row[numberIndex] = 2 * row[i];
          row[i] = 0;
          pair = 1;
        } else {
          pair = row[i];
          numberIndex = i;
        }
      }
    }
  }

  mergeRight(): void {
    for (const row of this.grid) {
      let pair = 1;
      let numberIndex = -1;
      for (let i = row.length - 1; i >= 0; i -= 1) {
        if (row[i] === 0) {
          continue;
        }
        if (pair === row[i]) {
          row[numberIndex] = 2 * row[i];
          row[i] = 0;
          pair = 1;
        } else {
          pair = row[i];
          numberIndex = i;
        }
      }
    }
  }

  mergeUp(): void {
    const transPosedGrid: number[][] = this.getTranspose(this.grid);

    for (const row of transPosedGrid) {
      let pair = 1;
      let numberIndex = -1;

      for (let i = 0; i < row.length; i += 1) {
        if (row[i] === 0) {
          continue;
        }

        if (pair === row[i]) {
          row[numberIndex] = 2 * row[i];
          row[i] = 0;
          pair = 1;
        } else {
          pair = row[i];
          numberIndex = i;
        }
      }
    }
    this.grid = this.getTranspose(transPosedGrid);
  }

  mergeDown(): void {
    const transposedGrid: number[][] = this.getTranspose(this.grid);

    for (const row of transposedGrid) {
      let currentNumber = 1;
      let numberIndex = -1;

      for (let i = row.length - 1; i >= 0; i -= 1) {
        if (row[i] === 0) {
          continue;
        }
        if (currentNumber === row[i]) {
          row[i] = 0;
          row[numberIndex] *= 2;
          currentNumber = 1;
        } else {
          currentNumber = row[i];
          numberIndex = i;
        }
      }
    }
    this.grid = this.getTranspose(transposedGrid);
  }

  moveLeft(): void {
    this.grid = this.grid.map((row) => row.filter((number) => number !== 0));
    this.grid.forEach((row) => {
      while (row.length < 4) {
        row.push(0);
      }
    });
  }

  moveRight(): void {
    this.grid = this.grid.map((row) => row.filter((number) => number !== 0));
    this.grid.forEach((row) => {
      while (row.length < 4) {
        row.unshift(0);
      }
    });
  }

  moveUp(): void {
    const transposedGrid: number[][] = this.getTranspose(this.grid);
    const nonZeroNumbers = transposedGrid.map((row) =>
      row.filter((number) => number !== 0));

    nonZeroNumbers.forEach((row) => {
      while (row.length < 4) {
        row.push(0);
      }
    });

    this.grid = this.getTranspose(nonZeroNumbers);
  }

  moveDown(): void {
    const transposedGrid: number[][] = this.getTranspose(this.grid);
    const nonZeroNumbers = transposedGrid.map((row) =>
      row.filter((number) => number !== 0));

    nonZeroNumbers.forEach((row) => {
      while (row.length < 4) {
        row.unshift(0);
      }
    });

    this.grid = this.getTranspose(nonZeroNumbers);
  }

  getTranspose(arr: number[][]): number[][] {
    return arr[0].map((col, i) => arr.map((row) => row[i]));
  }

  complete() {
    const indexesOfEmptyBlocks: number[][] = this.grid.reduce(
      (indexes: number[][], row, rowIndex) => {
        row.forEach((number, numberIndex) => {
          if (number === 0) {
            indexes.push([rowIndex, numberIndex]);
          }
        });
        return indexes;
      },
      [],
    );
    if (indexesOfEmptyBlocks.length === 0) {
      return undefined;
    }

    const randomEmptyIndex: number = Math.floor(
      Math.random() * indexesOfEmptyBlocks.length,
    );

    const randomEmptyLocation: number[] = indexesOfEmptyBlocks[randomEmptyIndex];

    const randomEmptyRow: number = randomEmptyLocation[0];
    const randomEmptyColumn: number = randomEmptyLocation[1];

    // decide 2 or 4
    const isNewNumber2: boolean = Math.random() < 0.8;
    let newNumber: number;
    if (isNewNumber2 === true) {
      newNumber = 2;
    } else {
      newNumber = 4;
    }

    this.grid[randomEmptyRow][randomEmptyColumn] = newNumber;
  }
}
