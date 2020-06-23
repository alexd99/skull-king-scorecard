const generatePlayerTable = (players) => {
  form.style.display = "none";
  document.getElementById("intro").style.display = "none";

  const tableHead = document.getElementById("playerTableHead");

  // add each player name to the table head
  for (let i = 0; i < players.length + 1; i++) {
    const header = document.createElement("th");
    header.innerText = i === 0 ? "Round" : players[i - 1];

    tableHead.appendChild(header);
  }

  // generate the table body. This loops 11 times because we need a column for each of the 10 rounds
  // plus on more for the total scores at the bottom of the table
  const tableBody = document.getElementById("playerTableBody");
  for (let i = 0; i < 11; i++) {
    const tableRow = document.createElement("tr");

    // make a column for each player
    for (let j = 0; j < players.length + 1; j++) {
      const tableColumn = document.createElement("td");
      const wrapperDiv = document.createElement("div");

      // make the left side "Totals" cell
      if (i === 10 && j === 0) {
        tableColumn.innerText = "Totals";
        tableColumn.className = "tableText";
      }
      // make the left side round number cell
      else if (j === 0) {
        tableColumn.innerText = i + 1;
        tableColumn.className = "tableText";
      }
      // make the bottom total score cell
      else if (i === 10) {
        wrapperDiv.id = `total${i + 1}-${j}`;
        tableColumn.appendChild(wrapperDiv);
        wrapperDiv.innerText = 0;
        wrapperDiv.className = "tableText";
      }
      // generate the single player points cell
      else {
        // make three inputs, one for trick wanted, one for total tricks, and one for bonus points
        for (let k = 0; k < 3; k++) {
          const input = document.createElement("input");
          input.type = "number";
          input.className = "tableInput";
          input.addEventListener("change", () =>
            calculateRoundPoints(
              `trickWanted${i + 1}-${j}`,
              `tricksWon${i + 1}-${j}`,
              `bonusPoints${i + 1}-${j}`,
              `points${i + 1}-${j}`,
              `total11-${j}`,
              i + 1,
              j,
              players
            )
          );
          input.addEventListener("blur", (event) => {
            const blurredInput = event.target;

            // check if the input's value contains any characters besides numbers
            if (!/^[0-9-]+$/.test(blurredInput.value)) {
              blurredInput.classList.add("error");
              blurredInput.title = "Please enter a number";
            } else {
              blurredInput.className = "tableInput";
              blurredInput.title = "";
            }
          });

          switch (k) {
            case 0:
              input.placeholder = "Tricks Wanted";
              input.id = `trickWanted${i + 1}-${j}`;
              break;
            case 1:
              input.placeholder = "Tricks Won";
              input.id = `tricksWon${i + 1}-${j}`;
              break;
            case 2:
              input.placeholder = "Bonus Points";
              input.id = `bonusPoints${i + 1}-${j}`;
              break;
          }

          wrapperDiv.appendChild(input);
        }
        const pointsDiv = document.createElement("div");
        pointsDiv.id = `points${i + 1}-${j}`;
        pointsDiv.className = "points";
        pointsDiv.innerText = "0";
        wrapperDiv.appendChild(pointsDiv);

        tableColumn.appendChild(wrapperDiv);
      }
      tableRow.appendChild(tableColumn);
    }
    tableBody.appendChild(tableRow);
  }
};

const generateScoreTable = (players) => {
  const scoreTableHeader = document.getElementById("scoreTableHead");

  scoreTableHeader.innerHTML = `
      <th>Place</th>
      <th>Name</th>
      <th>Points</th>
  `;

  const scoreTableBody = document.getElementById("scoreTableBody");
  scoreTableBody.innerHTML = "";
  // generate a score row for every player
  players.forEach((player) => {
    const scoreRow = document.createElement("tr");
    scoreRow.innerHTML = `
      <td>${player.place}</td>
      <td>${player.name}</td>
      <td>${player.points}</td>
    `;
    scoreTableBody.appendChild(scoreRow);
  });
};

const calculateRoundPoints = (
  wanted,
  won,
  bonus,
  points,
  total,
  roundNumber,
  columnNumber,
  players
) => {
  let tricksWanted = document.getElementById(wanted).value;
  let tricksWon = document.getElementById(won).value;
  let bonusPoints = document.getElementById(bonus).value;
  const pointsDiv = document.getElementById(points);
  const totalPointsDiv = document.getElementById(total);

  const calculateTotalPoints = () => {
    let totalPoints = 0;
    // loop over the points div for the player(column) and add up all points
    for (let i = 1; i <= 10; i++) {
      const pointsDiv = document.getElementById(`points${i}-${columnNumber}`);
      const roundPoints = Number(pointsDiv.innerText);

      totalPoints += roundPoints;
    }

    return totalPoints;
  };

  const populatePoints = (points) => {
    pointsDiv.innerText = points;
    totalPointsDiv.innerText = calculateTotalPoints();
    calculatePlaces(players);
  };

  if (tricksWanted && Number(tricksWanted) === 0 && !bonusPoints) {
    document.getElementById(bonus).value = 0;
  }

  if (tricksWanted && tricksWon && bonusPoints) {
    let points = 0;

    tricksWanted = Number(tricksWanted);
    tricksWon = Number(tricksWon);
    bonusPoints = Number(bonusPoints);

    if (tricksWanted === tricksWon) {
      if (tricksWanted > 0) {
        // if the number of tricks you wanted is more than 0
        // your point go up by the number of trick you wanted multiplied by 20
        points += tricksWon * 20;
      } else {
        //if you want 0 tricks and get 0 trick your points goes up by 10 multiplied by the round number
        points += 10 * roundNumber;
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
        points -= 10 * roundNumber;
      }

      // There are cases when negative bonus points are given when a player does not get their bid.
      // This will only allow negative points to be added though.
      if (Math.sign(bonusPoints) === -1) {
        points += bonusPoints;
      }
    }

    populatePoints(points);
  } else {
    populatePoints(0);
  }
};

const calculatePlaces = (players) => {
  let playerTotals = [];

  for (let i = 0; i < players.length; i++) {
    const points = Number(
      document.getElementById(`total11-${i + 1}`).innerText
    );

    playerTotals.push({ points, name: players[i] });
  }

  playerTotals = playerTotals.sort((a, b) => {
    if (a.points < b.points) {
      return 1;
    }
    if (a.points > b.points) {
      return -1;
    }
    return 0;
  });

  for (let i = 0; i < playerTotals.length; i++) {
    const player = playerTotals[i];

    if (i > 0 && player.points === playerTotals[i - 1].points) {
      playerTotals[i] = { ...player, place: playerTotals[i - 1].place };
    } else {
      playerTotals[i] = { ...player, place: i + 1 };
    }
  }

  generateScoreTable(playerTotals);
};

const form = document.getElementById("numberOfPlayersForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let players = [];
  let playersForTable = [];

  for (index in event.target.elements) {
    const input = event.target.elements[index];
    if (input.value) {
      players.push(input.value);
      playersForTable.push({ points: 0, name: input.value, place: "?" });
    }
  }

  if (players.length < 2) {
    window.alert("Please add at least two players");
  } else {
    generatePlayerTable(players);
    generateScoreTable(playersForTable);
    document.getElementById("resetButton").style.display = "block";
  }
});
