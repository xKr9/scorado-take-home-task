export default class SudokuSolver {
  private board: number[][];

  constructor(board: number[][]) {
    this.board = board;
  }

  public solve(): number[][] {
    if (this.solveSudoku()) {
      return this.board;
    }
    return [];
  }

  private solveSudoku(): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (this.isSafe(row, col, num)) {
              this.board[row][col] = num;
              if (this.solveSudoku()) {
                return true;
              }
              this.board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  private isSafe(row: number, col: number, num: number): boolean {
    return (
      !this.usedInRow(row, num) &&
      !this.usedInCol(col, num) &&
      !this.usedInBox(row - (row % 3), col - (col % 3), num)
    );
  }

  private usedInRow(row: number, num: number): boolean {
    for (let col = 0; col < 9; col++) {
      if (this.board[row][col] === num) {
        return true;
      }
    }
    return false;
  }

  private usedInCol(col: number, num: number): boolean {
    for (let row = 0; row < 9; row++) {
      if (this.board[row][col] === num) {
        return true;
      }
    }
    return false;
  }

  private usedInBox(
    boxStartRow: number,
    boxStartCol: number,
    num: number
  ): boolean {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row + boxStartRow][col + boxStartCol] === num) {
          return true;
        }
      }
    }
    return false;
  }
}
