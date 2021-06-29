let grid = [
  [4, 0, 0, 0, 0, 5, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 9, 8],
  [3, 0, 0, 0, 8, 2, 4, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 8, 0],
  [9, 0, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 3, 0, 6, 7, 0],
  [0, 5, 0, 0, 0, 9, 0, 0, 0],
  [0, 0, 0, 2, 0, 0, 9, 0, 7],
  [6, 4, 0, 3, 0, 0, 0, 0, 0],
];
let setCell;

class Sudoku {
  constructor() {
    this.grid = grid;
  }

  displayGrid() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        if (this.grid[i][j] === 0)
          document.getElementById(`${i}${j}`).innerHTML = " ";
        else document.getElementById(`${i}${j}`).innerHTML = this.grid[i][j];
      }
    }
  }

  enterNumber(e1) {
    let cell = e1.target;
    sudoku.chooseNumber(cell.id);
  }

  chooseNumber(cell) {
    setCell = document.getElementById(cell);
    document
      .querySelector(".number-btn")
      .addEventListener("click", function (e) {
        let flag = sudoku.validation(setCell.id, e.target.innerHTML);
        console.log(setCell.id);
        console.log(flag);
        if (flag) setCell.innerHTML = e.target.innerHTML;
        else {
          setCell.innerHTML = e.target.innerHTML;
          setCell.style.color = "red";
        }
      });
  }

  validation(cell, num) {
    // console.log(cell[0], cell[1]);
    for (let i = 0; i < this.grid.length; i++) {
      // console.log(typeof this.grid[cell[0]][i]);
      if (this.grid[cell[0]][i] === Number(num)) {
        // console.log("1");
        return false;
      }
    }
    return true;
  }
}

const sudoku = new Sudoku();
sudoku.displayGrid();
document.querySelector("table").addEventListener("click", sudoku.enterNumber);
