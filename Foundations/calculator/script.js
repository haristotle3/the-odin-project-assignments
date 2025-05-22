const SCREEN = document.querySelector(".screen");
const OUT_OF_BOUNDS = "OUT_OF_BOUNDS";

let input = "";

let operator = "";
let operand1 = OUT_OF_BOUNDS;
let operand2 = OUT_OF_BOUNDS;

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
  numpad.addEventListener("click", (e) => {
    if (input.length >= 12 || SCREEN.textContent === "ERROR") return;

    let clickedBtn = e.target.id;
    if (clickedBtn === "point" && pointClickable) {
      clickedBtn = ".";
      toggleDecimalPoint();
      input += clickedBtn;
    } else if (clickedBtn !== "point") {
      input += clickedBtn;
    } else if (!pointClickable) {
      return;
    }

    SCREEN.textContent = input;
  });

  const operatorPad = document.querySelector(".operators");
  // handling operators.
  operatorPad.addEventListener("click", (e) => {
    let clickedBtn = e.target.id;

    switch (clickedBtn) {
      case "backspace":
        if (SCREEN.textContent === "ERROR") input = "";
        else {
          input = input.split("");
          if (input.pop() === ".") {
            toggleDecimalPoint();
          }
          input = input.join("");
        }
        SCREEN.textContent = input;
        return;

      case "ac":
        input = "";
        if (!pointClickable) toggleDecimalPoint();
        SCREEN.textContent = input;
        return;
    }

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
      case "equal":
        input = "";
        if (operand1 === OUT_OF_BOUNDS) return;
        if (operand2 === OUT_OF_BOUNDS) SCREEN.textContent = String(operand1);
        else SCREEN.textContent = String(operate(operand1, operand2, operator));
        break;
    }
  });
}

function operate(op1, op2, operation) {
  switch (operation) {
    case "+":
      return op1 + op2;
    case "-":
      return op1 - op2;
    case "*":
      return op1 * op2;
    case "/":
      if (op2 === 0) {
        SCREEN.textContent = "ERROR";
      }
      return op1 / op2;
  }
}

initDom();
