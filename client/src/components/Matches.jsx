import { getTeamName } from "../utils/teamNames";

function getStatusLabel(status) {
  if (status === "LIVE") return "LIVE";
  if (status === "IN_PLAY") return "LIVE";
  if (status === "PAUSED") return "PAUS";
  if (status === "FINISHED") return "LÕPPENUD";

  return "TULEKUL";
}

function getStageLabel(stage) {
  switch (stage) {
    case "LAST_32":
      return "1/16 finaal";

    case "LAST_16":
      return "1/8 finaal";

    case "QUARTER_FINALS":
      return "Veerandfinaal";

    case "SEMI_FINALS":
      return "Poolfinaal";

    case "THIRD_PLACE":
      return "3. koha mäng";

    case "FINAL":
      return "Finaal";

    default:
      return null;
  }
}

function sortMatches(matches) {
  const statusOrder = {
    LIVE: 0,
    IN_PLAY: 0,
    PAUSED: 0,
    SCHEDULED: 1,
    TIMED: 1,
    FINISHED: 2,
  };

  return [...matches].sort((a, b) => {
    const aOrder = statusOrder[a.status] ?? 99;
    const bOrder = statusOrder[b.status] ?? 99;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    const aDate = new Date(a.utcDate).getTime();
    const bDate = new Date(b.utcDate).getTime();

    if (aOrder === 2) {
      return bDate - aDate;
    }

    return aDate - bDate;
  });
}

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("et-EE", {
    timeZone: "Europe/Tallinn",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function Matches({ matches }) {
  const sortedMatches = sortMatches(matches);

  return (
    <div>
      {sortedMatches.map((match) => (
        <div key={match.id} className="card match-card">
          <div className="match-header">
            <div>
              {getTeamName(match.homeTeam)}
              {" vs "}
              {getTeamName(match.awayTeam)}
            </div>

            <div className="match-status">{getStatusLabel(match.status)}</div>
          </div>

          <div className="match-date">{formatDate(match.utcDate)}</div>
          {getStageLabel(match.stage) && (
            <div className="match-stage">{getStageLabel(match.stage)}</div>
          )}

          <div className="match-score">
            {match.homeScore ?? "-"} : {match.awayScore ?? "-"}
          </div>
          {match.predictionSummary && (
            <div className="prediction-summary">
              <strong>Edasi ennustatud</strong>

              {match.predictionSummary.homeSupporters.length > 0 && (
                <div>
                  {getTeamName(match.homeTeam)} →{" "}
                  {match.predictionSummary.homeSupporters.join(", ")}
                </div>
              )}

              {match.predictionSummary.awaySupporters.length > 0 && (
                <div>
                  {getTeamName(match.awayTeam)} →{" "}
                  {match.predictionSummary.awaySupporters.join(", ")}
                </div>
              )}

              {match.predictionSummary.bothSupporters.length > 0 && (
                <div>
                  Mõlemad → {match.predictionSummary.bothSupporters.join(", ")}
                </div>
              )}
            </div>
          )}
          {match.scorePredictions?.length > 0 && (
            <div className="match-predictions">
              {match.scorePredictions.map((prediction) => (
                <div
                  key={prediction.userName}
                  className="match-prediction-pill"
                >
                  <span>{prediction.userName}</span>
                  <strong>
                    {prediction.homePrediction}:{prediction.awayPrediction}
                  </strong>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Matches;
