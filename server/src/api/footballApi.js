import dotenv from "dotenv";
import testMatches from "../data/testMatches.js";
dotenv.config();

const API_KEY = process.env.FOOTBALL_DATA_API_KEY;
const API_URL = "https://api.football-data.org/v4/competitions/WC/matches";
const USE_TEST_DATA = process.env.USE_TEST_DATA === "true";

let cachedMatches = [];
let lastFetchTime = null;

const CACHE_TIME = 1 * 60 * 1000;

async function getWorldCupMatches() {
  if (USE_TEST_DATA) {
    return testMatches;
  }
  if (!API_KEY) {
    throw new Error("FOOTBALL_DATA_API_KEY puudub .env failist");
  }
  const now = Date.now();

  if (
    cachedMatches.length > 0 &&
    lastFetchTime &&
    now - lastFetchTime < CACHE_TIME
  ) {
    return cachedMatches;
  }

  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Football API päring ebaõnnestus: ${response.status} ${errorText}`,
      );
    }

    const data = await response.json();

    if (!data.matches) {
      throw new Error("Football API vastuses puudub matches");
    }

    cachedMatches = data.matches.map((match) => {
      const previousMatch = cachedMatches.find(
        (cachedMatch) => cachedMatch.id === match.id,
      );

      let status = match.status;

      const wasAlreadyLive =
        previousMatch?.status === "IN_PLAY" ||
        previousMatch?.status === "LIVE" ||
        previousMatch?.status === "PAUSED";

      const apiWentBackToScheduled =
        match.status === "TIMED" || match.status === "SCHEDULED";

      if (wasAlreadyLive && apiWentBackToScheduled) {
        status = previousMatch.status;
      }
      let homeScore = match.score?.fullTime?.home ?? null;
      let awayScore = match.score?.fullTime?.away ?? null;

      const previousHadScore =
        previousMatch &&
        previousMatch.homeScore !== null &&
        previousMatch.awayScore !== null;

      const apiLostScore = homeScore === null || awayScore === null;

      if (previousHadScore && apiLostScore) {
        homeScore = previousMatch.homeScore;
        awayScore = previousMatch.awayScore;
      }

      return {
        id: match.id,
        stage: match.stage,
        group: match.group,
        utcDate: match.utcDate,
        homeTeam: match.homeTeam?.tla || "",
        awayTeam: match.awayTeam?.tla || "",
        homeScore,
        awayScore,
        status,
      };
    });

    lastFetchTime = now;

    return cachedMatches;
  } catch (error) {
    console.error("Football API error:", error);

    if (cachedMatches.length > 0) {
      return cachedMatches;
    }

    throw error;
  }
}

export default getWorldCupMatches;
