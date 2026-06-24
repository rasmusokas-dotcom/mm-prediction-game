import express from "express";
import calculatePoints from "../utils/calculatePoints.js";
import readPredictionFiles from "../utils/readPredictionFiles.js";
import getWorldCupMatches from "../api/footballApi.js";
import calculateBracketPoints from "../utils/calculateBracketPoints.js";
import getStableActualBracket from "../utils/getStableActualBracket.js";
import buildBracketDetails from "../utils/buildBracketDetails.js";
const router = express.Router();

router.get("/:name", async (req, res) => {
  try {
    const users = readPredictionFiles();
    const matches = await getWorldCupMatches();
    const actualBracket = getStableActualBracket(matches);
    const user = users.find(
      (user) => user.userName.toLowerCase() === req.params.name.toLowerCase(),
    );

    if (!user) {
      return res.status(404).json({
        message: "Kasutajat ei leitud",
      });
    }

    const matchDetails = user.matchPredictions.map((prediction) => {
      const match = matches.find((match) => match.id === prediction.matchId);

      if (!match) {
        return {
          ...prediction,
          points: 0,
          status: "MATCH_NOT_FOUND",
        };
      }

      const hasResult = match.homeScore !== null && match.awayScore !== null;

      const points = hasResult ? calculatePoints(prediction, match) : 0;

      return {
        matchId: prediction.matchId,
        group: match.group,
        utcDate: match.utcDate,
        homeTeam: prediction.homeTeam,
        awayTeam: prediction.awayTeam,
        homePrediction: prediction.homePrediction,
        awayPrediction: prediction.awayPrediction,
        actualHomeScore: match.homeScore,
        actualAwayScore: match.awayScore,
        status: match.status,
        points,
      };
    });

    const matchPoints = matchDetails.reduce(
      (sum, match) => sum + match.points,
      0,
    );
    const bracketPoints = calculateBracketPoints(
      user.bracketPredictions,
      actualBracket,
    );
    const bracketDetails = buildBracketDetails(
      user.bracketPredictions,
      actualBracket,
    );
    res.json({
      name: user.userName,
      matchPoints,
      bracketPoints,
      points: matchPoints + bracketPoints,
      bracketPredictions: user.bracketPredictions,
      bracketDetails,
      matches: matchDetails,
    });
  } catch (error) {
    console.error("User details error:", error);

    res.status(500).json({
      message: "Kasutaja detailide laadimine ebaõnnestus",
    });
  }
});

export default router;
