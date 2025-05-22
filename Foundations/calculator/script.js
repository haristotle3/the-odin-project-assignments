const SCREEN = document.querySelector(".screen");

let operand = "";
let operator = "";

function initDom() {
  const numpad = document.querySelector(".buttons-container .numpad");
  // handling numpad clicks.
  let pointClickable = true;
  numpad.addEventListener("click", (e) => {
    let clickedBtn = e.target.id;

    if (clickedBtn === "point" && pointClickable) {
      clickedBtn = ".";
      pointClickable = false;
      e.target.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
      operand += clickedBtn;
    } else if (clickedBtn !== "point") {
      operand += clickedBtn;
    }
    SCREEN.textContent = operand;
  });

  const operatorPad = document.querySelector(".operators");
  // handling operators.
  operatorPad.addEventListener("click", (e) => {
    let clickedBtn = e.target.id;

    switch (clickedBtn) {
      case "addition":
        operator = "+";
        break;
      case "subtraction":
        operator = "-";
        break;
      case "multiplication":
        operator = "*";
        break;
      case "division":
        operator = "/";
        break;
      case "backspace":
        operand.split().splice(-1, 1).join();
        SCREEN.textContent = operand;
        break;
    }

    console.log(operand);
    console.log(operator);
  });
}

initDom();
