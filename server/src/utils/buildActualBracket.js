function addTeam(list, team) {
  if (team && !list.includes(team)) {
    list.push(team);
  }
}

function getWinner(match) {
  if (match.homeScore === null || match.awayScore === null) {
    return null;
  }

  if (match.homeScore > match.awayScore) {
    return match.homeTeam;
  }

  if (match.awayScore > match.homeScore) {
    return match.awayTeam;
  }

  return null;
}

function addMatchTeams(list, match) {
  addTeam(list, match.homeTeam);
  addTeam(list, match.awayTeam);
}

function buildActualBracket(matches) {
  const actualBracket = {
    roundOf32: [],
    roundOf16: [],
    quarterFinals: [],
    semiFinals: [],
    finalists: [],
    thirdPlace: null,
    winner: null,
  };

  matches.forEach((match) => {
    if (match.stage === "LAST_32") {
      addMatchTeams(actualBracket.roundOf32, match);
    }

    if (match.stage === "LAST_16") {
      addMatchTeams(actualBracket.roundOf16, match);
    }

    if (match.stage === "QUARTER_FINALS") {
      addMatchTeams(actualBracket.quarterFinals, match);
    }

    if (match.stage === "SEMI_FINALS") {
      addMatchTeams(actualBracket.semiFinals, match);
    }

    if (match.stage === "FINAL") {
      addMatchTeams(actualBracket.finalists, match);
      actualBracket.winner = getWinner(match);
    }

    if (match.stage === "THIRD_PLACE") {
      actualBracket.thirdPlace = getWinner(match);
    }
  });

  return actualBracket;
}

export default buildActualBracket;
