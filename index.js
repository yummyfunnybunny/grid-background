window.addEventListener("load", () => {
  // ANCHOR -- Options List --
  const cellWidth = 50;
  const clickCellSpeed = 50; // miliseconds
  const clickCellDelay = 500; // miliseconds
  const mouveOverEffect = false;
  const clickEffect = false;
  const randomEffect = false;
  const waveEffect = true;
  const randomColors = false;

  // ANCHOR -- Initialize Grid --
  let width, height, columns, rows;
  setGridSize();
  console.log(rows, columns);
  CreateGrid(columns, rows);

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
    if (mouveOverEffect) el.addEventListener("mouseover", mouseEnterEffect);

    //   ANCHOR -- Mouse out Effect --
    if (mouveOverEffect) el.addEventListener("mouseout", mouseOutEffect);

    //   ANCHOR -- Mouse click Effect --
    if (clickEffect) {
      el.addEventListener("click", function () {
        // console.log(el.classList[0]);
        let _cellRow = el.classList[0].split("-")[1];
        let _cellCol = el.classList[0].split("-")[2];
        // console.log(_cellRow, _cellCol);

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
            _cell.classList.add("td-hover");
            setTimeout(function () {
              _cell.classList.remove("td-hover");
            }, 500);
          }, 1000 + 100 * j);
        }
      }
      waveCellEffect();
    }, 7500);
  }

  //   ANCHOR -- Random Effect --
  function randomCellEffect() {
    setTimeout(function () {
      const _row = Math.floor(Math.random() * rows);
      const _col = Math.floor(Math.random() * columns);
      // console.log(_row, _col);
      const _cell = document.querySelector(`.cell-${_row}-${_col}`);
      _cell.classList.add("td-hover");
      setTimeout(function () {
        _cell.classList.remove("td-hover");
      }, 500);
      randomCellEffect();
    }, 10);
  }

  // ANCHOR -- delete grid --
  function deleteGrid() {
    console.log("delete grid");
    const gridBackground = document.getElementById("grid-background");
    gridBackground.innerHTML = "";
  }

  // ANCHOR -- Mouse Enter Effect --
  function mouseEnterEffect() {
    console.log("Were here!");
    this.classList.add("td-hover");
    const _color = `hsl(${Math.floor(Math.random() * 360)}, 95%, 71%)`;
    console.log(_color);
    this.style.border = `1px solid ${_color}`;
  }

  // ANCHOR -- Mouse Out Effect --
  function mouseOutEffect() {
    setTimeout(() => {
      this.classList.remove("td-hover");
    }, 1000);
  }

  //   ANCHOR -- Click Cell Effect --
  function clickCellEffect(cells, cell, speed, delay, i) {
    console.log("its working!");
    setTimeout(function () {
      cell.classList.add("td-hover");
    }, speed * Math.abs(cells - i));

    setTimeout(function () {
      cell.classList.remove("td-hover");
    }, delay + speed * Math.abs(cells - i));
  }
});
