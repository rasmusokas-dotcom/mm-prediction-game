function countMatches(predictedTeams, actualTeams, pointsPerTeam) {
  return predictedTeams.filter(team =>
    actualTeams.includes(team)
  ).length * pointsPerTeam
}

function calculateBracketPoints(prediction, actualBracket) {
  let points = 0

  points += countMatches(
    prediction.roundOf32,
    actualBracket.roundOf32,
    2
  )

  points += countMatches(
    prediction.roundOf16,
    actualBracket.roundOf16,
    4
  )

  points += countMatches(
    prediction.quarterFinals,
    actualBracket.quarterFinals,
    6
  )

  points += countMatches(
    prediction.semiFinals,
    actualBracket.semiFinals,
    8
  )

  points += countMatches(
    prediction.finalists,
    actualBracket.finalists,
    10
  )

  if (prediction.thirdPlace === actualBracket.thirdPlace) {
    points += 5
  }

  if (prediction.winner === actualBracket.winner) {
    points += 15
  }

  return points
}

export default calculateBracketPoints