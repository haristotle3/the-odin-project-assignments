const CONTAINER_WIDTH = 960;

function initDom() {
  const container = document.querySelector(".container");
  container.addEventListener("mouseover", (e) => {
    const targetedDiv = e.target;
    // Handle opacity
    if (targetedDiv.style.backgroundColor === "") {
      let color = "black"; // Choose the color for interaction
      targetedDiv.style.backgroundColor = color;
      targetedDiv.style.opacity = 0.2;
    } else {
        targetedDiv.style.opacity = String(Number(targetedDiv.style.opacity) + 0.2);
    }
  });

  const resizeButton = document.querySelector("button");
  resizeButton.addEventListener("click", () => {
    let gridSize = 101;
    while (gridSize >= 100 || gridSize <= 0 || isNaN(gridSize)) {
      gridSize = parseInt(
        prompt("Please enter the grid size (more than 0 and less than 100)")
      );
    }

    initGrid(gridSize);
  });

  return;
}

function initGrid(gridSize = 16) {
  const container = document.querySelector(".container");

  // Remove all existing divs.
  while (container.lastElementChild) {
    container.lastElementChild.remove();
  }

  // create n x n grid. Given gridSize
  const divSize = CONTAINER_WIDTH / gridSize;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const box = document.createElement("div");
      box.style.boxSizing = "border-box";
      box.style.width = box.style.height = divSize + "px";
      box.style.border = "1px solid rgba(0,0,0, 0.25)";
      box.style.margin = box.style.padding = 0;
      container.appendChild(box);
    }
  }
}

function getRandomColor() {
  let randomNumber1 = String(Math.floor(Math.random() * 256));
  randomNumber1 = randomNumber1.padStart(3, 0);

  let randomNumber2 = String(Math.floor(Math.random() * 256));
  randomNumber2 = randomNumber2.padStart(3, 0);

  let randomNumber3 = String(Math.floor(Math.random() * 256));
  randomNumber3 = randomNumber3.padStart(3, 0);

  return `rgb(${randomNumber1}, ${randomNumber2}, ${randomNumber3})`;
}

initGrid();
initDom();
