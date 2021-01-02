import playersTracker from "../utils/playersTracker.js";
import stepTracker from "../utils/stepTracker.js";
import scoreTracker from "../utils/scoreTracker.js";

const { getCurrentPlayers } = playersTracker();
const { getCurrentStep } = stepTracker();
const { lookUpRound } = scoreTracker();

const setBonusToZero = (player) => {
  const bonusInput = document.getElementById(
    `${player}-Bonus_${getCurrentStep()}`
  );

  // if a value is already set don't override it
  if (!bonusInput.value) {
    bonusInput.value = "0";
  }
};

const generatePlayerInputs = () => {
  let inputs = new DocumentFragment();

  // for every player make a set of inputs
  getCurrentPlayers().forEach((player) => {
    const playerName = document.createElement("h3");
    playerName.classList.add("playerName");
    playerName.innerText = player;

    const scoreInputContainer = document.createElement("div");
    scoreInputContainer.classList.add("scoreInputContainer");
    scoreInputContainer.appendChild(playerName);

    // these are the three different inputs.
    // Loop over them and make an input for each one.
    const inputTypes = ["Wanted", "Won", "Bonus"];
    inputTypes.forEach((type, index) => {
      const scoreInput = document.createElement("div");
      scoreInput.classList.add("scoreInput");

      const label = document.createElement("label");
      label.htmlFor = `${player}-${type}_${getCurrentStep()}`;
      label.innerText = type === "Bonus" ? "Bonus Points" : `Tricks ${type}:`;
      scoreInput.appendChild(label);

      const input = document.createElement("input");
      input.id = `${player}-${type}_${getCurrentStep()}`;
      input.required = "true";
      input.type = "number";
      input.value = lookUpRound(getCurrentStep())?.[player]?.[type] ?? "";
      // this makes tabbing flow through the inputs more like the game itself.
      // ie. p1 wanted, p2 wanted, p1 won, p1 bonus, p2 won, p2 bonus
      input.tabIndex = index === 0 ? 1 : 2;
      scoreInput.appendChild(input);

      if (type === "Wanted") {
        input.addEventListener("blur", (event) => {
          // the majority of the time when a player bids zero they can not earn any bonus points
          if (event.target.value === "0") {
            setBonusToZero(player);
          }
        });
      }
      if (type === "Won") {
        input.addEventListener("blur", (event) => {
          const wantedValue = document.getElementById(
            `${player}-Wanted_${getCurrentStep()}`
          ).value;
          // players who didn't get their bid don't get bonus points. So set bonus points to 0.
          if (wantedValue !== event.target.value && event.target.value > 0) {
            setBonusToZero(player);
          }
        });
      }

      scoreInputContainer.appendChild(scoreInput);
    });

    inputs.appendChild(scoreInputContainer);
  });

  return inputs;
};

export default generatePlayerInputs;
