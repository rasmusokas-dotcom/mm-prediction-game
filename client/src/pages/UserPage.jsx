import useUser from "../hooks/useUser";
import { useParams } from "react-router-dom";
import { getTeamName } from "../utils/teamNames";
import { useState } from "react";
function getPointsClass(points) {
  if (points === 3) return "points-exact";
  if (points === 1) return "points-correct";
  return "points-wrong";
}
function PredictionList({ items = [] }) {
  return (
    <div className="prediction-list">
      {items
        .filter((item) => item && item.team)
        .map((item) => (
          <div key={item.team} className="prediction-item">
            <span>{getTeamName(item.team)}</span>

            <strong>{item.points}p</strong>
          </div>
        ))}
    </div>
  );
}
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

function isPast(date) {
  if (!date) return false;

  const today = new Date();
  const matchDate = new Date(date);

  today.setHours(0, 0, 0, 0);
  matchDate.setHours(0, 0, 0, 0);

  return matchDate < today;
}

function isFuture(date) {
  if (!date) return false;

  const today = new Date();
  const matchDate = new Date(date);

  today.setHours(0, 0, 0, 0);
  matchDate.setHours(0, 0, 0, 0);

  return matchDate > today;
}

function groupMatchesByGroup(matches) {
  return matches.reduce((groups, match) => {
    const groupName = match.group || "Muu";

    if (!groups[groupName]) {
      groups[groupName] = [];
    }

    groups[groupName].push(match);

    return groups;
  }, {});
}

function UserPage() {
  const [showPastMatches, setShowPastMatches] = useState(false);
  const [showFutureMatches, setShowFutureMatches] = useState(false);
  const { name } = useParams();
  const { user, loading, error } = useUser(name);
  if (loading) {
    return <p>Laen kasutajat...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Kasutajat ei leitud</p>;
  }
  const todayMatches = user.matches.filter((match) => isToday(match.utcDate));

  const pastMatches = user.matches.filter((match) => isPast(match.utcDate));

  const futureMatches = user.matches.filter((match) => isFuture(match.utcDate));
  return (
    <div className="container">
      <h1>{user.name}</h1>

      <h2>Kokku: {user.points}p</h2>

      <p>Mängud: {user.matchPoints}p</p>

      <p>Playoff: {user.bracketPoints}p</p>

      <div className="section">
        <h2>Mängud</h2>
        <div className="matches-sections">
          <h3>Tänased mängud</h3>

          {todayMatches.length === 0 && <p>Tänase kuupäeva mänge ei ole.</p>}

          <MatchesTable matches={todayMatches} />

          <MatchSection
            title="Varasemad mängud"
            count={pastMatches.length}
            open={showPastMatches}
            onToggle={() => setShowPastMatches(!showPastMatches)}
          >
            <MatchesTable matches={pastMatches} />
          </MatchSection>

          <MatchSection
            title="Tulevased mängud"
            count={futureMatches.length}
            open={showFutureMatches}
            onToggle={() => setShowFutureMatches(!showFutureMatches)}
          >
            <MatchesTable matches={futureMatches} />
          </MatchSection>
        </div>
      </div>
      <div className="section">
        <h2>Playoff ennustused</h2>

        <div className="playoff-grid">
          <div className="card">
            <h3>32 parimat</h3>
            <PredictionList items={user.bracketDetails.roundOf32} />
          </div>

          <div className="card">
            <h3>16 parimat</h3>
            <PredictionList items={user.bracketDetails.roundOf16} />
          </div>

          <div className="card">
            <h3>8 parimat</h3>
            <PredictionList items={user.bracketDetails.quarterFinals} />
          </div>

          <div className="card">
            <h3>4 parimat</h3>
            <PredictionList items={user.bracketDetails.semiFinals} />
          </div>

          <div className="card">
            <h3>Finalistid</h3>
            <PredictionList items={user.bracketDetails.finalists} />
          </div>

          <div className="card">
            <h3>3. koha võitja</h3>
            <PredictionList items={[user.bracketDetails.thirdPlace]} />

            <h3>Maailmameister</h3>
            <PredictionList items={[user.bracketDetails.winner]} />
          </div>
        </div>
      </div>
    </div>
  );
}
function MatchSection({ title, count, open, onToggle, children }) {
  return (
    <div className="match-section">
      <button className="match-section-toggle" onClick={onToggle}>
        <span>
          {open ? "▼" : "▶"} {title}
        </span>

        <span>{count}</span>
      </button>

      {open && <div className="match-section-content">{children}</div>}
    </div>
  );
}

function MatchesTable({ matches }) {
  return (
    <div className="matches-table">
      <div className="matches-table-header">
        <div>Mäng</div>
        <div>Ennustus</div>
        <div>Tulemus</div>
        <div>Punktid</div>
      </div>

      {matches.map((match) => (
        <div key={match.matchId} className="matches-table-row">
          <div>
            {getTeamName(match.homeTeam)}
            {" vs "}
            {getTeamName(match.awayTeam)}
          </div>

          <div>
            {match.homePrediction}:{match.awayPrediction}
          </div>

          <div>
            {match.actualHomeScore ?? "-"}:{match.actualAwayScore ?? "-"}
          </div>

          <div className={getPointsClass(match.points)}>{match.points}p</div>
        </div>
      ))}
    </div>
  );
}

export default UserPage;
