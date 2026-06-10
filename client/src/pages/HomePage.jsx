import Leaderboard from "../components/Leaderboard";
import Matches from "../components/Matches";
import useLeaderboard from "../hooks/useLeaderboard";
import useMatches from "../hooks/useMatches";
import useDailyTopPredictor from "../hooks/useDailyTopPredictor";
function HomePage() {
  const { leaderboard, loading, error } = useLeaderboard();
  const {
    dailyTopPredictor,
    loading: dailyLoading,
    error: dailyError,
  } = useDailyTopPredictor();
  const {
    matches,
    loading: matchesLoading,
    error: matchesError,
  } = useMatches();

  return (
    <div className="container">
      <h1>Luupinite ennustus 2026</h1>

      <div className="section">
        <h2>Edetabel</h2>

        {loading && <p>Laen edetabelit...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && <Leaderboard leaderboard={leaderboard} />}
      </div>
      <div className="section">
        <h2>🏆 Päeva ennustaja</h2>

        {dailyLoading && <p>Laen päeva ennustajat...</p>}

        {dailyError && <p>{dailyError}</p>}

        {!dailyLoading && !dailyError && (
          <div className="card">
            {dailyTopPredictor?.points > 0 ? (
              <>
                <p>
                  Tänase päeva parim tulemus:
                  <strong> {dailyTopPredictor.points}p</strong>
                </p>

                <p>
                  {dailyTopPredictor.winners
                    .map((winner) => winner.name)
                    .join(", ")}
                </p>
              </>
            ) : (
              <p>Tänase päeva mängud pole veel lõppenud.</p>
            )}
          </div>
        )}
      </div>
      <div className="section">
        <h2>Mängud</h2>

        {matchesLoading && <p>Laen mänge...</p>}

        {matchesError && <p>{matchesError}</p>}

        {!matchesLoading && !matchesError && <Matches matches={matches} />}
      </div>
    </div>
  );
}

export default HomePage;
