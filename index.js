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
let grid3 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let grid4 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const globalVar = {
  grid: grid3,
  nums: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  setCell: undefined,
  undoStack: [],
  noteStack: [],
  ////
  undoNoteStack: [],
  ////
  count: 0,
  cellCount: true,
  totalNumCell: 81,
  noteFlag: false,
  isRandom: true,
  counter: 0,
};

const numbersBtn = document.getElementsByClassName("number");
const checkBtn = document.getElementById("check-btn");
const sudokuTable = document.querySelector("table");
const undoBtn = document.getElementById("undo-btn");
const eraseBtn = document.getElementById("erase-btn");
const notesBtn = document.getElementById("notes-btn");
const solveBtn = document.getElementById("solveBtn");
const randomBtn = document.getElementById("randomBtn");
// const hintBtn = document.getElementById("hint-btn");

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
    let cell = e.target;
    console.log(cell.id.length);
    if (cell.id.length === 3) {
      // let val = document.getElementById(`.table-${cell.id}`);
      // console.log(val);
      // if (val !== null && !globalVar.noteFlag) {
      //   console.log(val);
      //   val.remove();
      // }
      let row = cell.id[0];
      let col = cell.id[1];
      cell.id = `${row}${col}`;
      console.log(cell.id);
    }
    if (cell.id.length === 2) {
      if (Number(cell.innerHTML) === 0 || cell.style.color === "blue") {
        console.log(cell.id, "..........", globalVar.noteFlag);
        if (globalVar.noteFlag) {
          console.log(cell.id);
          // let val = document.getElementById(cell.id);
          // console.log(val);
          // if (val.innerHTML !== "") val.innerHTML = "";
        }
        const tmp = cell.id;
        globalVar.setCell = document.getElementById(tmp);
        if (globalVar.count === globalVar.totalNumCell)
          checkBtn.disabled = false;
        else checkBtn.disabled = true;
      }
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
    console.log(globalVar.setCell);
    let cell = globalVar.setCell;
    console.log("from erase: ", cell.id);
    globalVar.undoStack.unshift({
      action: "eraseNum",
      id: cell.id,
      value: cell.innerHTML,
    });

    document.getElementById(cell.id).innerHTML = "";
  }

  notes() {
    globalVar.noteFlag = !globalVar.noteFlag;
    if (globalVar.noteFlag === true) {
      this.src = "./css/images/notes_on_icon.png";

      if (globalVar.setCell !== undefined) {
        sudoku.erase();
        sudoku.renderNote(globalVar.setCell.id);
      }

      // sudoku.updateSudoku(undefined, "notes");
      ///
      console.log(globalVar.setCell);

      ///
    } else {
      this.src = "./css/images/notes_off_icon.png";
      globalVar.flag = true;
    }
  }

  renderNote(id) {
    const html = `
            <table class="inner-table table-${id}">
              <tbody>
                <tr class="inner-tr ${id}0">
                  <td id="${id}1"></td>
                  <td id="${id}2"></td>
                  <td id="${id}3"></td>
                </tr>
                <tr class="inner-tr ${id}0">
                  <td id="${id}4"></td>
                  <td id="${id}5"></td>
                  <td id="${id}6"></td>
                </tr>
                <tr class="inner-tr ${id}0">
                  <td id="${id}7"></td>
                  <td id="${id}8"></td>
                  <td id="${id}9"></td>
                </tr>
              </tbody>
            </table>
      `;
    document.getElementById(id).insertAdjacentHTML("afterbegin", html);
  }
  undo() {
    if (globalVar.undoStack.length > 0) {
      const cell = globalVar.undoStack.shift();

      switch (cell.action) {
        case "addNum":
          document.getElementById(cell.id).innerHTML = "";
          break;
        case "eraseNum":
          document.getElementById(cell.id).innerHTML = cell.value;
          break;
        case "noteNum":
          // sudoku.innerUndo(cell);
          const noteCell = cell.value.shift();
          let newCell = document.getElementById(noteCell.id);
          if (newCell === null) sudoku.renderNote(cell.id);
          console.log(cell.value);

          if (noteCell.action === "addNumNote") {
            document.getElementById(noteCell.id).innerHTML = "";
          } else if (noteCell.action === "eraseNumNote") {
            document.getElementById(noteCell.id).innerHTML = noteCell.value;
          }
          console.log(noteCell);

          break;
      }
    }
  }

  checkGrid() {
    let flagValid;
    const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        // console.log(this.grid.length);
        flagValid = sudoku.isValidSudoku(j, j, num[i], true);
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
  isValidSudoku(row, col, num, flag) {
    const rowMap = new Map();
    for (let i = 0; i < this.grid.length; i++) {
      // console.log(this.grid[0][0]);
      if (this.grid[row][i] === num && i !== col) {
        if (rowMap.get(num) === true && flag) {
          return false;
        }
        flag ? rowMap.set(num, true) : null;
        if (!flag) return false;
      }
    }

    // Check col
    const colMap = new Map();
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i][col] === num && i !== row) {
        if (colMap.get(num) === true && flag) {
          return false;
        }
        flag ? colMap.set(this.grid[i][col], true) : null;
        if (!flag) return false;
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
        if (this.grid[i][j] === num && i !== row && j !== col) {
          if (squareMap.get(this.grid[i][j]) === true && flag) {
            return false;
          }
          flag ? squareMap.set(this.grid[i][j], true) : null;
          if (!flag) return false;
        }
      }
    }
    return true;
  }

  updateSudoku(num) {
    if (globalVar.setCell !== undefined && globalVar.noteFlag != true) {
      let cell = globalVar.setCell.id;
      console.log(cell);
      this.grid[cell[0]][cell[1]] = Number(num);
      globalVar.setCell.innerHTML = num;
      globalVar.setCell.style.color = "blue";
      // globalVar.eraseStack.unshift({
      //   id: cell,
      //   value: Number(num),
      // });
      globalVar.undoStack.unshift({
        action: "addNum",
        id: cell,
        value: Number(num),
      });
      globalVar.count = globalVar.count + 1;
    }
  }
  updateNoteTable(num) {
    if (globalVar.setCell !== undefined) {
      let innerNote = document.getElementById(`${globalVar.setCell.id}${num}`);
      console.log(innerNote);
      let tmph = document.getElementById(`${globalVar.setCell.id}`);
      console.log(tmph.innerText === "");
      if (innerNote === null) {
        // if (globalVar.setCell.id.length === 2) {
        if (tmph.innerText === "") sudoku.renderNote(globalVar.setCell.id);
        // }
        //////////

        innerNote = document.getElementById(`${globalVar.setCell.id}${num}`);
        console.log(`${globalVar.setCell.id}${num}`);
        console.log(document.getElementById(`${globalVar.setCell.id}${num}`));
      }

      if (innerNote.innerHTML === num) {
        innerNote.innerHTML = "";

        globalVar.undoNoteStack.unshift({
          action: "eraseNumNote",
          id: innerNote.id,
          value: Number(num),
        });
      } else {
        innerNote.innerHTML = Number(num);

        globalVar.undoNoteStack.unshift({
          action: "addNumNote",
          id: innerNote.id,
          value: Number(num),
        });
      }
      globalVar.undoStack.unshift({
        action: "noteNum",
        id: globalVar.setCell.id,
        value: globalVar.undoNoteStack,
      });
    }
  }

  listenerButtonNumber() {
    for (let i = 0; i < numbersBtn.length; i++) {
      numbersBtn[i].addEventListener("click", function () {
        if (globalVar.noteFlag) sudoku.updateNoteTable(numbersBtn[i].innerHTML);
        else sudoku.updateSudoku(numbersBtn[i].innerHTML);
      });
    }
  }

  sattoloCycleShuffle() {
    for (var i = globalVar.nums.length; i-- > 1; ) {
      var j = Math.floor(Math.random() * i);
      var tmp = globalVar.nums[i];
      globalVar.nums[i] = globalVar.nums[j];
      globalVar.nums[j] = tmp;
    }
  }

  fullBoardGenerator() {
    if (globalVar.isRandom) {
      sudoku.resetGrid();
    }
    let row, col;

    const find = sudoku.findEmptysquare();
    if (find === false) {
      // checkBtn.disabled = false;
      sudoku.sudokuGenerator();
      return true;
    } else [row, col] = [...find];

    sudoku.sattoloCycleShuffle();
    for (const num of globalVar.nums) {
      // console.log(sudoku.isValidSudoku(row, col, i));
      if (sudoku.isValidSudoku(row, col, num, false)) {
        // console.log(row, col);
        this.grid[row][col] = num;

        if (sudoku.fullBoardGenerator()) {
          // console.log(count2++);
          // sudoku.displayGrid();

          return true;
        }

        this.grid[row][col] = 0;
      }
    }
    return false;
  }

  sudokuGenerator() {
    let attempts = 1;
    globalVar.counter = 1;
    let row,
      col,
      backUpVal,
      copyGrid = 0;
    while (attempts > 0) {
      row = Math.floor(Math.random() * 8) + 1;
      col = Math.floor(Math.random() * 8) + 1;
      while (this.grid[row][col] === 0) {
        row = Math.floor(Math.random() * 8) + 1;
        col = Math.floor(Math.random() * 8) + 1;
      }
      // console.log(row, ", ", col);
      backUpVal = this.grid[row][col];
      this.grid[row][col] = 0;

      copyGrid = this.grid.slice();
      // console.log(copyGrid);
      globalVar.counter = 0;
      sudoku.solver(copyGrid);
      console.log(globalVar.counter);
      if (globalVar.counter !== 1) {
        this.grid[row][col] = backUpVal;
        attempts -= 1;
      }
      sudoku.displayGrid();
    }
  }
  checkFullGrid(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === 0) return false;
      }
    }

    return true;
  }
  findEmptysquare() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        if (this.grid[i][j] === 0) return [i, j];
      }
    }
    // checkBtn.disabled = false;
    globalVar.isRandom = true;

    return false;
  }

  solver(grid = undefined) {
    let row, col, board;
    board = grid === undefined ? (board = this.grid) : grid;
    // console.log(board);
    const find = sudoku.findEmptysquare();
    if (find === false) {
      // checkBtn.disabled = false;

      return true;
    } else [row, col] = [...find];
    // console.log(this.grid);

    for (let i = 1; i < 10; i++) {
      // console.log(sudoku.isValidSudoku(row, col, i));
      if (sudoku.isValidSudoku(row, col, i, false)) {
        // console.log(row, col);
        board[row][col] = i;
        if (sudoku.checkFullGrid(board)) {
          globalVar.counter += 1;
          break;
        } else {
          if (sudoku.solver()) {
            // console.log(count++);

            sudoku.displayGrid();
            return true;
          }
        }
      }
    }
    board[row][col] = 0;
    return false;
  }

  resetGrid() {
    console.log("click");
    globalVar.isRandom = false;
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        this.grid[i][j] = 0;
      }
    }
    // console.log(this.grid);
    // globalVar.grid = grid3;
    sudoku.displayGrid();
  }
}
let count2 = 0;
const sudoku = new Sudoku();
sudoku.isComplete();

sudoku.listenerButtonNumber();
sudokuTable.addEventListener("click", sudoku.enterNumber);
checkBtn.addEventListener("click", sudoku.checkGrid.bind(sudoku));
undoBtn.addEventListener("click", sudoku.undo.bind(sudoku));
eraseBtn.addEventListener("click", sudoku.erase);
notesBtn.addEventListener("click", sudoku.notes);
solveBtn.addEventListener("click", sudoku.solver.bind(sudoku));
randomBtn.addEventListener("click", sudoku.fullBoardGenerator.bind(sudoku));
sudoku.displayGrid();

onload = () => {
  if (sudoku.findEmptysquare() === false) checkBtn.disabled = false;
};
