const API_URL = import.meta.env.VITE_API_URL
async function request(path) {
  const response = await fetch(`${API_URL}${path}`)

  if (!response.ok) {
    throw new Error("API request failed")
  }

  return response.json()
}

export function getLeaderboard() {
  return request("/leaderboard")
}

export function getMatches() {
  return request("/matches")
}