import generateRoundForm from "../generateRoundForm/index.js";
import generateFinalScoreReport from "../generateFinalScoreReport/index.js";
import stepTracker from "../utils/stepTracker.js";
import scoreTracker from "../utils/scoreTracker.js";
import playersTracker from "../utils/playersTracker.js";

const { stepForwards, getCurrentStep, getLastCompletedStep } = stepTracker();
const { modifyRound } = scoreTracker();
const { getCurrentPlayers } = playersTracker();

// this function expects an event from the round form
const handleFormSubmission = (event) => {
  event.preventDefault();

  const roundPoints = {};

  getCurrentPlayers().forEach((player) => {
    let points = 0;

    const tricksWanted = parseInt(
      document.getElementById(`${player}-Wanted_${getCurrentStep()}`).value,
      10
    );
    const tricksWon = parseInt(
      document.getElementById(`${player}-Won_${getCurrentStep()}`).value,
      10
    );
    const bonusPoints = parseInt(
      document.getElementById(`${player}-Bonus_${getCurrentStep()}`).value,
      10
    );

    if (tricksWanted === tricksWon) {
      if (tricksWanted > 0) {
        // if the number of tricks you wanted is more than 0
        // your point go up by the number of trick you wanted multiplied by 20
        points += tricksWon * 20;
      } else {
        //if you want 0 tricks and get 0 trick your points goes up by 10 multiplied by the round number
        points += 10 * getCurrentStep();
      }

      // you only get the bonus points if you get the number of trick you wanted
      points += bonusPoints;
    } else {
      if (tricksWanted > 0) {
        // if the number of tricks you wanted is more than 0
        // your points go down by the number of trick you where off by multiplied by 20
        const numberOff =
          tricksWanted > tricksWon
            ? tricksWanted - tricksWon
            : tricksWon - tricksWanted;
        points -= numberOff * 10;
      } else {
        //if you want 0 tricks and don't get 0 tricks your score goes down by10 multiplied by the round number
        points -= 10 * getCurrentStep();
      }

      // There are cases when negative bonus points are given when a player does not get their bid.
      // This will only allow negative points to be added though.
      if (Math.sign(bonusPoints) === -1) {
        points += bonusPoints;
      }
    }

    roundPoints[player] = {
      total: points,
      Wanted: tricksWanted,
      Won: tricksWon,
      Bonus: bonusPoints,
    };
  });

  document.getElementById(`step${getCurrentStep()}`).classList.add("finished");

  modifyRound(getCurrentStep(), roundPoints);
  stepForwards();

  if (getCurrentStep() < 11) {
    generateRoundForm();
  } else {
    generateFinalScoreReport();
  }
};

export default handleFormSubmission;
