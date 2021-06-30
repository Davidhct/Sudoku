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
    let cell = e.target;
    sudoku.chooseNumber(cell.id);
  }

  chooseNumber(cell) {
    let flag;
    setCell = document.getElementById(cell);
    for (let i = 0; i < numbers.length; i++) {
      numbers[i].addEventListener("click", function (e) {
        console.log(numbers[i].innerHTML);

        flag = sudoku.validation(cell, numbers[i].innerHTML);
        if (flag === true) {
          setCell.innerHTML = numbers[i].innerHTML;
          // console.log(setCell.innerText);
          i = numbers.length - 1;
        } else {
          // console.log(setCell);
          // setCell.innerHTML = e.target.innerHTML;
          setCell.innerHTML = numbers[i].innerHTML;
          setCell.style.color = "red";
          i = numbers.length - 1;
        }
      });
    }
  }

  validation(cell, num) {
    // console.log(cell[0], cell[1]);
    for (let i = 0; i < this.grid.length; i++) {
      // console.log(typeof this.grid[cell[0]][i]);
      if (this.grid[cell[0]][i] === Number(num)) {
        console.log("vali");
        return false;
      }
    }
    return true;
  }
}

const sudoku = new Sudoku();
sudoku.displayGrid();
document.querySelector("table").addEventListener("click", sudoku.enterNumber);
