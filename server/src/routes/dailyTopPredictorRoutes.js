import express from "express";
import calculatePoints from "../utils/calculatePoints.js";
import readPredictionFiles from "../utils/readPredictionFiles.js";
import getWorldCupMatches from "../api/footballApi.js";

const router = express.Router();

function isToday(date) {
  if (!date) return false;

  const today = new Date();
  const matchDate = new Date(date);

  return (
    today.getFullYear() === matchDate.getFullYear() &&
    today.getMonth() === matchDate.getMonth() &&
    today.getDate() === matchDate.getDate()
  );
}

router.get("/", async (req, res) => {
  try {
    const users = readPredictionFiles();
    const matches = await getWorldCupMatches();

    const todayFinishedMatches = matches.filter(
      (match) =>
        isToday(match.utcDate) &&
        match.homeScore !== null &&
        match.awayScore !== null,
    );

    const results = users.map((user) => {
      let points = 0;

      user.matchPredictions.forEach((prediction) => {
        const match = todayFinishedMatches.find(
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
      winners,
      points: topPoints,
      matchesCount: todayFinishedMatches.length,
    });
  } catch (error) {
    console.error("Daily top predictor error:", error);

    res.status(500).json({
      message: "Päeva ennustaja arvutamine ebaõnnestus",
    });
  }
});

export default router;
