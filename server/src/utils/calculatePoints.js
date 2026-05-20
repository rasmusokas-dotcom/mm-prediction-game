import getOutcome from "./getOutcome.js"

function calculatePoints(prediction, match) {
  const exactScore =
    prediction.homePrediction === match.homeScore &&
    prediction.awayPrediction === match.awayScore

  if (exactScore) {
    return 3
  }

  const predictedOutcome = getOutcome(
    prediction.homePrediction,
    prediction.awayPrediction
  )

  const actualOutcome = getOutcome(
    match.homeScore,
    match.awayScore
  )

  if (predictedOutcome === actualOutcome) {
    return 1
  }

  return 0
}

export default calculatePoints