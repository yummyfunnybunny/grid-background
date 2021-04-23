const setGridSize = () => {
  // get the width and height of the grid display
  width = document.getElementById("grid").clientWidth;
  height = document.getElementById("grid").clientHeight;

  // calculate the number of columns and rows based on the cell size in general options
  columns = Math.ceil(width / cellWidth);
  rows = Math.ceil(height / cellWidth);
};

const createGrid = (columns, rows) => {
  // Create the appropriate number of rows
  let tbl = document.getElementById("grid");
  for (let i = 0; i < rows; i++) {
    let _row = document.createElement("tr");
    _row.id = `row${i}`;
    _row.width = cellWidth;
    _row.height = cellWidth;
    tbl.appendChild(_row);

    // Create the appropruate number of columns
    let _rowWidth = document.getElementById(`row${i}`);
    for (let j = 0; j < columns; j++) {
      let _cell = document.createElement("td");
      _cell.classList.add(`cell-${i}-${j}`);
      _rowWidth.appendChild(_cell);
    }
  }
};

const setOverlay = () => {
  console.log(`running setOverlay: ${overlayColor}`);
  const overlay = document.querySelector(".grid-overlay");
  overlay.style.backgroundColor = `hsl(${overlayColor[0]},${overlayColor[1]}%,${overlayColor[2]}%, ${overlayColor[3]})`;
};

const deleteGrid = () => {
  //   console.log("delete grid");
  const gridBackground = document.getElementById("grid");
  gridBackground.innerHTML = "";
};

const turnCellOn = (cell) => {
  cell.classList.add("td-hover");
  setColor(cell);
};

const turnCellOff = (cell) => {
  resetColor(cell);
  cell.classList.remove("td-hover");
};

const setColor = (cell) => {
  if (randomColors) {
    setRandomColor(cell);
  } else {
    cell.style.borderColor = `hsl(${transBorderColor[0]},${transBorderColor[1]}%,${transBorderColor[2]}%, ${transBorderColor[3]})`;
    cell.style.backgroundColor = `hsl(${transBackgroundColor[0]},${transBackgroundColor[1]}%,${transBackgroundColor[2]}%, ${transBackgroundColor[3]})`;
  }
};

const setRandomColor = (cell) => {
  let _borderHue, _borderSaturation, _borderLightness, _borderOpacity;
  let _backgroundHue,
    _backgroundSaturation,
    _backgroundLightness,
    _backgroundOpacity;
  // Set Hue
  if (randomHue) {
    _borderHue = Math.floor(Math.random() * 360);
    _backgroundHue = _borderHue;
  } else {
    _borderHue = transBorderColor[0];
    _backgroundHue = transBackgroundColor[0];
  }
  // Set Saturation
  if (randomSaturation) {
    _borderSaturation = Math.floor(Math.random() * 100);
    _backgroundSaturation = _borderSaturation;
  } else {
    _borderSaturation = transBorderColor[1];
    _backgroundSaturation = transBackgroundColor[1];
  }
  // Set Lightness
  if (randomLightness) {
    _borderLightness = Math.floor(Math.random() * 100);
    _backgroundLightness = _borderLightness;
  } else {
    _borderLightness = transBorderColor[2];
    _backgroundLightness = transBackgroundColor[2];
  }
  // Set Opacity
  if (randomOpacity) {
    _borderOpacity = Math.random();
    _backgroundOpacity = _borderOpacity;
  } else {
    _borderOpacity = transBorderColor[3];
    _backgroundOpacity = transBackgroundColor[3];
  }
  // Apply Selected Colors
  cell.style.borderColor = `hsl(${_borderHue},${_borderSaturation}%,${_borderLightness}%, ${_borderOpacity})`;
  cell.style.backgroundColor = `hsl(${_backgroundHue},${_backgroundSaturation}%,${_backgroundLightness}%, ${_backgroundOpacity})`;
};

const resetColor = (cell) => {
  cell.style.borderColor = `hsl(${borderColor[0]}, ${borderColor[1]}%, ${borderColor[2]}%, ${borderColor[3]})`;
  cell.style.backgroundColor = `hsl(${backgroundColor[0]}, ${backgroundColor[1]}%, ${backgroundColor[2]}%, ${backgroundColor[3]})`;
};

const clickEffect = (cells, cell, i) => {
  setTimeout(function () {
    turnCellOn(cell);
  }, clickSpeed * 1000 * Math.abs(cells - i));

  setTimeout(function () {
    turnCellOff(cell);
  }, clickSwell * 1000 + clickSpeed * 1000 * Math.abs(cells - i));
};

const mouseEnter = () => {
  turnCellOn(this);
};

const mouseOut = () => {
  turnCellOff(this);
};

const waveEffect = () => {
  setTimeout(function () {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        setTimeout(function () {
          const _cell = document.querySelector(`.cell-${i}-${j}`);
          turnCellOn(_cell);
          // _cell.classList.add("td-hover");
          setTimeout(function () {
            turnCellOff(_cell);
            // _cell.classList.remove("td-hover");
          }, waveSwell * 1000);
        }, Math.floor(
          Math.random() * (waveScatter * 1000) + waveSpeed * 1000 * j
        ));
      }
    }
    waveCellEffect();
  }, waveInterval * 1000);
};

const randomEffect = () => {
  setTimeout(function () {
    // choose random cell
    const _row = Math.floor(Math.random() * rows);
    const _col = Math.floor(Math.random() * columns);
    const _cell = document.querySelector(`.cell-${_row}-${_col}`);
    // turn on chosen cell
    turnCellOn(_cell);
    setTimeout(function () {
      // turn chosen cell off after the swell time is up
      // console.log("turn cell off");
      turnCellOff(_cell);
    }, randomSwell * 1000);
    randomCellEffect();
  }, randomInterval * 1000);
};

// ANCHOR -- Export Functions --
module.exports = {
  setGridSize,
  createGrid,
  setOverlay,
  deleteGrid,
  turnCellOn,
  turnCellOff,
  setColor,
  setRandomColor,
  resetColor,
  clickEffect,
  mouseEnter,
  mouseOut,
  waveEffect,
  randomEffect,
};
