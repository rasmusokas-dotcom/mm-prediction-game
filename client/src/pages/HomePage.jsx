import Leaderboard from "../components/Leaderboard"
import Matches from "../components/Matches"
import useLeaderboard from "../hooks/useLeaderboard"
import useMatches from "../hooks/useMatches"

function HomePage() {
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

        {!matchesLoading && !matchesError && (
          <Matches matches={matches} />
        )}
      </div>
    </div>
  )
}

export default HomePage