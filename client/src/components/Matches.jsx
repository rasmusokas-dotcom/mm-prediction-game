import { getTeamName } from "../utils/teamNames"

function getStatusLabel(status) {
  if (status === "LIVE") return "LIVE"
  if (status === "IN_PLAY") return "LIVE"
  if (status === "PAUSED") return "PAUS"
  if (status === "FINISHED") return "LÕPPENUD"

  return "TULEKUL"
}

function sortMatches(matches) {
  const statusOrder = {
    LIVE: 0,
    IN_PLAY: 0,
    PAUSED: 0,
    FINISHED: 1,
    SCHEDULED: 2
  }

  return [...matches].sort((a, b) => {
    const aOrder = statusOrder[a.status] ?? 99
    const bOrder = statusOrder[b.status] ?? 99

    return aOrder - bOrder
  })
}

function formatDate(date) {
  if (!date) return ""

  return new Date(date).toLocaleString("et-EE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

function Matches({ matches }) {
  const sortedMatches = sortMatches(matches)

  return (
    <div>
      {sortedMatches.map(match => (
        <div
          key={match.id}
          className="card match-card"
        >
          <div className="match-header">
            <div>
              {getTeamName(match.homeTeam)}
              {" vs "}
              {getTeamName(match.awayTeam)}
            </div>

            <div className="match-status">
              {getStatusLabel(match.status)}
            </div>
          </div>

          <div className="match-date">
            {formatDate(match.utcDate)}
          </div>

          <div className="match-score">
            {match.homeScore ?? "-"} :{" "}
            {match.awayScore ?? "-"}
          </div>

          {match.predictions?.length > 0 && (
            <div className="match-predictions">
              {match.predictions.map(prediction => (
                <div
                  key={prediction.userName}
                  className="match-prediction-pill"
                >
                  <span>{prediction.userName}</span>
                  <strong>
                    {prediction.homePrediction}:
                    {prediction.awayPrediction}
                  </strong>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Matches