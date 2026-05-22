import Leaderboard from "../components/Leaderboard"
import Matches from "../components/Matches"
import useLeaderboard from "../hooks/useLeaderboard"
import useMatches from "../hooks/useMatches"
import { useState } from "react"

function HomePage() {
  const [showAllMatches, setShowAllMatches] = useState(false)
  const {
    leaderboard,
    loading,
    error
  } = useLeaderboard()
  const {
    matches,
    loading: matchesLoading,
    error: matchesError
  } = useMatches()
  const visibleMatches = showAllMatches
    ? matches
    : matches.filter(match => isToday(match.utcDate))
  function isToday(date) {
    if (!date) return false

    const today = new Date()
    const matchDate = new Date(date)

    return (
      today.getFullYear() === matchDate.getFullYear() &&
      today.getMonth() === matchDate.getMonth() &&
      today.getDate() === matchDate.getDate()
    )
  }

  return (
    <div className="container">
      <h1>MM Ennustusmäng</h1>

      <div className="section">
        <h2>Edetabel</h2>

        {loading && <p>Laen edetabelit...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <Leaderboard leaderboard={leaderboard} />
        )}
      </div>

      <div className="section">
        <h2>Mängud</h2>

        {matchesLoading && <p>Laen mänge...</p>}

        {matchesError && <p>{matchesError}</p>}

        <button
          className="secondary-button"
          onClick={() => setShowAllMatches(!showAllMatches)}
        >
          {showAllMatches ? "Näita ainult tänaseid mänge" : "Näita kõiki mänge"}
        </button>

        {visibleMatches.length === 0 && (
          <p>Tänase kuupäeva mänge ei ole.</p>
        )}

        <Matches matches={visibleMatches} />
      </div>
    </div>
  )
}

export default HomePage