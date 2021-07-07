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
const globalVar = {
  grid: grid2,
  nums: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  setCell: undefined,
  undoStack: [],
  count: 0,
  cellCount: true,
  totalNumCell: 81,
};

const numbersBtn = document.getElementsByClassName("number");
const checkBtn = document.getElementById("check-btn");
const sudokuTable = document.querySelector("table");
const undoBtn = document.getElementById("undo-btn");
const eraseBtn = document.getElementById("erase-btn");
const notesBtn = document.getElementById("notes-btn");
const hintBtn = document.getElementById("hint-btn");

// onload = () => {
//   run();
// };

class Sudoku {
  constructor() {
    this.nums = globalVar.nums;
    this.grid = globalVar.grid;
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
    console.log(this);
    let cell = e.target;
    if (Number(cell.innerHTML) === 0) {
      console.log("33");
      const tmp = cell.id;
      globalVar.setCell = document.getElementById(tmp);
      if (globalVar.count === globalVar.totalNumCell) checkBtn.disabled = false;
      else checkBtn.disabled = true;
    }
  }

  isComplete() {
    let count = 0;
    for (let i = 0; i < this.grid.length; i++)
      for (let j = 0; j < this.grid.length; j++)
        if (this.grid[i][j] !== 0) count++;

    globalVar.count = globalVar.totalNumCell - count;
  }

  erase() {
    globalVar.undoStack.unshift({
      action: "eraseNum",
      id: globalVar.setCell.id,
    });
    const cellId = globalVar.undoStack.shift();
    document.getElementById(cellId).innerHTML = "";
    console.log(globalVar.undoStack);
  }
  // undo() {
  //   const cellId = globalVar.undoStack.shift();
  //   document.getElementById(cellId).innerHTML = "";
  //   console.log(globalVar.undoStack);
  // }

  checkGrid() {
    let flagValid;
    num = this.nums;

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
    console.log("1");
    let cell = globalVar.setCell.id;
    this.grid[cell[0]][cell[1]] = Number(num);
    globalVar.setCell.innerHTML = num;
    globalVar.setCell.style.color = "blue";

    globalVar.undoStack.unshift({ action: "addNum", id: globalVar.setCell.id });
    globalVar.count = globalVar.count + 1;
  }
  listenerButtonNumber() {
    for (let i = 0; i < numbersBtn.length; i++) {
      numbersBtn[i].addEventListener("click", function () {
        sudoku.updateSudoku(numbersBtn[i].innerHTML);
      });
    }
  }
}

const sudoku = new Sudoku();
sudoku.isComplete();
sudoku.displayGrid();
sudoku.listenerButtonNumber();
sudokuTable.addEventListener("click", sudoku.enterNumber);
checkBtn.addEventListener("click", sudoku.checkGrid.bind(sudoku));
undoBtn.addEventListener("click", sudoku.undo.bind(sudoku));

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
