const WIDTH = 900;
const HEIGHT = 900;
const container = document.querySelector(".container");
const newGrid = document.querySelector(".new-grid");
const showGrid = document.querySelector(".show-grid");
const randColor = document.querySelector(".color");
const darkeningColor = document.querySelector(".darkening");

container.style.width = `${WIDTH}px`;
container.style.height = `${HEIGHT}px`;

let isSketching = false;
let cellNumber = 16;
let color = "rgb(67 67 243)";
let isDarkening = false;

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
	cells.forEach(c => container.removeChild(c));
	cells = null;
  }
}); 

function makeGrid(cellNumber) {
  for (let i = 0; i < cellNumber * cellNumber; i++) {
	const cell = document.createElement("div");
	cell.style.width = `${WIDTH/cellNumber}px`;
	cell.style.height = `${HEIGHT/cellNumber}px`;
	cell.classList.add("cell");
	container.appendChild(cell);

	cell.addEventListener("mouseover", function() {
	  if (isSketching) {
		if (cell.classList.contains("non-blank") && isDarkening) {
		  cell.style.opacity = Number(cell.style.opacity) + 0.10;
		  cell.style["background-color"] = color;
		} else {
		cell.style["background-color"] = color;
		cell.classList.add("non-blank");
		cell.style.opacity = isDarkening ? "0.5" : "1.0";
		}
	  }
	});
  }

  showGrid.classList.remove("active");
}

showGrid.addEventListener("click", function() {
  container.querySelectorAll(".cell").forEach(c => c.classList.toggle("grid"));
  showGrid.classList.toggle("active");
});

randColor.addEventListener("click", function() {
  color = changeColor();
  randColor.style["background-color"] = color;
  container.querySelectorAll(".cell").forEach(c => c.classList.remove("non-blank"));
  
  function changeColor() {
	const rgb = [0,0,0].map(() => Math.floor(Math.random() * 255));
	return `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;
  }
});

darkeningColor.addEventListener("click", function() {
  isDarkening = isDarkening ? false : true;
  darkeningColor.classList.toggle("active");
  container.querySelectorAll(".cell").forEach(c => c.classList.remove("non-blank"));
});

makeGrid(cellNumber);
