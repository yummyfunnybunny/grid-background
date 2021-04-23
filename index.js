window.addEventListener("load", () => {
  // ANCHOR -- Options List --

  // general Options
  const cellWidth = 100; // pixels
  const borderSize = 1; //pixels
  const borderRadius = 0; // percentage
  const borderColor = [0, 0, 20, 1]; // [hue, saturation, lightness, opacity]
  const backgroundColor = [0, 0, 15, 1]; // [hue, saturation, lightness, opcaity]
  const transitionSpeed = 1; // seconds - dictates how long the cell transition takes
  const transitionPattern = "ease-in";

  // Mouseover Options
  const mouseOverEffect = true;

  // Click Options
  const clickEffect = false;
  const clickSpeed = 0.05; // seconds
  const clickSwell = 0.5; // seconds

  // Random Options
  const randomEffect = false;
  const randomInterval = 0.1; // seconds - time between next cell activation
  const randomUpTime = 1; // seconds - how long each cell sits in the up position before going back down

  // Wave Options
  const waveEffect = true; // true/false
  const waveInterval = 7.5; // seconds - time between begining of each wave
  const waveUpTime = 0.75; // seconds - how long each cell sits in the up position before going back down
  const waveSpeed = 0.4; // seconds - how fast the wave moves
  const waveScatter = 0.5; // seconds - how scattered or tight the wave is (1 = default, higher = more scattered, lower = tighter)

  // ColorOptions
  const randomColors = true;
  const randomHue = true;
  const randomSaturation = false;
  const randomLightness = false;
  const randomOpacity = false;
  const transBorderColor = [0, 95, 71, 1]; // [hue, saturation, lightness, opacity]
  const transBackgroundColor = [0, 95, 71, 0.05]; // [hue, saturation, lightness, opacity]

  // Grid Overlay Options
  const overlayColor = [0, 0, 0, 0.5]; // [hue, saturation, lightness, opacity]

  // ANCHOR -- Initialize Grid --
  let width, height, columns, rows;
  setGridSize();
  console.log(rows, columns);
  CreateGrid(columns, rows);
  setOverlay();
  document.documentElement.style.setProperty(
    "--trans",
    `all ${transitionSpeed}s ${transitionPattern}`
  );

  // ANCHOR -- Initialize Global Cell Variables --
  // document.documentElement.style.cssText = `--trans-cell-bounceY: ${cellBounceY}%`;
  // document.documentElement.style.cssText = `--trans-cell-bounceX: ${cellBounceX}%`;

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
    if (mouseOverEffect) {
      console.log("mouseover event activated");
      el.addEventListener("mouseover", mouseEnterEffect);
      el.addEventListener("mouseout", mouseOutEffect);
    }

    //   ANCHOR -- Mouse out Effect --
    // if (mouseOverEffect) el.addEventListener("mouseout", mouseOutEffect);

    //   ANCHOR -- Mouse click Effect --
    if (clickEffect) {
      el.addEventListener("click", function () {
        console.log("click event triggered");
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

  // ANCHOR -- Set Grid Overlay --
  function setOverlay() {
    console.log(`running setOverlay: ${overlayColor}`);
    const overlay = document.querySelector(".grid-overlay");
    overlay.style.backgroundColor = `hsl(${overlayColor[0]},${overlayColor[1]}%,${overlayColor[2]}%, ${overlayColor[3]})`;
  }

  // ANCHOR -- Set Grid Size --
  function setGridSize() {
    width = document.getElementById("grid").clientWidth;
    height = document.getElementById("grid").clientHeight;
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
            setTimeout(function () {
              turnCellOff(_cell);
            }, waveUpTime * 1000);
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
      }, randomUpTime * 1000);
      randomCellEffect();
    }, randomInterval * 1000);
  }

  // ANCHOR -- create grid --
  function CreateGrid(columns, rows) {
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
        _cell.style.borderRadius = `${borderRadius}%`;
        _cell.style.border = `${borderSize}px solid hsla(${borderColor[0]},${borderColor[1]}%,${borderColor[2]}%,${borderColor[3]})`;
        _rowWidth.appendChild(_cell);
      }
    }
  }

  // ANCHOR -- delete grid --
  function deleteGrid() {
    console.log("delete grid");
    const gridBackground = document.getElementById("grid");
    gridBackground.innerHTML = "";
  }

  // ANCHOR -- Mouse Enter Effect --
  function mouseEnterEffect() {
    console.log("mouse enter");
    turnCellOn(this);
  }

  // ANCHOR -- Mouse Out Effect --
  function mouseOutEffect() {
    turnCellOff(this);
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
    // if (!cell.classList.contains("animating")) {
    cell.classList.add("td-hover");
    setColor(cell);
    // }
  }

  // ANCHOR -- Turn Cell Off --
  function turnCellOff(cell) {
    resetColor(cell);
    cell.classList.remove("td-hover");
  }

  // ANCHOR -- Set Color --
  function setColor(cell) {
    if (randomColors) {
      setRandomColor(cell);
    } else {
      cell.style.borderColor = `hsl(${transBorderColor[0]},${transBorderColor[1]}%,${transBorderColor[2]}%, ${transBorderColor[3]})`;
      cell.style.backgroundColor = `hsl(${transBackgroundColor[0]},${transBackgroundColor[1]}%,${transBackgroundColor[2]}%, ${transBackgroundColor[3]})`;
    }
  }
  // ANCHOR -- Set Random Color --
  function setRandomColor(cell) {
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
  }

  // ANCHOR -- Reset Color --
  function resetColor(cell) {
    cell.style.borderColor = `hsl(${borderColor[0]}, ${borderColor[1]}%, ${borderColor[2]}%, ${borderColor[3]})`;
    cell.style.backgroundColor = `hsl(${backgroundColor[0]}, ${backgroundColor[1]}%, ${backgroundColor[2]}%, ${backgroundColor[3]})`;
  }
});

// !SECTION ====================================

// TODO
/*
- add a HUD for changing the options? *this could take awhile*
*/
