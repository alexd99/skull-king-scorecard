import handleFormSubmission from "./handleFormSubmission.js";
import generatePlayerInputs from "./generatePlayerInputs.js";
import generateRoundIndicator from "../generateRoundIndicator/index.js";
import stepTracker from "../utils/stepTracker.js";
import generateScores from "../utils/generateScores.js";

const { stepBackwards, setCurrentStep, getCurrentStep } = stepTracker();

const generateRoundForm = () => {
  const stepElement = document.getElementById(`step${getCurrentStep()}`);
  const roundFormContainer = document.getElementById("roundFormContainer");
  const finalScoreContainer = document.getElementById("finalScoreContainer");

  roundFormContainer.innerHTML = "";
  finalScoreContainer.innerHTML = "";

  stepElement.style.cursor = "pointer";
  stepElement.addEventListener("click", (event) => {
    setCurrentStep(parseInt(event.target.id.replace("step", ""), 10));
    generateRoundForm();
  });

  const previousButton = document.createElement("button");
  previousButton.type = "button";
  previousButton.title = "Previous Round";
  previousButton.disabled = getCurrentStep() === 1;
  previousButton.classList.add("roundNavigationButton");
  previousButton.innerHTML = `&#x2039`;
  previousButton.addEventListener("click", () => {
    stepBackwards();
    generateRoundForm();
  });

  const roundIndicator = document.createElement("div");
  roundIndicator.id = "roundIndicator";
  roundIndicator.appendChild(generateRoundIndicator());

  // the next button uses a form submission to generate the next round.
  const nextButton = document.createElement("button");
  nextButton.type = "submit";
  nextButton.title = "Next Round";
  nextButton.tabIndex = "3";
  nextButton.classList.add("roundNavigationButton");
  nextButton.innerHTML = `&#x203A;`;

  const roundIndicatorBox = document.createElement("div");
  roundIndicatorBox.appendChild(previousButton);
  roundIndicatorBox.appendChild(roundIndicator);
  roundIndicatorBox.appendChild(nextButton);

  const formTitleBox = document.createElement("div");
  formTitleBox.id = "formTitleBox";
  formTitleBox.appendChild(roundIndicatorBox);

  const roundInputsContainer = document.createElement("div");
  roundInputsContainer.id = "roundInputsContainer";
  roundInputsContainer.appendChild(generatePlayerInputs());

  const roundForm = document.createElement("form");
  roundForm.id = "roundForm";
  roundForm.addEventListener("submit", handleFormSubmission);
  roundForm.appendChild(formTitleBox);
  roundForm.appendChild(roundInputsContainer);

  // generate scores for the previous round
  const arrayOfScores = generateScores(getCurrentStep() - 1);

  if (arrayOfScores.length) {
    const roundScoreBoard = document.createElement("div");
    roundScoreBoard.id = "roundScoreBoard";

    const title = document.createElement("h3");
    title.id = "roundScoreBoardTitle";
    title.innerText = "Scores";
    roundScoreBoard.appendChild(title);

    arrayOfScores.forEach((score) => {
      const roundScore = document.createElement("div");
      roundScore.classList.add("roundScore");
      roundScore.innerHTML = `<span>${score.place}. ${score.name}</span><span>${score.score}</span>`;
      roundScoreBoard.appendChild(roundScore);
    });

    roundForm.appendChild(roundScoreBoard);
  }

  roundFormContainer.appendChild(roundForm);
};

export default generateRoundForm;
