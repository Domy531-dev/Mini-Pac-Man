const game = document.getElementById("game");
const gridSize = 10;
const totalCells = gridSize * gridSize;
let pacmanPosition = 22;

const walls = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 19, 20, 29, 30, 39,
  40, 49, 50, 59,
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
  79, 89, 99
];

let cells = [];

function createGrid() {
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    if (walls.includes(i)) {
      cell.classList.add("wall");
    } else {
      cell.classList.add("point");
    }

    game.appendChild(cell);
    cells.push(cell);
  }

  updatePacman();
}

function updatePacman() {
  cells.forEach(cell => cell.classList.remove("pacman"));
  cells[pacmanPosition].classList.add("pacman");
  cells[pacmanPosition].classList.remove("point");
}

function movePacman(e) {
  let nextPosition = pacmanPosition;

  switch (e.key) {
    case "ArrowUp":
      if (pacmanPosition - gridSize >= 0) nextPosition -= gridSize;
      break;
    case "ArrowDown":
      if (pacmanPosition + gridSize < totalCells) nextPosition += gridSize;
      break;
    case "ArrowLeft":
      if (pacmanPosition % gridSize !== 0) nextPosition -= 1;
      break;
    case "ArrowRight":
      if ((pacmanPosition + 1) % gridSize !== 0) nextPosition += 1;
      break;
  }

  if (!walls.includes(nextPosition)) {
    pacmanPosition = nextPosition;
    updatePacman();
  }
}

document.addEventListener("keydown", movePacman);

createGrid();
