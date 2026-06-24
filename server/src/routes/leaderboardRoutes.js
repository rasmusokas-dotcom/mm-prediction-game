import express from "express";
import calculatePoints from "../utils/calculatePoints.js";
import calculateBracketPoints from "../utils/calculateBracketPoints.js";
import getStableActualBracket from "../utils/getStableActualBracket.js";
import readPredictionFiles from "../utils/readPredictionFiles.js";
import getWorldCupMatches from "../api/footballApi.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = readPredictionFiles();
    const matches = await getWorldCupMatches();
    const actualBracket = getStableActualBracket(matches);

    const leaderboard = users.map((user) => {
      let matchPoints = 0;

      user.matchPredictions.forEach((prediction) => {
        const match = matches.find((match) => match.id === prediction.matchId);

        if (!match) return;

        if (match.homeScore === null || match.awayScore === null) {
          return;
        }

        matchPoints += calculatePoints(prediction, match);
      });

      const bracketPoints = calculateBracketPoints(
        user.bracketPredictions,
        actualBracket,
      );

      return {
        name: user.userName,
        matchPoints,
        bracketPoints,
        points: matchPoints + bracketPoints,
      };
    });

    leaderboard.sort((a, b) => b.points - a.points);

    res.json(leaderboard);
  } catch (error) {
    console.error("Leaderboard error:", error);

    res.status(500).json({
      message: "Leaderboardi arvutamine ebaõnnestus",
    });
  }
});

export default router;
