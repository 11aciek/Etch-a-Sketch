const WIDTH = 900;
const HEIGHT = 900;
const container = document.querySelector(".container");
const newGrid = document.querySelector(".new-grid");
const showGrid = document.querySelector(".show-grid");

container.style.width = `${WIDTH}px`;
container.style.height = `${HEIGHT}px`;

let isSketching = false;
let cellNumber = 16;

container.addEventListener("mousedown", () => isSketching = true);
container.addEventListener("mouseup", () => isSketching = false);

newGrid.addEventListener("click", function() {
  const newCellNumber = Number(prompt("Number of rows? (10-100)"));
  if (isNaN(newCellNumber) || newCellNumber < 10 || newCellNumber > 100) {
	alert("Number between 10 and 100 please!");
	return;
  } else {
	cellNumber = newCellNumber;
  }
 
  clearBoard();
   makeGrid(cellNumber);

  function clearBoard() {
	let cells = document.querySelectorAll(".cell");
	console.log(cells);
	cells.forEach(c => container.removeChild(c));
	cells = null;
	console.log(cells);
  }
}); 

function makeGrid(cellNumber) {
  for (let i = 0; i < cellNumber * cellNumber; i++) {
	const cell = document.createElement("div");
	cell.style.width = `${WIDTH/cellNumber}px`;
	cell.style.height = `${HEIGHT/cellNumber}px`;
	cell.classList.add("cell");
	container.appendChild(cell);
	cell.addEventListener("mousemove", function() {
	  if (isSketching) {
	  cell.style["background-color"] = "blue";
	  }
	});
  }
  showGrid.classList.remove("active");
}

showGrid.addEventListener("click", function() {
  container.querySelectorAll(".cell").forEach(c => c.classList.toggle("grid"));
  showGrid.classList.toggle("active");
});

makeGrid(cellNumber);
