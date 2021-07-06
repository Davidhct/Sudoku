let grid2 = [
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
let grid1 = [
  [8, 9, 5, 7, 4, 2, 1, 3, 6],
  [2, 7, 1, 9, 6, 3, 4, 8, 5],
  [4, 6, 3, 5, 8, 1, 7, 9, 2],
  [9, 3, 4, 6, 1, 7, 2, 5, 8],
  [5, 1, 7, 2, 0, 8, 9, 6, 4],
  [6, 8, 2, 4, 5, 9, 3, 7, 1],
  [1, 5, 9, 8, 7, 4, 6, 2, 3],
  [7, 4, 6, 3, 2, 5, 8, 1, 9],
  [3, 2, 8, 1, 9, 6, 5, 4, 7],
];
let grid = grid2;
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const numbers = document.getElementsByClassName("number");
const checkBtn = document.getElementById("check-btn");
const table = document.querySelector("table");

let setCell;

class Sudoku {
  constructor() {
    this.nums = nums;
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
    setCell = document.getElementById(cell);
    for (let i = 0; i < numbers.length; i++) {
      numbers[i].addEventListener("click", function () {
        sudoku.updateSudoku(numbers[i].innerHTML);
        if (sudoku.checkComplition) checkBtn.disabled = false;
        else checkBtn.disabled = true;
      });
    }
  }
  checkComplition() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        console.log(typeof this.grid[i][j]);
        if (this.grid[i][j] === 0) {
          console.log(false);
          return false;
        }
      }
    }
    console.log(true);
    return true;
  }

  checkGrid(num = undefined, row = undefined, col = undefined) {
    let flagValid;
    num = this.nums;
    // if (typeof num === "number") {
    //   // console.log("1");
    //
    //   flagSqu = sudoku.isValidSudoku(row, col, num);
    //   if (flagValid === false) {
    //     console.log("flagValid = ", flagValid);
    //     return false;
    //   }
    // } else {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        flagValid = sudoku.isValidSudoku(j, j, num[i]);
        // console.log("2");
        if (flagValid === false) {
          console.log("flagValid = ", flagValid);
          return false;
        }
      }
    }
    // }
    console.log("flagValid = ", flagValid);
    return true;
  }

  // Check row
  isValidSudoku(row, col, num) {
    // console.log("Enter rowValidation method");
    const rowMap = new Map();
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[row][i] === num) {
        if (rowMap.get(this.grid[row][i]) === 0) return false;

        rowMap.set(this.grid[row][i], 0);
      }
    }

    // Check col
    const colMap = new Map();
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i][col] === num) {
        if (colMap.get(this.grid[i][col]) === 0) return false;

        colMap.set(this.grid[i][col], 0);
      }
    }

    // Check box
    const squareSize = 3;
    let rowCorner = Math.floor(row / 3) * 3;
    let colCorner = Math.floor(col / 3) * 3;
    const squareMap = new Map();
    // Iterate through each row
    for (let i = rowCorner; i < rowCorner + squareSize; i++) {
      // Iterate through each column
      for (let j = colCorner; j < colCorner + squareSize; j++) {
        if (this.grid[i][j] === num) {
          if (squareMap.get(this.grid[i][j]) === 0) return false;
          squareMap.set(this.grid[i][j], 0);
        }
      }
    }
    return true;
  }

  updateSudoku(num) {
    // console.log(this.grid);
    let cell = setCell.id;
    this.grid[cell[0]][cell[1]] = Number(num);
    setCell.innerHTML = num;
    setCell.style.color = "blue";
    console.log(this.grid);
  }
}

const sudoku = new Sudoku();

sudoku.displayGrid();
table.addEventListener("click", sudoku.enterNumber);
checkBtn.addEventListener("click", sudoku.checkGrid.bind(sudoku));

// document
//   .getElementById("check-btn")
//   .addEventListener("click", sudoku.checkComplition.bind(sudoku));

// validation(cell, num) {
//   // Check row
//   let count = 0;
//   for (let i = 0; i < this.grid.length; i++) {
//     if (
//       Number(document.getElementById(`${cell[0]}${i}`).innerHTML) ===
//       Number(num)
//     ) {
//       count++;
//       if (count > 1) {
//         console.log(`${cell[0]}${i}`, "1");
//         return false;
//       }
//     }
//   }
//   count = 0;
//   // Check col
//   for (let i = 0; i < this.grid.length; i++) {
//     if (
//       Number(document.getElementById(`${i}${cell[1]}`).innerHTML) ===
//       Number(num)
//     ) {
//       count++;
//       if (count > 1) {
//         console.log(`${cell[0]}${i}`, "2");
//         return false;
//       }
//     }
//   }
//   count = 0;
//   // Check box
//   let row = Math.floor(cell[0] / 3) * 3;
//   let col = Math.floor(cell[1] / 3) * 3;

//   for (let i = row; i <= 2 + row; i++) {
//     for (let j = col; i <= 2 + col; j++) {
//       console.log(document.getElementById(`${i}${j}`).innerHTML);
//       if (
//         Number(document.getElementById(`${i}${j}`).innerHTML) === Number(num)
//       ) {
//         count++;
//         if (count > 1) {
//           console.log(`${cell[0]}${i}`, "3");
//           return false;
//         }
//       }
//     }
//   }
//   return true;
// }
