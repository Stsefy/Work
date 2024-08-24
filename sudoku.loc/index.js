const getElement = (selector) => {
  const element = document.querySelector(selector);
  return element;
};

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const sudokuCell = { value: null, isInitial: false };
const dx = [-1, -1, -1, 0, 0, 0, 1, 1, 1];
const dy = [-1, 0, 1, -1, 0, 1, -1, 0, 1];

const sudokuContainer = getElement(".sudoku-container");
const controlButtonsContainer = getElement(".control-buttons-container");
const endContainer = getElement(".end-container");

const clearButton = getElement("#clearButton");
const disableHintsButton = getElement("#disableHintsButton");
const restartButton = getElement("#restartButton");

let sudoku = [];
let selectedNumber = null;
let IsSelectedClearButton = false;
let isSudokuSolved = false;
let wins = 0;

const generateSudokuData = () => {
  for (let i = 1; i <= 9; i++) {
    const sudokuRow = [];
    for (let j = 1; j <= 9; j++) sudokuRow.push({ ...sudokuCell });
    sudoku.push(sudokuRow);
  }

  let template =
    "0681594327597283416342671589934157268278936145156842973729318654813465792465729831";
  let numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      const number = (i - 1) * 9 + j;
      if (Math.random() > 0.75)
        sudoku[i - 1][j - 1] = {
          value: numbers[Number(template.slice(number, number + 1)) - 1],
          isInitial: true,
        };
    }
  }
};

const renderSudokuMapData = () => {
  const sudokuMapCells = sudokuContainer.querySelectorAll(".sudoku-cell");
  let i = 0;
  let j = 0;

  for (let cellIndex = 0; cellIndex < sudokuMapCells.length; cellIndex++) {
    sudokuMapCells[cellIndex].innerHTML = sudoku[i][j].value;
    if (sudoku[i][j].isInitial) {
      sudokuMapCells[cellIndex].classList.add("bold");
    } else {
      sudokuMapCells[cellIndex].classList.remove("bold");
    }

    j++;
    if (j === 9) {
      i++;
      j = 0;
    }
  }
};

const setSelectedButtonStyle = (selectedButtonId) => {
  const numberButtons =
    controlButtonsContainer.querySelectorAll(".number-button");

  numberButtons.forEach((btn) => {
    if (btn.id === selectedButtonId) {
      btn.classList.add("selected-number-button");
    } else {
      btn.classList.remove("selected-number-button");
    }
  });

  clearButton.classList.remove("selected-clear-button");
};

const clearColorsFromMap = () => {
  const sudokuMapCells = sudokuContainer.querySelectorAll(".sudoku-cell");
  for (let cellIndex = 0; cellIndex < sudokuMapCells.length; cellIndex++) {
    sudokuMapCells[cellIndex].classList.remove("forbidden-cell");
  }
};

const isForbiddenCell = (x, y, number) => {
  if (sudoku[x][y].value) return true;

  for (let i = 0; i < 9; i++) {
    if (i !== x && sudoku[i][y].value === number) return true;
    if (i !== y && sudoku[x][i].value === number) return true;
  }

  let squareX = Math.trunc((x + 1) / 3);
  if ((x + 1) % 3) squareX++;

  let squareY = Math.trunc((y + 1) / 3);
  if ((y + 1) % 3) squareY++;

  const centerX = (squareX - 1) * 3 + 2;
  const centerY = (squareY - 1) * 3 + 2;

  for (let i = 0; i < dx.length; i++) {
    if (sudoku[centerX - 1 + dx[i]][centerY - 1 + dy[i]].value === number)
      return true;
  }

  return false;
};

const findForbiddenCellsForNumber = () => {
  clearColorsFromMap();

  const sudokuMapCells = sudokuContainer.querySelectorAll(".sudoku-cell");
  let i = 0;
  let j = 0;

  for (let cellIndex = 0; cellIndex < sudokuMapCells.length; cellIndex++) {
    if (isForbiddenCell(i, j, selectedNumber))
      sudokuMapCells[cellIndex].classList.add("forbidden-cell");

    j++;
    if (j === 9) {
      i++;
      j = 0;
    }
  }
};

const checkIfSudokuIsSolved = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!sudoku[i][j].value) return;
    }
  }

  const checkNumbersX = new Map();
  const checkNumbersY = new Map();

  for (let i = 0; i < 9; i++) {
    checkNumbersX.clear();
    checkNumbersY.clear();

    for (let j = 0; j < 9; j++) {
      if (checkNumbersX.has(sudoku[i][j].value)) return;
      checkNumbersX[sudoku[i][j].value] = true;

      if (checkNumbersY.has(sudoku[j][i].value)) return;
      checkNumbersY[sudoku[j][i].value] = true;
    }
  }

  for (let i = 1; i < 9; i += 3) {
    for (let j = 1; j < 9; j += 3) {
      checkNumbersX.clear();

      for (let d = 0; d < dx.length; d++) {
        const number = sudoku[i + dx[d]][j + dy[d]].value;

        if (checkNumbersX.has(number)) return;
        checkNumbersX[number] = true;
      }
    }
  }

  isSudokuSolved = true;
  wins++;
  updateWinsDisplay();
};
const updateWinsDisplay = () => {
  winsCountElement.textContent = wins;
};

const winsCountElement = getElement("#wins-count");

updateWinsDisplay();

const addHandlersToControlButtons = () => {
  controlButtonsContainer.addEventListener("click", (e) => {
    if (isSudokuSolved) return;

    if (e.target?.id && e.target.classList.contains("number-button")) {
      const selectedButtonId = e.target.id;

      setSelectedButtonStyle(selectedButtonId);
      selectedNumber = Number(e.target.id.slice(-1));
      IsSelectedClearButton = false;

      findForbiddenCellsForNumber();
    }
  });

  disableHintsButton.addEventListener("click", (e) => {
    if (isSudokuSolved) return;

    selectedNumber = null;
    IsSelectedClearButton = false;
    setSelectedButtonStyle(null);
    clearColorsFromMap();
  });

  clearButton.addEventListener("click", () => {
    if (isSudokuSolved) return;

    selectedNumber = null;
    IsSelectedClearButton = true;
    setSelectedButtonStyle(null);
    clearColorsFromMap();
    clearButton.classList.add("selected-clear-button");
  });

  sudokuContainer.addEventListener("click", (e) => {
    if (isSudokuSolved) return;

    if (e.target.classList.contains("sudoku-cell")) {
      const [i, j] = e.target.id.split(":");

      if (
        sudoku[i][j].isInitial ||
        e.target.classList.contains("forbidden-cell")
      )
        return;
      if (!selectedNumber && !IsSelectedClearButton) return;

      if (IsSelectedClearButton) {
        sudoku[i][j].value = null;
        renderSudokuMapData();
      } else if (selectedNumber) {
        sudoku[i][j].value = selectedNumber;
        renderSudokuMapData();
        findForbiddenCellsForNumber();
      }

      checkIfSudokuIsSolved();

      if (isSudokuSolved) {
        sudoku = [];
        selectedNumber = null;
        IsSelectedClearButton = false;
        setSelectedButtonStyle(null);
        clearColorsFromMap();

        endContainer.classList.add("game-end");
      }
    }
  });

  restartButton.addEventListener("click", () => {
    if (isSudokuSolved) initApp();
  });
};

const initApp = () => {
  endContainer.classList.remove("game-end");
  isSudokuSolved = false;
  generateSudokuData();
  renderSudokuMapData();
  addHandlersToControlButtons();
  updateWinsDisplay();
};

initApp();
