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
  // enterNumber(e1) {
  //   // console.log(e.target);
  //   let tmp1 = e1.target;
  //   sudoku.chooseNumber(tmp1);
  // }
  // chooseNumber(tmp1) {
  //   document
  //     .querySelector(".number-btn")
  //     .addEventListener("click", function () {
  //       console.log(this);
  //       document.getElementById(`${tmp1.id}`).innerHTML = e.target.innerHTML;
  //     });
  // }
}

const sudoku = new Sudoku();
sudoku.displayGrid();
document.querySelector("table").addEventListener("click", sudoku.enterNumber);
