window.addEventListener("load", () => {
  // ANCHOR -- Options List --

  // general Options
  const cellWidth = 100; // pixels
  const borderSize = 1;
  const borderRadius = 0; // percentage
  const borderColor = [0, 0, 21, 1]; // [hue, saturation, lightness, opacity]
  const backgroundColor = [0, 0, 15, 1]; // [hue, saturation, lightness, opcaity]
  const cellBounceX = 0; // percentage (transform: translateX(0))
  const cellBounceY = -20; // percentage (transform: translateY(-20%))

  const transBorderRadius = 0;
  const transBordorColor = [293, 95, 71, 1];
  const transBackgroundColor = [293, 95, 71, 0.5];

  // Mouseover Options
  const mouveOverEffect = false;

  // Click Options
  const clickEffect = false;
  const clickSpeed = 0.05; // seconds
  const clickSwell = 0.5; // seconds

  // Random Options
  const randomEffect = false;
  const randomInterval = 0.1; // seconds
  const randomSwell = 0.4; // seconds

  // Wave Options
  const waveEffect = true; // true/false
  const waveInterval = 7.5; // seconds
  const waveSwell = 0.75; // seconds
  const waveSpeed = 0.4; // seconds
  const waveScatter = 1; // seconds

  // ColorOptions
  const randomColors = true;
  const randomHue = true;
  const randomSaturation = false;
  const randomLightness = false;
  // const setColor = [293, 95, 71];
  const hue = 293;
  const saturation = 95;
  const lightness = 71;

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
    // ANCHOR -- animation end --
    // $(el).on("webkitAnimationEnd", function () {
    //   console.log("animtaiontEnd triggered!!");
    //   animationEnd();
    // });
    // el.addEventListener("animationend", function () {
    //   console.log("animation ended");
    // });

    // el.onanimationend = () => {
    //   console.log("yoyoyoy");
    //   animationEnd();
    // };

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
        const _cellRow = el.classList[0].split("-")[1];
        const _cellCol = el.classList[0].split("-")[2];

        // Cells Above Clicked Cell
        for (let i = _cellRow; i >= 0; i--) {
          const _cell = document.querySelector(`.cell-${i}-${_cellCol}`);
          clickCellEffect(_cellRow, _cell, i);
        }
        // Cells Below Clicked Cell
        for (let i = _cellRow; i < rows; i++) {
          const _cell = document.querySelector(`.cell-${i}-${_cellCol}`);
          clickCellEffect(_cellRow, _cell, i);
        }
        // Cells left of Clicked Cell
        for (let i = _cellCol; i >= 0; i--) {
          const _cell = document.querySelector(`.cell-${_cellRow}-${i}`);
          clickCellEffect(_cellCol, _cell, i);
        }
        // Cells right of Clicked Cell
        for (let i = _cellCol; i < columns; i++) {
          const _cell = document.querySelector(`.cell-${_cellRow}-${i}`);
          clickCellEffect(_cellCol, _cell, i);
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

  if (randomColors) {
  }

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
  function clickCellEffect(cells, cell, i) {
    setTimeout(function () {
      turnCellOn(cell);
    }, clickSpeed * 1000 * Math.abs(cells - i));

    setTimeout(function () {
      turnCellOff(cell);
    }, clickSwell * 1000 + clickSpeed * 1000 * Math.abs(cells - i));
  }

  // ANCHOR -- Turn Cell On --
  function turnCellOn(cell) {
    if (!cell.classList.contains("animating")) {
      console.log("cell on");
      cell.classList.add("td-hover");
      if (randomColors) setRandomColor(cell);
    }
  }

  // ANCHOR -- Turn Cell Off --
  function turnCellOff(cell) {
    cell.classList.remove("td-hover");
    if (randomColors) resetColor(cell);
  }

  // function animationEnd() {
  //   console.log("toggle animating");
  //   this.classList.toggleClass("animating");
  // }

  // ANCHOR -- Set Color --
  function setColor(cell) {
    if (randomColors) {
      setRamdonColor(cell);
    } else {
      cell.style.borderColor = `hsl(${hue},${saturation}%,${lightness}%)`;
    }
  }
  // ANCHOR -- Set Random Color --
  function setRandomColor(cell) {
    // hsl(293, 95%, 71%);
    let _hue, _saturation, _lightness;
    if (randomHue) {
      _hue = Math.floor(Math.random() * 360);
    } else {
      _hue = hue;
    }
    if (randomSaturation) {
      _saturation = Math.floor(Math.random() * 100);
    } else {
      _saturation = saturation;
    }
    if (randomLightness) {
      _lightness = Math.floor(Math.random() * 100);
    } else {
      _lightness = lightness;
    }
    // const saturation = Math.floor(Math.random() * 100);
    // const lightness = Math.floor(Math.random() * 100);
    // cell.style.borderColor = `hsl(${hue},95%,71%)`;
    cell.style.borderColor = `hsl(${_hue},${_saturation}%,${_lightness}%)`;
  }

  // ANCHOR -- Reset Color --
  function resetColor(cell) {
    cell.style.borderColor = `hsl(0, 0%, 21%)`;
  }
});

// !SECTION ====================================

// TODO
/*
- fix the mouseover and click functions
- add a HUD for changing the options? *this could take awhile*
- fix animation end toggling
*/
