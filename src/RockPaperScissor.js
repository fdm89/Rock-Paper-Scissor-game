import React, { useState } from "react";
import rock from "./assets/rock-image.png";
import paper from "./assets/paper-image.png";
import scissor from "./assets/scissor-image.png";
import "./RockPaperScissor.css";

const options = [
  { name: "carta", image: paper },
  { name: "sasso", image: rock },
  { name: "forbice", image: scissor },
];

function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ user: 0, computer: 0 });


  const getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

  const determineWinner = (user, computer) => {
    if (user.name === computer.name) return "pareggio";
    if (
      (user.name === "sasso" && computer.name === "forbice") ||
      (user.name === "carta" && computer.name === "sasso") ||
      (user.name === "forbice" && computer.name === "carta")
    ) {
      setScore((prev) => ({ ...prev, user: prev.user + 1 }));
      return "hai vinto!";
    } else {
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
      return "hai perso...";
    }
  };

  const handleChoice = (choice) => {
    const computer = getRandomChoice();
    setUserChoice(choice);
    setComputerChoice(computer);
    setResult(determineWinner(choice, computer));
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
  };

  return (
    <div className="main-container">
      <header>
        <h1>Carta, Sasso, Forbice</h1>
        <div>
          Score: User {score.user} - Computer {score.computer}
        </div>
      </header>

      {!userChoice ? (
        <div>
          {options.map((option) => (
            <button key={option.name} onClick={() => handleChoice(option)}>
              <img src={option.image} alt={option.name} />
            </button>
          ))}
        </div>
      ) : (
        <div>
          <p>La tua scelta: <img src={userChoice.image} className="choice-image" alt={userChoice.name} /></p>
<p>Scelta del computer: <img src={computerChoice.image} className="choice-image" alt={computerChoice.name} /></p>



          <p>{result}</p>
          <button onClick={resetGame}>Rigioca</button>
        </div>
      )}
    </div>
  );
}

export default RockPaperScissors;
