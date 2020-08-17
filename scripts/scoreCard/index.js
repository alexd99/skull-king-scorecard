import generateRoundForm from "./generateRoundForm/index.js";
import generateRoundIndicator from "./generateRoundIndicator/index.js";
import stepTracker from "./utils/stepTracker.js";
import playersTracker from "./utils/playersTracker.js";

const { getCurrentStep } = stepTracker();
const { addPlayer, resetPlayers, getCurrentPlayers } = playersTracker();

const playersForm = document.getElementById("playersForm");

playersForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // loop over the inputs in the form
  const inputs = Array.from(event.target.elements);
  inputs.forEach((input) => {
    if (input.value) {
      addPlayer(input.value);
    }
  });

  if (getCurrentPlayers().length < 2) {
    window.alert("Add at least two mateys");
  }
  // ensure the uniqueness of player names since the scorecard uses that to identify inputs
  else if (new Set(getCurrentPlayers()).size !== getCurrentPlayers().length) {
    resetPlayers();
    window.alert("No two mateys can 'ave th' same name");
  } else {
    const intro = document.getElementById("intro");

    const handleWindowChange = (event) => {
      const roundIndicator = document.getElementById(
        getCurrentStep() === 11 ? "finalScoreboardSelect" : "roundIndicator"
      );
      if (roundIndicator) {
        roundIndicator.innerHTML = "";
        roundIndicator.appendChild(generateRoundIndicator());
      }

      const progressBarContainer = document.getElementById(
        "progressBarContainer"
      );
      if (event.matches) {
        progressBarContainer.style.display = "none";
      } else {
        progressBarContainer.style.display = "block";
      }
    };
    handleWindowChange(window.matchMedia("(max-width: 800px)"));
    window.matchMedia("(max-width: 800px)").addListener(handleWindowChange);

    intro.style.display = "none";
    playersForm.style.display = "none";

    generateRoundForm();
  }
});
