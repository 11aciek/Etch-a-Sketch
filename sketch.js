const WIDTH = 900;
const HEIGHT = 900;
const CELL_NUMBER = 100;
const container = document.querySelector(".container");

container.style.width = `${WIDTH}px`;
container.style.height = `${HEIGHT}px`;

let isSketching = false;

container.addEventListener("mousedown", () => isSketching = true);
container.addEventListener("mouseup", () => isSketching = false);

for (let i = 0; i < CELL_NUMBER * CELL_NUMBER; i++) {
  const cell = document.createElement("div");
  cell.style.width = `${WIDTH/CELL_NUMBER}px`;
  cell.style.height = `${HEIGHT/CELL_NUMBER}px`;
  cell.classList.add("cell");
  container.appendChild(cell);
  cell.addEventListener("mousemove", function() {
	if (isSketching) {
	cell.style["background-color"] = "black";
	}
  });
}
