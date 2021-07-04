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
let grid = [
  [8, 9, 5, 7, 4, 2, 1, 3, 6],
  [2, 7, 1, 9, 6, 3, 4, 8, 5],
  [4, 6, 3, 5, 8, 1, 7, 9, 2],
  [9, 3, 4, 6, 1, 7, 2, 5, 8],
  [5, 1, 7, 2, 3, 8, 9, 6, 4],
  [6, 8, 2, 4, 5, 9, 3, 7, 1],
  [1, 5, 9, 8, 7, 4, 6, 2, 3],
  [7, 4, 6, 3, 2, 5, 8, 1, 9],
  [3, 2, 8, 1, 9, 6, 5, 4, 7],
];

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const numbers = document.getElementsByClassName("number");

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
      });
    }
  }
  checkGrid(num = nums, row = undefined, col = undefined) {
    let flagRow, flagCol, flagSqu;

    if (typeof num === "number") {
      flagRow = sudoku.rowValidation(row, num);
      flagCol = sudoku.colValidation(col, num);
      flagSqu = sudoku.squareValidation(row, col, num);
      if (flagRow === false || flagCol === false || flagSqu === false) {
        console.log("flagRow = ", flagRow);
        console.log("flagCol = ", flagCol);
        console.log("flagSqu = ", flagSqu);
        return false;
      }
    } else {
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid.length; j++) {
          flagRow = sudoku.rowValidation(j, num[i]);
          flagCol = sudoku.colValidation(j, num[i]);
          flagSqu = sudoku.squareValidation(i, j, num[i]);
          if (flagRow === false || flagCol === false || flagSqu === false) {
            console.log("flagRow = ", flagRow);
            console.log("flagCol = ", flagCol);
            console.log("flagSqu = ", flagSqu);
            return false;
          }
        }
      }
    }

    console.log("flagRow = ", flagRow);
    console.log("flagCol = ", flagCol);
    console.log("flagSqu = ", flagSqu);

    return true;
  }

  rowValidation(row, num) {
    // Check row
    console.log("Enter rowValidation method");
    let count = 0;

    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[row][i] === num) {
        console.log(this.grid[row][i]);
        return false;
      }
    }
    return true;
  }
  colValidation(col, num) {
    // Check col
    console.log("Enter colValidation method");
    let count = 0;
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i][col] === num) {
        console.log(this.grid[i][col]);
        return false;
      }
    }
    return true;
  }
  squareValidation(row, col, num) {
    // Check box
    console.log("Enter squareValidation method");
    let squareSize = 3;
    let count = 0;
    let rowCorner = Math.floor(row / 3) * 3;
    let colCorner = Math.floor(col / 3) * 3;

    // Iterate through each row
    for (let i = rowCorner; i < rowCorner + squareSize; i++) {
      // Iterate through each column
      for (let j = colCorner; j < colCorner + squareSize; j++) {
        if (this.grid[i][j] === num) {
          console.log(this.grid[i][j]);
          return false;
        }
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
document
  .getElementById("check-btn")
  .addEventListener("click", sudoku.checkGrid.bind(sudoku, 3, 4, 4));

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
