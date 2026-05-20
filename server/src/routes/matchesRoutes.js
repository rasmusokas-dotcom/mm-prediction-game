import express from "express"
import getWorldCupMatches from "../api/footballApi.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const matches = await getWorldCupMatches()

    res.json(matches)
  } catch (error) {
    console.error("Matches error:", error)

    res.status(500).json({
      message: "Mängude laadimine ebaõnnestus"
    })
  }
})

export default router