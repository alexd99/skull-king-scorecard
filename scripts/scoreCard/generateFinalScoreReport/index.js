import generateScores from "../utils/generateScores.js";
import generateRoundIndicator from "../generateRoundIndicator/index.js";
import stepTracker from "../utils/stepTracker.js";

const { setCurrentStep } = stepTracker();

const generateFinalScoreReport = () => {
  const finalScoreStep = document.getElementById("finalScore");
  setCurrentStep(11);

  setTimeout(() => {
    finalScoreStep.addEventListener("click", generateFinalScoreReport);
    finalScoreStep.style.cursor = "pointer";
    finalScoreStep.classList.add("finished");
  }, 2000);

  document.getElementById("roundFormContainer").innerHTML = "";

  const selectDiv = document.createElement("div");
  selectDiv.id = "finalScoreboardSelect";
  selectDiv.appendChild(generateRoundIndicator());

  const finalScoreBoard = document.createElement("div");
  finalScoreBoard.id = "finalScoreBoard";
  finalScoreBoard.appendChild(selectDiv);

  const finalScores = generateScores(11);
  finalScores.forEach((score) => {
    const playersScore = document.createElement("div");
    playersScore.classList.add("finalScoreBoardScore");
    playersScore.innerHTML = `<span>${score.place}. ${score.name}</span><span>${score.score}</span>`;
    finalScoreBoard.appendChild(playersScore);
  });

  const resetButton = document.createElement("button");
  resetButton.innerText = "Reset";
  resetButton.addEventListener("click", () => location.reload());
  finalScoreBoard.appendChild(resetButton);

  const finalScoreContainer = document.getElementById("finalScoreContainer");
  finalScoreContainer.innerHTML = "";
  finalScoreContainer.appendChild(finalScoreBoard);
};

export default generateFinalScoreReport;
