const WIDTH = 900;
const HEIGHT = 900;
const container = document.querySelector(".container");
const newGridButton = document.querySelector(".new-grid");
const showGridButton = document.querySelector(".show-grid");
const randColorButton = document.querySelector(".color");
const darkeningColorButton = document.querySelector(".darkening");
const gridSizeSlider = document.querySelector(".size-slider");

container.style.width = `${WIDTH}px`;
container.style.height = `${HEIGHT}px`;

let isSketching = false;
let cellNumber = 45;
let color = "rgb(67 67 243)";
let isDarkening = false;

container.addEventListener("mousedown", () => isSketching = true);
container.addEventListener("mouseup", () => isSketching = false);

gridSizeSlider.addEventListener("input", function() {
  cellNumber = gridSizeSlider.value;
  newGridButton.innerText = `New Grid: ${cellNumber} x ${cellNumber}`;
});

newGridButton.addEventListener("click", function() {
  document.querySelectorAll(".cell").forEach(c => container.removeChild(c));
  makeGrid(cellNumber);
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

  showGridButton.classList.remove("active");
}

showGridButton.addEventListener("click", function() {
  container.querySelectorAll(".cell").forEach(c => c.classList.toggle("grid"));
  showGridButton.classList.toggle("active");
});

randColorButton.addEventListener("click", function() {
  color = changeColor();
  randColorButton.style["background-color"] = color;
  container.querySelectorAll(".cell").forEach(c => c.classList.remove("non-blank"));
  
  function changeColor() {
	const rgb = [0,0,0].map(() => Math.floor(Math.random() * 255));
	return `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;
  }
});

darkeningColorButton.addEventListener("click", function() {
  isDarkening = isDarkening ? false : true;
  darkeningColorButton.classList.toggle("active");
  container.querySelectorAll(".cell").forEach(c => c.classList.remove("non-blank"));
});

makeGrid(cellNumber);
