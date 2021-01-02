/* eslint-disable no-unused-vars */
export default class Life {
  constructor(generation = 0, liveCells = new Map(), liveCellCount = 0) {
    this.generation = generation;
    this.liveCells = liveCells;
    this.deadCells = new Map();
    this.nextGeneration = new Map();
    this.rows = 50;
    this.cols = 50;
    this.liveCellCount = liveCellCount;
  }

  getGeneration() {
    return this.generation;
  }

  getLiveCellCount() {
    return this.liveCellCount;
  }

  isCellAlive(position) {
    return this.liveCells.has(position.row + " , " + position.col);
  }

  newGeneration() {
    this.liveCells.forEach((cell) => {
      this.updateCell(cell);
    });
    this.deadCells.forEach((cell) => {
      this.updateCell(cell);
    });

    this.generation++;

    return new Life(this.generation, this.nextGeneration, this.liveCellCount);
  }

  updateCell(position) {
    let liveNeighbors = 0;
    let row = position.row;
    let col = position.col;
    for (let x = row - 1; x <= row + 1; x++) {
      if (x < 0 || x > this.rows) continue;
      for (let y = col - 1; y <= col + 1; y++) {
        if (y < 0 || y > this.rows) continue;
        if (x === row && y === col) continue;
        if (this.isCellAlive({ row: x, col: y })) {
          liveNeighbors++;
        } else {
          if (this.isCellAlive(position)) {
            this.addDeadCell({ row: x, col: y });
          }
        }
      }
    }
    if (this.isCellAlive(position)) {
      if (liveNeighbors === 2 || liveNeighbors === 3) {
        this.nextGeneration.set(position.row + " , " + position.col, {
          row: row,
          col: col,
        });
      } else {
        this.liveCellCount--;
      }
    } else {
      if (liveNeighbors === 3) {
        this.nextGeneration.set(position.row + " , " + position.col, {
          row: row,
          col: col,
        });
        this.liveCellCount++;
      }
    }
  }

  endLife() {
    this.liveCells = new Map();
    this.generation = 0;
    return new Life(this.generation, this.liveCells);
  }

  generateFirstGeneration(rows, cols) {
    let liveCellCount = 0;
    this.liveCells = new Map();
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let position = { row: row, col: col };
        if (Math.floor(Math.random() * 2)) {
          // if random number is 1
          liveCellCount++;
          this.addLiveCell(position);
        }
      }
    }
    this.generation = 1;
    this.liveCellCount = liveCellCount;
    return new Life(this.generation, this.liveCells, this.liveCellCount);
  }

  addLiveCell(position) {
    this.liveCells.set(position.row + " , " + position.col, {
      row: position.row,
      col: position.col,
    });
  }

  addDeadCell(position) {
    this.deadCells.set(position.row + " , " + position.col, {
      row: position.row,
      col: position.col,
    });
  }

  killCell(position) {
    this.liveCells.delete(position.row + " , " + position.col);
  }

  swapCell(position) {
    if (this.isCellAlive(position)) {
      this.liveCellCount--;
      this.killCell(position);
    } else {
      this.liveCellCount++;
      this.addLiveCell(position);
    }
    return new Life(this.generation, this.liveCells, this.liveCellCount);
  }
}
