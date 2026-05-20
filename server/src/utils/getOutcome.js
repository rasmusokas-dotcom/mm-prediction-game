function getOutcome(home, away) {
  if (home > away) return "HOME"
  if (home < away) return "AWAY"

  return "DRAW"
}

export default getOutcome