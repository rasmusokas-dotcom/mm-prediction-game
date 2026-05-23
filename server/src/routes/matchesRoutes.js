import express from "express"
import getWorldCupMatches from "../api/footballApi.js"
import readPredictionFiles from "../utils/readPredictionFiles.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const matches = await getWorldCupMatches()
    const users = readPredictionFiles()

    const matchesWithPredictions = matches.map(match => {
      const predictions = users
        .map(user => {
          const prediction = user.matchPredictions.find(
            prediction => prediction.matchId === match.id
          )

          if (!prediction) {
            return null
          }

          return {
            userName: user.userName,
            homePrediction: prediction.homePrediction,
            awayPrediction: prediction.awayPrediction
          }
        })
        .filter(Boolean)

      return {
        ...match,
        predictions
      }
    })

    res.json(matchesWithPredictions)
  } catch (error) {
    console.error("Matches error:", error)

    res.status(500).json({
      message: "Mängude laadimine ebaõnnestus"
    })
  }
})

export default router