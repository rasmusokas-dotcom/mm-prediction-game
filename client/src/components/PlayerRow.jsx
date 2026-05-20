function PlayerRow({ player, position }) {
  return (
    <div className="player-row">
      <span>
        {position}. {player.name}
      </span>

      <span>{player.points}p</span>
    </div>
  )
}

export default PlayerRow