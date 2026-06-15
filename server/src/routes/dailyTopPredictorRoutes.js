import express from "express";
import calculatePoints from "../utils/calculatePoints.js";
import readPredictionFiles from "../utils/readPredictionFiles.js";
import getWorldCupMatches from "../api/footballApi.js";
import {
  getEstonianDateKey,
  getYesterdayEstonianDateKey,
} from "../utils/dateUtils.js";

const router = express.Router();

function isTargetDate(date, targetDate) {
  if (!date) return false;

  return getEstonianDateKey(date) === targetDate;
}

router.get("/", async (req, res) => {
  try {
    const users = readPredictionFiles();
    const matches = await getWorldCupMatches();
    const targetDate = getYesterdayEstonianDateKey();

    const finishedMatches = matches.filter(
      (match) =>
        isTargetDate(match.utcDate, targetDate) &&
        match.homeScore !== null &&
        match.awayScore !== null,
    );

    const results = users.map((user) => {
      let points = 0;

      user.matchPredictions.forEach((prediction) => {
        const match = finishedMatches.find(
          (match) => match.id === prediction.matchId,
        );

        if (!match) return;

        points += calculatePoints(prediction, match);
      });

      return {
        name: user.userName,
        points,
      };
    });

    const topPoints = Math.max(...results.map((result) => result.points), 0);

    const winners = results.filter(
      (result) => result.points === topPoints && topPoints > 0,
    );

    res.json({
      date: targetDate,
      winners,
      points: topPoints,
      matchesCount: finishedMatches.length,
    });
  } catch (error) {
    console.error("Daily top predictor error:", error);

    res.status(500).json({
      message: "Eilse päeva ennustaja arvutamine ebaõnnestus",
    });
  }
});

export default router;
