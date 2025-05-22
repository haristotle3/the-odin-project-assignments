const SCREEN = document.querySelector(".screen");
const SCREEN_LIMIT = 12;
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
    if (input.length >= SCREEN_LIMIT || SCREEN.textContent === "ERROR") return;

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
        if (!pointClickable) toggleDecimalPoint();
        input = "";
        operand1 = operand2 = OUT_OF_BOUNDS;
        operator = "";

        SCREEN.textContent = input;
        return;
    }

    if (operand1 === OUT_OF_BOUNDS) {
      operand1 = Number(input);
      input = "";
      if (!pointClickable) toggleDecimalPoint();
    } else if (operand2 === OUT_OF_BOUNDS) {
      if (input !== "") operand2 = Number(input);
    }

    switch (clickedBtn) {
      case "addition":
        operator = "+";
        if (operand2 !== OUT_OF_BOUNDS) {
          SCREEN.textContent = operate(operand1, operand2, "+");
          operand1 = Number(SCREEN.textContent);
          operand2 = OUT_OF_BOUNDS;
          input = "";
          if (!pointClickable) toggleDecimalPoint();
        }
        break;
      case "subtraction":
        operator = "-";
        if (operand2 !== OUT_OF_BOUNDS) {
          SCREEN.textContent = operate(operand1, operand2, "-");
          operand1 = Number(SCREEN.textContent);
          operand2 = OUT_OF_BOUNDS;
          input = "";
          if (!pointClickable) toggleDecimalPoint();
        }
        SCREEN.textContent = String(operand1);
        break;
      case "multiplication":
        operator = "*";
        if (operand2 !== OUT_OF_BOUNDS) {
          SCREEN.textContent = operate(operand1, operand2, "*");
          operand1 = Number(SCREEN.textContent);
          operand2 = OUT_OF_BOUNDS;
          input = "";
          if (!pointClickable) toggleDecimalPoint();
        }
        SCREEN.textContent = String(operand1);
        break;
      case "division":
        operator = "/";
        if (operand2 !== OUT_OF_BOUNDS) {
          SCREEN.textContent = operate(operand1, operand2, "/");
          operand1 = Number(SCREEN.textContent);
          operand2 = OUT_OF_BOUNDS;
          input = "";
          if (!pointClickable) toggleDecimalPoint();
        }
        SCREEN.textContent = String(operand1);
        break;
      case "equal":
        if (operand1 === OUT_OF_BOUNDS) return;
        if (operand2 === OUT_OF_BOUNDS) SCREEN.textContent = String(operand1);
        else {
          SCREEN.textContent = operate(operand1, operand2, operator);
          operand1 = Number(SCREEN.textContent);
          operand2 = OUT_OF_BOUNDS;
          input = "";
          operator = "";
          if (!pointClickable) toggleDecimalPoint();
        }

        break;
    }
  });
  // adding keyboard support.
  document.addEventListener("keydown", (e) => {
    let clickEvent = new MouseEvent("click", { bubbles: true });
    let crspndBtn;
    console.log(e.key);

    switch (e.key) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        crspndBtn = document.getElementById(e.key);
        crspndBtn.dispatchEvent(clickEvent);
        console.log(crspndBtn);
        break;
      case ".":
        crspndBtn = document.getElementById("point");
        crspndBtn.dispatchEvent(clickEvent);
        break;
      case "+":
        crspndBtn = document.getElementById("addition");
        crspndBtn.dispatchEvent(clickEvent);
        break;
      case "-":
        crspndBtn = document.getElementById("subtraction");
        crspndBtn.dispatchEvent(clickEvent);
        break;
      case "/":
        crspndBtn = document.getElementById("division");
        crspndBtn.dispatchEvent(clickEvent);
        break;
      case "*":
        crspndBtn = document.getElementById("multiplication");
        crspndBtn.dispatchEvent(clickEvent);
        break;
      case "Enter":
      case "=":
        crspndBtn = document.getElementById("equal");
        crspndBtn.dispatchEvent(clickEvent);
        break;
      case "Backspace":
        crspndBtn = document.getElementById("backspace");
        crspndBtn.dispatchEvent(clickEvent);
        break;
    }
  });
}

function operate(op1, op2, operation) {
  let result = 0;
  console.log(op1, op2, operator);

  switch (operation) {
    case "+":
      result = op1 + op2;
      break;
    case "-":
      result = op1 - op2;
      break;
    case "*":
      result = op1 * op2;
      break;
    case "/":
      if (op2 === 0) {
        SCREEN.textContent = "ERROR";
      }
      result = op1 / op2;
      break;
  }

  console.log(`just printing the results bro`, result);
  if (result == Math.floor(result)) {
    const numDigits = Math.ceil(Math.log10(result)) + 1;
    if (numDigits >= SCREEN_LIMIT) return "RANGE ERROR";
    return String(result);
  } else {
    const preDecimalPoint = Math.ceil(result);
    const numDigits =
      preDecimalPoint === 0
        ? 1
        : Math.ceil(Math.log10(Math.abs(preDecimalPoint))) + 1;
    const decimalDigits = SCREEN_LIMIT - 1 - numDigits;
    return String(result.toFixed(decimalDigits));
  }
}
initDom();
