const {
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
} = require("./gridFunctions");
const {} = require("./gridOptions");

window.addEventListener("load", () => {
  // ANCHOR -- Options --
  const generalOptions = {
    cellWidth: 1,
    borderSize: 1,
    borderRadius: 0,
  };

  // Mouseover options
  const mouseOverOptions = {
    on: false,
  };

  // Click options
  const clickOptions = {
    on: false,
    speed: 0.05, // seconds
    swell: 0.5, // seconds
  };

  // Random options
  const randomOptions = {
    on: false,
    interval: 0.1, // seconds
    swell: 1, // seconds
  };

  // Wave Options
  const waveOptioins = {
    on: true,
    interval: 0.1, // seconds
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
  };

  //   Initialize Grid
  let width, height, columns, rows;
  setGrid();
  createGrid(columns, rows);
  setOverlay();

  //   Window Resize
  window.onresize = () => {
    deleteGrid();
    setGridSize();
    createGrid(columns, rows);
  };
});
