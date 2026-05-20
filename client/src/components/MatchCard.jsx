function MatchCard({ match }) {
  return (
    <div className="match-card">
      <div>
        {match.homeTeam} vs {match.awayTeam}
      </div>

      <div>
        {match.homeScore} : {match.awayScore}
      </div>

      <div>{match.status}</div>
    </div>
  )
}

export default MatchCard
