window.addEventListener("load", () => {
  // ANCHOR -- Options List --

  // general Options
  const cellWidth = 200; // pixels
  const clickCellSpeed = 50; // miliseconds
  const clickCellDelay = 500; // miliseconds

  // Mouseover Options
  const mouveOverEffect = false;

  // Click Options
  const clickEffect = false;

  // Random Options
  const randomEffect = true;
  const randomInterval = 0.05; // seconds
  const randomSwell = 0.4; // seconds

  // Wave Options
  const waveEffect = false; // true/false
  const waveInterval = 7.5; // seconds
  const waveSwell = 0.4; // seconds
  const waveSpeed = 0.2; // seconds
  const waveScatter = 1; // seconds

  // ColorOptions
  const randomColors = false;

  // ANCHOR -- Initialize Grid --
  let width, height, columns, rows;
  setGridSize();
  console.log(rows, columns);
  CreateGrid(columns, rows);

  // ANCHOR -- Window Resize --
  window.onresize = function () {
    deleteGrid();
    setGridSize();
    CreateGrid(columns, rows);
  };

  //   SECTION -- Cell Event Listeners --
  const cell = document.querySelectorAll("td");
  cell.forEach(function (el) {
    //   ANCHOR -- Mouse Over Effect --
    if (mouveOverEffect) {
      console.log("mouseover event activated");
      el.addEventListener("mouseover", mouseEnterEffect);
      el.addEventListener("mouseout", mouseOutEffect);
    }

    //   ANCHOR -- Mouse out Effect --
    // if (mouveOverEffect) el.addEventListener("mouseout", mouseOutEffect);

    //   ANCHOR -- Mouse click Effect --
    if (clickEffect) {
      el.addEventListener("click", function () {
        let _cellRow = el.classList[0].split("-")[1];
        let _cellCol = el.classList[0].split("-")[2];

        // Cells Above Clicked Cell
        for (let i = _cellRow; i >= 0; i--) {
          let _cell = document.querySelector(`.cell-${i}-${_cellCol}`);
          clickCellEffect(_cellRow, _cell, clickCellSpeed, clickCellDelay, i);
        }
        // Cells Below Clicked Cell
        for (let i = _cellRow; i < rows; i++) {
          let _cell = document.querySelector(`.cell-${i}-${_cellCol}`);
          clickCellEffect(_cellRow, _cell, clickCellSpeed, clickCellDelay, i);
        }
        // Cells left of Clicked Cell
        for (let i = _cellCol; i >= 0; i--) {
          let _cell = document.querySelector(`.cell-${_cellRow}-${i}`);
          clickCellEffect(_cellCol, _cell, clickCellSpeed, clickCellDelay, i);
        }
        // Cells right of Clicked Cell
        for (let i = _cellCol; i < columns; i++) {
          let _cell = document.querySelector(`.cell-${_cellRow}-${i}`);
          clickCellEffect(_cellCol, _cell, clickCellSpeed, clickCellDelay, i);
        }
      });
    }
  });

  //   ANCHOR -- Random Effect--
  if (randomEffect) randomCellEffect();

  //   ANCHOR -- Wave Effect --
  if (waveEffect) waveCellEffect();

  // !SECTION ====================================
  // SECTION -- FUNCTIONS --

  // ANCHOR -- Set Grid Size --
  function setGridSize() {
    width = document.getElementById("grid-background").clientWidth;
    height = document.getElementById("grid-background").clientHeight;
    columns = Math.ceil(width / cellWidth);
    rows = Math.ceil(height / cellWidth);
  }

  //   ANCHOR -- Wave Effect --
  function waveCellEffect() {
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
  }

  //   ANCHOR -- Random Effect --
  function randomCellEffect() {
    setTimeout(function () {
      const _row = Math.floor(Math.random() * rows);
      const _col = Math.floor(Math.random() * columns);
      const _cell = document.querySelector(`.cell-${_row}-${_col}`);
      turnCellOn(_cell);
      // _cell.classList.add("td-hover");
      setTimeout(function () {
        turnCellOff(_cell);
        // _cell.classList.remove("td-hover");
      }, randomSwell * 1000);
      randomCellEffect();
    }, randomInterval * 1000);
  }

  // ANCHOR -- create grid --
  function CreateGrid(columns, rows) {
    // Create the appropriate number of rows
    let tbl = document.getElementById("grid-background");
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
  }

  // ANCHOR -- delete grid --
  function deleteGrid() {
    console.log("delete grid");
    const gridBackground = document.getElementById("grid-background");
    gridBackground.innerHTML = "";
  }

  // ANCHOR -- Mouse Enter Effect --
  function mouseEnterEffect() {
    console.log("mouse enter");
    turnCellOn(this);
  }

  // ANCHOR -- Mouse Out Effect --
  function mouseOutEffect() {
    setTimeout(() => {
      turnCellOff(this);
    }, 1000);
  }

  //   ANCHOR -- Click Cell Effect --
  function clickCellEffect(cells, cell, speed, delay, i) {
    setTimeout(function () {
      turnCellOn(cell);
    }, speed * Math.abs(cells - i));

    setTimeout(function () {
      turnCellOff(cell);
    }, delay + speed * Math.abs(cells - i));
  }

  // ANCHOR -- Turn Cell On --
  function turnCellOn(cell) {
    console.log("cell on");
    cell.classList.add("td-hover");
  }

  // ANCHOR -- Turn Cell Off --
  function turnCellOff(cell) {
    cell.classList.remove("td-hover");
  }
});

// !SECTION ====================================
