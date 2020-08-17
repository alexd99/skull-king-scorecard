// since rounds are one based this makes the the app simpler
// by making this array one based as well
const scores = ["this should remain empty"];

const scoreTracker = () => {
  const modifyRound = (roundNumber, newRoundPoints) => {
    scores[roundNumber] = newRoundPoints;

    return scores;
  };

  const lookUpRound = (roundNumber) => {
    return scores[roundNumber];
  };

  const getCurrentScores = () => {
    return scores;
  };

  return { modifyRound, lookUpRound, getCurrentScores };
};

export default scoreTracker;
