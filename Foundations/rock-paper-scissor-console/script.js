function getComputerChoice() {
  const choices = ["rock", "paper", "scissor"];
  let choice = Math.floor(Math.random() * 3);

  return choices[choice];
}

function getHumanChoice() {
  let choice = prompt("Rock or Paper or Scissor ?", "rock");
  return choice.toLowerCase();
}

function determineWinner(humanChoice, computerChoice) {}

function playRound(humanChoice, computerChoice) {
  switch (humanChoice) {
    case "rock":
      if (computerChoice === "rock") console.log("Tie");
      else if (computerChoice === "paper") {
        console.log("You lose");
        computerScore++;
      } else if (computerChoice === "scissor") {
        console.log("You Win!");
        humanScore++;
      }
      break;

    case "paper":
      if (computerChoice === "rock") {
        console.log("You Win!");
        humanScore++;
      } else if (computerChoice === "paper") {
        console.log("Tie");
      } else if (computerChoice === "scissor") {
        console.log("You lose");
        computerScore++;
      }
      break;

    case "scissor":
      if (computerChoice === "rock") {
        console.log("You lose");
        computerScore++;
      } else if (computerChoice === "paper") {
        console.log("You Win!");
        humanScore++;
      } else if (computerChoice === "scissor") {
        console.log("Tie");
      }
      break;

    default:
      console.log("Please enter a valid choice.");
  }
}

let humanScore = 0,
  computerScore = 0;

let humanChoice = getHumanChoice();
let computerChoice = getComputerChoice();

playRound(humanChoice, computerChoice);
console.log(humanScore);
console.log(computerScore);
