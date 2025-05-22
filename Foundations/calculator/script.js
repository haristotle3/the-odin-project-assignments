const SCREEN = document.querySelector(".screen");

let operand = "";
let operator = "";

const decimalPoint = document.querySelector("#point");
let pointClickable = true;

function toggleDecimalPoint() {
  pointClickable = !pointClickable;

  if (!pointClickable)
    decimalPoint.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
  else decimalPoint.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
}

function initDom() {
  const numpad = document.querySelector(".buttons-container .numpad");
  // handling numpad clicks.
  let pointClickable = true;
  numpad.addEventListener("click", (e) => {
    if (operand.length >= 12) return;

    let clickedBtn = e.target.id;

    if (clickedBtn === "point" && pointClickable) {
      clickedBtn = ".";
      toggleDecimalPoint();
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
        operand = operand.split("");
        if (operand.pop() === ".") {
          toggleDecimalPoint();
        }
        operand = operand.join("");
        SCREEN.textContent = operand;
        break;
      case "ac":
        operand = "";
        if (!pointClickable) toggleDecimalPoint();
        SCREEN.textContent = operand;
        break;
    }

    console.log(operand);
    console.log(operator);
  });
}

initDom();
