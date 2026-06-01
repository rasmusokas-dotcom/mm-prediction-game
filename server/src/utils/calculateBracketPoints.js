function countMatches(predictedTeams, actualTeams, pointsPerTeam) {
  if (!Array.isArray(predictedTeams)) return 0
  if (!Array.isArray(actualTeams)) return 0

  return predictedTeams.filter(team =>
    actualTeams.includes(team)
  ).length * pointsPerTeam
}

function calculateBracketPoints(prediction, actualBracket) {
  let points = 0

  points += countMatches(prediction.roundOf32, actualBracket.roundOf32, 1)
  points += countMatches(prediction.roundOf16, actualBracket.roundOf16, 2)
  points += countMatches(prediction.quarterFinals, actualBracket.quarterFinals, 3)
  points += countMatches(prediction.semiFinals, actualBracket.semiFinals, 4)
  points += countMatches(prediction.finalists, actualBracket.finalists, 5)

  if (prediction.thirdPlace === actualBracket.thirdPlace) points += 5
  if (prediction.winner === actualBracket.winner) points += 10

  return points
}

export default calculateBracketPoints