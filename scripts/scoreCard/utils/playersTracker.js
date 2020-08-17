let players = [];

const playersTracker = () => {
  const addPlayer = (newPlayer) => {
    players = [...players, newPlayer];

    return players;
  };

  const resetPlayers = () => {
    players = [];

    return players;
  };

  const getCurrentPlayers = () => {
    return players;
  };

  return { addPlayer, resetPlayers, getCurrentPlayers };
};

export default playersTracker;
