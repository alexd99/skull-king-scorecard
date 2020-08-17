import scoreTracker from "./scoreTracker.js";

const { getCurrentScores } = scoreTracker();

const generateScores = (step) => {
  const generatedScores = [];

  // flatten the generatedScores array of into an array of objects.
  // shape = {name: string, score: int}
  for (let i = 1; i <= step; i++) {
    const round = getCurrentScores()[i];
    for (let player in round) {
      if (i === 1) {
        generatedScores.push({ name: player, score: round[player].total });
      } else {
        const positionIndex = generatedScores.findIndex(
          (a) => a.name === player
        );
        generatedScores[positionIndex].score =
          generatedScores[positionIndex].score + round[player].total;
      }
    }
  }

  // sort the array with the hightest score at position 0
  generatedScores.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  });

  // loop over the scores and assign a place to each player
  for (let i = 0; i < generatedScores.length; i++) {
    const player = generatedScores[i];

    // if the current player is tied with the previous play
    // they should have the same ordinal position
    if (i > 0 && player.score === generatedScores[i - 1].score) {
      generatedScores[i] = { ...player, place: generatedScores[i - 1].place };
    } else {
      generatedScores[i] = { ...player, place: i + 1 };
    }
  }

  return generatedScores;
};

export default generateScores;
