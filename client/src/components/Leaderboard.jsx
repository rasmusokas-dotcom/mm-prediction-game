import { Link } from "react-router-dom"
function Leaderboard({
  leaderboard,
  onSelectUser
}) {
  return (
    <div>
      <div className="card leaderboard-header">
        <div>Koht</div>
        <div>Nimi</div>
        <div>Mängud</div>
        <div>Playoff</div>
        <div>Kokku</div>
      </div>

      {leaderboard.map((player, index) => (
        <div
          key={player.name}
          className={`card leaderboard-row ${index < 3 ? `top-${index + 1}` : ""
            }`}        >
          <div>{index + 1}.</div>

          <div>
            <Link
              className="user-link"
              to={`/users/${player.name}`}
            >
              {player.name}
            </Link>
          </div>

          <div>{player.matchPoints}p</div>

          <div>
            {player.bracketPoints}p
          </div>

          <div>{player.points}p</div>
        </div>
      ))}
    </div>
  )
}

export default Leaderboard