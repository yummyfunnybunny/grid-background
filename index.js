const gridBackground = () => {
  // make sure window is loaded before running the code
  window.addEventListener("load", () => {
    // ANCHOR -- Element Selectors
    const $gridEffectArea = document.getElementById("gridEffectArea");

    // ANCHOR -- FUNCTIONS
    const setGrid = (grid, cellWidth, color) => {
      // Set styling for gridEffectArea
      $gridEffectArea.style.width = "100%";
      $gridEffectArea.style.height = "100vh";
      $gridEffectArea.style.overflow = "hidden";
      $gridEffectArea.style.position = "relative";
      $gridEffectArea.style.backgroundColor = `hsl(${color.h},${color.s}%,${color.l}%, ${color.o})`;

      // get the width and height of the grid display
      gridSettings.width = $gridEffectArea.clientWidth;
      gridSettings.height = $gridEffectArea.clientHeight;

      // calculate the number of columns and rows based on the cell size in general options
      grid.columns = Math.ceil(grid.width / cellWidth);
      grid.rows = Math.ceil(grid.height / cellWidth);
    };

    const createGrid = (columns, rows) => {
      // Create the appropriate number of rows
      for (let i = 0; i < rows; i++) {
        const _row = document.createElement("tr");
        _row.id = `row${i}`;
        _row.width = generalOptions.cellWidth;
        _row.height = generalOptions.cellWidth;
        $gridEffectArea.appendChild(_row);

        // Create the appropriate number of columns
        const _rowWidth = document.getElementById(`row${i}`);
        for (let j = 0; j < columns; j++) {
          const _cell = document.createElement("td");
          _cell.classList.add(`cell-${i}-${j}`);
          _rowWidth.appendChild(_cell);

          // set styling for each cell
          _cell.style.borderRadius = generalOptions.cellBorderRadius.inactive;
          _cell.style.border = `${generalOptions.cellBorderSize} ${generalOptions.cellBorderStyle} hsl(${colorOptions.inactiveColors.border.h}, ${colorOptions.inactiveColors.border.s}%, ${colorOptions.inactiveColors.border.l}%, ${colorOptions.inactiveColors.border.o})`;
          _cell.style.transition = `all ${generalOptions.effectTime} ${generalOptions.effectSpeedCurve}`;
        }
      }
    };

    // create and set the grid-overlay into the grid
    const setOverlay = (color) => {
      // Do not set overlay if incorrect effectType is set
      if (
        generalOptions.effectType === "click" ||
        generalOptions.effectType === "mouseover"
      ) {
        return;
      }
      // Create the html to insert
      const html = `<div class="grid-overlay"></div>`;

      // Insert the html into the gridEffectArea
      $gridEffectArea.insertAdjacentHTML("afterbegin", html);

      // Set the styling for the overlay
      const overlay = document.querySelector(".grid-overlay");
      overlay.style.backgroundColor = `hsl(${color.h},${color.s}%,${color.l}%, ${color.o})`;
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.position = "absolute";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.zIndex = 5;
    };

    const deleteGrid = () => {
      $gridEffectArea.innerHTML = "";
    };

    const turnCellOn = (cell) => {
      console.log(cell);
      cell.classList.add("td-active");
      setColor(cell, colorOptions.activeColors);
    };

    const turnCellOff = (cell) => {
      resetColor(cell, colorOptions.inactiveColors);
      cell.classList.remove("td-active");
    };

    const setColor = (cell, colors) => {
      if (colorOptions.randomColors) {
        setRandomColor(cell, colorOptions.activeColors);
      } else {
        cell.style.borderColor = `hsl(${colors.border.h},${colors.border.s}%,${colors.border.l}%, ${colors.border.o})`;
        cell.style.backgroundColor = `hsl(${colors.fill.h},${colors.fill.s}%,${colors.fill.l}%, ${colors.fill.o})`;
      }
    };

    const getColorValue = (min, max) => {
      if (!max) return min;
      const randomNumber = Math.floor(Math.random(max - min) + min);
      console.log(randomNumber);
      return randomNumber;
    };

    const setRandomColor = (cell, colors) => {
      let borderH, borderS, borderL, borderO;
      let fillH, fillS, fillL, fillO;
      // Set Hue
      if (colorOptions.randomHue) {
        borderH = Math.floor(Math.random() * 360);
        fillH = Math.floor(Math.random() * 360);
      } else {
        borderH = colors.border.h; //transBorderColor[0];
        fillH = colors.fill.h; //transBackgroundColor[0];
      }
      // Set Saturation
      if (colorOptions.randomSaturation) {
        borderS = Math.floor(Math.random() * 100);
        fillS = Math.floor(Math.random() * 100);
      } else {
        borderS = colors.border.s; //transBorderColor[1];
        fillS = colors.fill.s; //transBackgroundColor[1];
      }
      // Set Lightness
      if (colorOptions.randomLightness) {
        borderL = Math.floor(Math.random() * 100);
        fillL = Math.floor(Math.random() * 100);
      } else {
        borderL = colors.border.l; //transBorderColor[2];
        fillL = colors.fill.l; //transBackgroundColor[2];
      }
      // Set Opacity
      if (colorOptions.randomOpacity) {
        borderO = Math.random();
        fillO = Math.random();
      } else {
        borderO = colors.border.o; //transBorderColor[3];
        fillO = colors.fill.o; //transBackgroundColor[3];
      }
      // Apply Selected Colors
      cell.style.borderColor = `hsl(${borderH},${borderS}%,${borderL}%, ${borderO})`;
      cell.style.backgroundColor = `hsl(${fillH},${fillS}%,${fillL}%, ${fillO})`;
    };

    const resetColor = (cell, color) => {
      // console.log("resetting");
      cell.style.borderColor = `hsl(${color.border.h}, ${color.border.s}%, ${color.border.l}%, ${color.border.o})`;
      cell.style.backgroundColor = `hsl(${color.fill.h}, ${color.fill.s}%, ${color.fill.l}%, ${color.fill.o})`;
    };

    const clickEffect = (cells, cell, i) => {
      setTimeout(function () {
        turnCellOn(cell);
      }, clickOptions.speed * 1000 * Math.abs(cells - i));

      setTimeout(function () {
        turnCellOff(cell);
      }, clickOptions.swell * 1000 +
        clickOptions.speed * 1000 * Math.abs(cells - i));
    };

    const mouseEnter = (cell) => {
      turnCellOn(cell);
    };

    const mouseOut = (cell) => {
      setTimeout(function () {
        turnCellOff(cell);
      }, mouseOverOptions.swell * 1000);
    };

    const waveEffect = () => {
      setTimeout(function () {
        for (let i = 0; i < gridSettings.rows; i++) {
          for (let j = 0; j < gridSettings.columns; j++) {
            setTimeout(function () {
              const _cell = document.querySelector(`.cell-${i}-${j}`);
              turnCellOn(_cell);
              // _cell.classList.add("td-hover");
              setTimeout(function () {
                turnCellOff(_cell);
                // _cell.classList.remove("td-hover");
              }, waveOptions.swell * 1000);
            }, Math.floor(
              Math.random() * (waveOptions.scatter * 1000) +
                waveOptions.speed * 1000 * j
            ));
          }
        }
        waveEffect();
      }, waveOptions.interval * 1000);
    };

    const randomEffect = () => {
      setTimeout(function () {
        // choose random cell
        const row = Math.floor(Math.random() * gridSettings.rows);
        const col = Math.floor(Math.random() * gridSettings.columns);
        const cell = document.querySelector(`.cell-${row}-${col}`);
        console.log(cell);

        // turn on chosen cell
        turnCellOn(cell);

        // turn chosen cell off after the swell time is up
        setTimeout(function () {
          turnCellOff(cell);
        }, randomOptions.swell * 1000);

        // Re-run randomEffect
        randomEffect();
      }, randomOptions.interval * 1000);
    };

    // ================================
    // ANCHOR -- OPTIONS
    // ================================
    const generalOptions = {
      effectType: "mouseover", // 'random', 'wave', 'click','mouseover',
      effectTime: "0.5s", // this is the transition time set on cells
      effectSpeedCurve: "ease-in", // linear, ease, ease-in, ease-out, auto, cubic-beziar
      cellWidth: 100, // pixels
      cellBorderSize: "1px", // pixels
      cellBorderStyle: "solid", // dotted, dashed, solid, double, none
      cellBorderRadius: {
        inactive: 0, // string -> pixels or percentage
        active: "25%", // string -> pixels or percentage
      },
      cellBorderRadius: 0, // pixels/percent
    };

    //   Initialize Grid
    const gridSettings = {
      width: 0,
      height: 0,
      columns: 0,
      rows: 0,
    };

    // Mouseover options
    const mouseOverOptions = {
      swell: 0.5,
    };

    // Click options
    const clickOptions = {
      speed: 0.05, // seconds
      swell: 0.5, // seconds
    };

    // Random options
    const randomOptions = {
      interval: 0.1, // seconds
      swell: 1, // seconds
    };

    // Wave Options
    const waveOptions = {
      interval: 7.5, // seconds
      swell: 1, // seconds
      speed: 0.4, // seconds
      scatter: 1, // seconds
    };

    // Color options
    const colorOptions = {
      randomColors: true, // Boolean
      randomHue: true, // Boolean
      randomSaturation: false, // Boolean
      randomLightness: false, // Boolean
      randomOpacity: false, // Boolean
      inactiveColors: {
        border: {
          h: 0,
          s: 0,
          l: 20,
          o: 1,
        },
        fill: {
          h: 0,
          s: 0,
          l: 15,
          o: 1,
        },
      },
      activeColors: {
        border: {
          h: 0,
          s: 95,
          l: 71,
          o: 1,
        },
        fill: {
          h: 0,
          s: 95,
          l: 71,
          o: 0.05,
        },
      },
      overlayColor: {
        h: 0,
        s: 0,
        l: 0,
        o: 0.5,
      },
    };

    // width, height, columns, rows;
    setGrid(
      gridSettings,
      generalOptions.cellWidth,
      colorOptions.inactiveColors.fill
    );
    createGrid(gridSettings.columns, gridSettings.rows);
    setOverlay(colorOptions.overlayColor);

    //   Window Resize
    window.onresize = () => {
      deleteGrid();
      setGrid(
        gridSettings,
        generalOptions.cellWidth,
        colorOptions.inactiveColors.fill
      );
      createGrid(gridSettings.columns, gridSettings.rows);
      setOverlay(colorOptions.overlayColor);
    };

    // Set Effects
    const cells = document.querySelectorAll("td");
    switch (generalOptions.effectType) {
      case "random":
        randomEffect();
        break;

      case "wave":
        waveEffect();
        break;

      case "mouseover":
        cells.forEach(function (cell) {
          cell.addEventListener("mouseover", () => {
            console.log(cell);
            mouseEnter(cell);
          });
          cell.addEventListener("mouseout", () => {
            mouseOut(cell);
          });
        });
        break;

      case "click":
        // const cells = document.querySelectorAll("td");
        cells.forEach(function (cell) {
          cell.addEventListener("click", function () {
            console.log("click event triggered");
            const _cellRow = cell.classList[0].split("-")[1];
            const _cellCol = cell.classList[0].split("-")[2];

            // Cells Above Clicked Cell
            for (let i = _cellRow; i >= 0; i--) {
              const _cell = document.querySelector(`.cell-${i}-${_cellCol}`);
              clickEffect(_cellRow, _cell, i);
            }
            // Cells Below Clicked Cell
            for (let i = _cellRow; i < gridSettings.rows; i++) {
              const _cell = document.querySelector(`.cell-${i}-${_cellCol}`);
              clickEffect(_cellRow, _cell, i);
            }
            // Cells left of Clicked Cell
            for (let i = _cellCol; i >= 0; i--) {
              const _cell = document.querySelector(`.cell-${_cellRow}-${i}`);
              clickEffect(_cellCol, _cell, i);
            }
            // Cells right of Clicked Cell
            for (let i = _cellCol; i < gridSettings.columns; i++) {
              const _cell = document.querySelector(`.cell-${_cellRow}-${i}`);
              clickEffect(_cellCol, _cell, i);
            }
          });
        });
        break;
    }
  });
};

module.exports.gridBackground = gridBackground;
// export default
