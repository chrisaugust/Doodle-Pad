let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let rainbowMode = false;
const rainbowModeButton = document.getElementById("rainbow");
rainbowModeButton.addEventListener("click", () => (rainbowMode = !rainbowMode));

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearDoodles);

function createGrid(container) {
  for (let i = 0; i < 100; i++) {
    const row = document.createElement('div');
    row.setAttribute('id', `row-${i}`);
    row.classList.add('row');
    for (let j = 0; j < 100; j++) {
      const cell = document.createElement('div');
      cell.setAttribute('id', `col-${j}`);
      cell.classList.add('cell');
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
      e.target.setAttribute('style', `background: ${randomColor()};`);
    } else {
      e.target.setAttribute('style', 'background: black;');
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

// main program
const doodlePad = document.querySelector('.doodlepad')
window.onload = function() {
  createGrid(doodlePad);
};
