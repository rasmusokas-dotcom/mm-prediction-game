function addTeam(list, team) {
  if (team && !list.includes(team)) {
    list.push(team)
  }
}

function getWinner(match) {
  if (
    match.homeScore === null ||
    match.awayScore === null
  ) {
    return null
  }

  if (match.homeScore > match.awayScore) {
    return match.homeTeam
  }

  if (match.awayScore > match.homeScore) {
    return match.awayTeam
  }

  return null
}

function buildActualBracket(matches) {
  const actualBracket = {
    roundOf32: [],
    roundOf16: [],
    quarterFinals: [],
    semiFinals: [],
    finalists: [],
    thirdPlace: null,
    winner: null
  }

  matches.forEach(match => {
    const stage = match.stage
    const winner = getWinner(match)

    if (!winner) {
      return
    }

    if (stage === "LAST_32") {
      addTeam(actualBracket.roundOf16, winner)
    }

    if (stage === "LAST_16") {
      addTeam(actualBracket.quarterFinals, winner)
    }

    if (stage === "QUARTER_FINALS") {
      addTeam(actualBracket.semiFinals, winner)
    }

    if (stage === "SEMI_FINALS") {
      addTeam(actualBracket.finalists, winner)
    }

    if (stage === "THIRD_PLACE") {
      actualBracket.thirdPlace = winner
    }

    if (stage === "FINAL") {
      actualBracket.winner = winner
    }
  })

  matches.forEach(match => {
    if (match.stage === "LAST_32") {
      addTeam(actualBracket.roundOf32, match.homeTeam)
      addTeam(actualBracket.roundOf32, match.awayTeam)
    }
  })

  return actualBracket
}

export default buildActualBracket