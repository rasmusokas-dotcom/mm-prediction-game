import express from "express"
import readPredictionFiles from "../utils/readPredictionFiles.js"
import getWorldCupMatches from "../api/footballApi.js"
import buildActualBracket from "../utils/buildActualBracket.js"

const router = express.Router()

router.get("/predictions", (req, res) => {
  const users = readPredictionFiles()

  res.json(users)
})

router.get("/actual-bracket", async (req, res) => {
  const matches = await getWorldCupMatches()
  const actualBracket = buildActualBracket(matches)

  res.json(actualBracket)
})

export default router