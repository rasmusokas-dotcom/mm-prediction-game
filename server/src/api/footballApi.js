import dotenv from "dotenv"
import testMatches from "../data/testMatches.js"
dotenv.config()

const API_KEY = process.env.FOOTBALL_DATA_API_KEY
const API_URL = "https://api.football-data.org/v4/competitions/WC/matches"
const USE_TEST_DATA = process.env.USE_TEST_DATA === "true"

let cachedMatches = []
let lastFetchTime = null

const CACHE_TIME = 5 * 60 * 1000

async function getWorldCupMatches() {
  if (USE_TEST_DATA) {
    return testMatches
  }
  if (!API_KEY) {
    throw new Error("FOOTBALL_DATA_API_KEY puudub .env failist")
  }
  const now = Date.now()

  if (
    cachedMatches.length > 0 &&
    lastFetchTime &&
    now - lastFetchTime < CACHE_TIME
  ) {
    return cachedMatches
  }

  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Auth-Token": API_KEY
      }
    })

    if (!response.ok) {
      throw new Error("Football API päring ebaõnnestus")
    }

    const data = await response.json()

    if (!data.matches) {
      throw new Error("Football API vastuses puudub matches")
    }

    cachedMatches = data.matches.map(match => ({
      id: match.id,
      stage: match.stage,
      utcDate: match.utcDate,
      homeTeam: match.homeTeam?.tla || "",
      awayTeam: match.awayTeam?.tla || "",
      homeScore: match.score?.fullTime?.home ?? null,
      awayScore: match.score?.fullTime?.away ?? null,
      status: match.status
    }))

    lastFetchTime = now

    return cachedMatches
  } catch (error) {
    console.error("Football API error:", error)

    if (cachedMatches.length > 0) {
      return cachedMatches
    }

    throw error
  }
}

export default getWorldCupMatches