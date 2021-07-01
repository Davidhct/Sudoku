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
const numbers = document.getElementsByClassName("number");

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

  enterNumber(e) {
    console.log("click");
    let cell = e.target;
    if (Number(cell.innerHTML) === 0) sudoku.chooseNumber(cell.id);
  }

  chooseNumber(cell) {
    for (let i = 0; i < numbers.length; i++) {
      numbers[i].addEventListener("click", function () {
        sudoku.updateSudoku(numbers[i].innerHTML);
      });
    }
  }

  validation(cell, num) {
    // Check row
    for (let i = 0; i < this.grid.length; i++) {
      if (
        Number(document.getElementById(`${cell[0]}${i}`).innerHTML) ===
        Number(num)
      )
        return false;
    }
    // Check col
    for (let i = 0; i < this.grid.length; i++) {
      if (
        Number(document.getElementById(`${i}${cell[1]}`).innerHTML) ===
        Number(num)
      )
        return false;
    }

    // Check box
    let row = Math.trunc(cell[0] / 3);
    let col = Math.trunc(cell[1] / 3);

    for (let i = row * 3; i < col * 3 + 3; i++) {
      for (let j = col * 3; i < col * 3 + 3; j++) {
        if (
          Number(document.getElementById(`${i}${cell[1]}`).innerHTML) ===
          Number(num)
        )
          return false;
      }
    }
    return true;
  }

  updateSudoku(num) {
    setCell.innerHTML = num;
    setCell.style.color = "blue";
  }
}

const sudoku = new Sudoku();
sudoku.displayGrid();
document.querySelector("table").addEventListener("click", sudoku.enterNumber);
