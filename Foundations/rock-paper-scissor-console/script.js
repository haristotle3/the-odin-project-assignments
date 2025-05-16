function getComputerChoice() {
  const choices = ["rock", "paper", "scissor"];
  let choice = Math.floor(Math.random() * 3);

  return choices[choice];
}

function getHumanChoice() {
  let choice = prompt("Rock or Paper or Scissor ?", "rock");
  return choice.toLowerCase();
}

function playRound() {
  let humanChoice = getHumanChoice();
  let computerChoice = getComputerChoice();

  switch (humanChoice) {
    case "rock":
      if (computerChoice === "rock") console.log("");
      else if (computerChoice === "paper") console.log("");
      else if (computerChoice === "scissor") console.log("");
      break;
  }
}

let humanScore = 0,
  computerScore = 0;
