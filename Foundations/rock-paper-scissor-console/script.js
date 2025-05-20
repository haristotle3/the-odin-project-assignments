const ERROR_VALUE = 400;
let humanScore = 0;
let computerScore = 0;
let gameOver = false;

function initDom() {
  const choices = document.querySelector(".choices-container");
  choices.addEventListener("click", (e) => playRound(e));

  const nextRoundBtn = document.querySelector(".round-res button");
  nextRoundBtn.addEventListener("click", () => {
    initChoices();
  });
  return;
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissor"];
  let choice = Math.floor(Math.random() * 3);

  return choices[choice];
}

function updateResults(roundResult) {
  if (roundResult == ERROR_VALUE) alert("ERROR: Round was never played.");

  if (roundResult === 1) {
    humanScore++;
  } else if (roundResult == -1) {
    computerScore++;
  }

  if (humanScore === 5 || computerScore === 5) {
    gameOver = true;
  }
}

function displayResults(roundResult) {
  const humanRoundResult = document.querySelector("h3.csc-human-score");
  const compRoundResult = document.querySelector("h3.csc-comp-score");

  const humanTotal = document.querySelector("h3.tsc-human-score");
  const compTotal = document.querySelector("h3.tsc-comp-score");

  const roundResDiv = document.querySelector(".round-res");

  if (gameOver) {
    const nextRoundBtn = document.querySelector(".round-res button");
    nextRoundBtn.style.display = "none";
  }
  if (roundResult === 1) {
    humanRoundResult.textContent = "1";
    roundResDiv.style.visibility = "visible";
    roundResDiv.style.backgroundColor = "green";
    const roundResDivH1 = document.querySelector(".round-res h1");
    roundResDivH1.textContent = "You win this round!";
  } else if (roundResult == -1) {
    compRoundResult.textContent = "1";
    roundResDiv.style.visibility = "visible";
    roundResDiv.style.backgroundColor = "red";
    const roundResDivH1 = document.querySelector(".round-res h1");
    roundResDivH1.textContent = "You lose this round!";
  } else if (roundResult === 0) {
    roundResDiv.style.visibility = "visible";
    roundResDiv.style.backgroundColor = "blue";
    const roundResDivH1 = document.querySelector(".round-res h1");
    roundResDivH1.textContent = "Round tied!";
  }

  humanTotal.textContent = String(humanScore);
  compTotal.textContent = String(computerScore);

  return;
}

function initChoices() {}

function playRound(e) {
  const humanChoice = e.target.className;
  const computerChoice = getComputerChoice();

  let choices = ["rock", "paper", "scissor"];
  choices = choices.filter((item) => item !== humanChoice);

  // Hide all other choices other than the player's selection
  for (let choice of choices) {
    let items = document.querySelectorAll("." + choice);

    for (let item of items) {
      item.style.display = "none";
    }
  }

  // Display computer's choice to the user.
  const compItem = document.querySelector("button.computer-choice");
  compItem.style.display = "flex";
  let compItemImg = document.createElement("img");
  compItemImg.src = `images/${computerChoice}.png`;
  compItem.appendChild(compItemImg);

  // Display 'VS'
  const vs = document.querySelector(".choices-container h1");
  vs.style.display = "flex";

  // Now play the round.
  let roundResult = ERROR_VALUE;
  switch (humanChoice) {
    case "rock":
      if (computerChoice === "rock") {
        roundResult = 0;
      } else if (computerChoice === "paper") {
        roundResult = -1;
      } else if (computerChoice === "scissor") {
        roundResult = 1;
      }
      break;

    case "paper":
      if (computerChoice === "rock") {
        roundResult = 1;
      } else if (computerChoice === "paper") {
        roundResult = 0;
      } else if (computerChoice === "scissor") {
        roundResult = -1;
      }
      break;

    case "scissor":
      if (computerChoice === "rock") {
        roundResult = -1;
      } else if (computerChoice === "paper") {
        roundResult = 1;
      } else if (computerChoice === "scissor") {
        roundResult = 0;
      }
      break;
  }

  updateResults(roundResult);
  displayResults(roundResult);
}

initDom();
