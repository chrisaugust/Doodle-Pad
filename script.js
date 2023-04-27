let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let rainbowMode = false;
const rainbowModeButton = document.getElementById("rainbow");
rainbowModeButton.addEventListener("click", () => (rainbowMode = !rainbowMode));

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearDoodles);

const GRID_WIDTH = 960;

function createGrid(container, size) {
  let cellDimensions = Math.floor(GRID_WIDTH / size);
  for (let i = 0; i < size; i++) {
    const row = document.createElement('div');
    row.setAttribute('id', `row-${i}`);
    row.classList.add('row');
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('div');
      cell.setAttribute('id', `col-${j}`);
      cell.classList.add('cell');
      cell.setAttribute('style', `width: ${cellDimensions}px; height: ${cellDimensions}px;`);
      row.appendChild(cell);
      cell.addEventListener('mouseover', draw);
      cell.addEventListener('mousedown', draw);
      row.appendChild(cell);
    };
    container.appendChild(row);
  };
}

function draw(e) {
  if (e.type === 'mouseover' && mouseDown) {
    if (rainbowMode) { 
      e.target.style['backgroundColor'] = randomColor();
    } else {
      e.target.style['backgroundColor'] = 'black';
    }
  }
}

function singleRandomColorValue() {
  return Math.floor(Math.random() * 255)
}

function randomColor() {
  let r = singleRandomColorValue();
  let g = singleRandomColorValue();
  let b = singleRandomColorValue();
  return `rgb(${r},${g},${b})`
}

function clearDoodles() {
  window.location.reload();
}

function promptUserForGridSize() {
  let squaresPerSide = prompt("How many squares per side? ");
  if (squaresPerSide != null) { return parseInt(squaresPerSide) };
  return 100;
}

// main program
const doodlePad = document.querySelector('.doodlepad')
window.onload = function() {
  let size = promptUserForGridSize();   
  console.log(size);
  createGrid(doodlePad, size);
};
