const generateShipName = (length) => {
  const names = [
    "Bloody Saber",
    "Queen Anne’s Revenge",
    "Buccaneers Jewel",
    "Adventurer's Demise",
    "Anger of Hades",
    "Adventurer's Revenge",
    "Speedy Delight",
    "Gold Doubloon",
    "Mad Squid",
    "Golden Fleece",
    "Royal Fortune",
    "Flying Dragon",
    "Scourge of the Seven Seas",
    "Mourning Star",
    "Hades Cutlass",
    "Terror of the sea",
    "Golden Cutlass",
    "Doomed Dawn",
  ];

  let ctr = names.length;
  let temp;
  let index;

  // shuffle the array of names
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);

    ctr--;

    temp = names[ctr];
    names[ctr] = names[index];
    names[index] = temp;
  }

  return names.splice(0, length);
};

const generatorPlayersForm = () => {
  const playersForm = document.getElementById("playersForm");
  const startGameContainer = document.getElementById("startGameContainer");
  const shipNames = generateShipName(6);

  shipNames.forEach((name) => {
    const label = document.createElement("label");
    label.classList.add("playerName");
    label.innerHTML = `${name}:<input type="text" />`;

    playersForm.insertBefore(label, startGameContainer);
  });
};

generatorPlayersForm();
