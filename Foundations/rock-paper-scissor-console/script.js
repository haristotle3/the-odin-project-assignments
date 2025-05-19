function getComputerChoice() {
  const choices = ["rock", "paper", "scissor"];
  let choice = Math.floor(Math.random() * 3);

  return choices[choice];
}

function getHumanChoice() {
  let choice = prompt("Rock or Paper or Scissor ?", "rock");
  return choice.trim().toLowerCase();
}

const INVALID_CHOICE = 400;

function playRound(humanChoice, computerChoice) {
  switch (humanChoice) {
    case "rock":
      if (computerChoice === "rock") return -1;
      else if (computerChoice === "paper") {
        return 0;
      } else if (computerChoice === "scissor") {
        return 1;
      }
      break;

    case "paper":
      if (computerChoice === "rock") {
        return 1;
      } else if (computerChoice === "paper") {
        return -1;
      } else if (computerChoice === "scissor") {
        return 0;
      }
      break;

    case "scissor":
      if (computerChoice === "rock") {
        return 0;
      } else if (computerChoice === "paper") {
        return 1;
      } else if (computerChoice === "scissor") {
        return -1;
      }
      break;

    default:
      alert("Please enter a valid choice.");
      return INVALID_CHOICE;
  }
}

function playGame(numRounds) {
  let humanScore = 0,
    computerScore = 0;

  for (let i = 0; i < numRounds; i++) {
    let humanChoice = getHumanChoice();
    let computerChoice = getComputerChoice();

    console.log(("Human : " + humanChoice).padEnd(32), "Computer : " + computerChoice);
    let roundResult = playRound(humanChoice, computerChoice);

    if (roundResult == 1) humanScore++;
    else if (roundResult == 0) computerScore++;
    else if (roundResult == INVALID_CHOICE) i--;
  }

  console.log("Final scores:");
  console.log("Human : ", humanScore);
  console.log("Computer : ", computerScore);

  if (humanScore == computerScore) console.log("Match Tied!");
  else if (humanScore > computerScore) console.log("Human Wins!");
  else if (humanScore < computerScore) console.log("Computer Wins!");
}

