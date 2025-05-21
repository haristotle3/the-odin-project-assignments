const CONTAINER_WIDTH = 960;

function initDom() {
  const container = document.querySelector(".container");
  container.addEventListener("mouseover", (e) => {
    const targetedDiv = e.target;
    console.log(targetedDiv);
    targetedDiv.style.backgroundColor = "black";
  });
}

function initGrid(gridSize = 16) {
  if (gridSize > 100) {
    alert("Please enter grid size less than 100.");
    return;
  }

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
      box.style.border = "1px solid rgb(192, 192, 192)";
      box.style.margin = box.style.padding = 0;
      container.appendChild(box);
    }
  }
}

initGrid();
initDom();
