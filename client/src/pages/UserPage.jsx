import useUser from "../hooks/useUser"
import { useParams } from "react-router-dom"
import { getTeamName } from "../utils/teamNames"
function getPointsClass(points) {
    if (points === 3) return "points-exact"
    if (points === 1) return "points-correct"
    return "points-wrong"
}
function PredictionList({ teams }) {
    return (
        <div className="prediction-list">
            {teams.filter(Boolean).map(team => (
                <div key={team} className="prediction-item">
                    <span>{getTeamName(team)}</span>
                    <strong>0p</strong>
                </div>
            ))}
        </div>
    )
}
function UserPage() {
    const { name } = useParams()
    const {
        user,
        loading,
        error
    } = useUser(name)
    if (loading) {
        return <p>Laen kasutajat...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    if (!user) {
        return <p>Kasutajat ei leitud</p>
    }

    return (
        <div className="container">
            <h1>{user.name}</h1>

            <h2>Kokku: {user.points}p</h2>

            <p>Mängud: {user.matchPoints}p</p>

            <p>Playoff: {user.bracketPoints}p</p>

            <div className="section">
                <h2>Mängud</h2>

                <div className="matches-table">
                    <div className="matches-table-header">
                        <div>Mäng</div>
                        <div>Ennustus</div>
                        <div>Tulemus</div>
                        <div>Punktid</div>
                    </div>

                    {user.matches.map(match => (
                        <div
                            key={match.matchId}
                            className="matches-table-row"
                        >
                            <div>
                                {getTeamName(match.homeTeam)}
                                {" vs "}
                                {getTeamName(match.awayTeam)}                            </div>

                            <div>
                                {match.homePrediction}:{match.awayPrediction}
                            </div>

                            <div>
                                {match.actualHomeScore ?? "-"}:
                                {match.actualAwayScore ?? "-"}
                            </div>

                            <div className={getPointsClass(match.points)}>
                                {match.points}p
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="section">
                <h2>Playoff ennustused</h2>

                <div className="card">
                    <h3>32 parimat</h3>
                    <PredictionList teams={user.bracketPredictions.roundOf32} />

                    <h3>16 parimat</h3>
                    <PredictionList teams={user.bracketPredictions.roundOf16} />

                    <h3>8 parimat</h3>
                    <PredictionList teams={user.bracketPredictions.quarterFinals} />

                    <h3>4 parimat</h3>
                    <PredictionList teams={user.bracketPredictions.semiFinals} />

                    <h3>Finalistid</h3>
                    <PredictionList teams={user.bracketPredictions.finalists} />

                    <h3>3. koha võitja</h3>
                    <PredictionList teams={[user.bracketPredictions.thirdPlace]} />

                    <h3>Maailmameister</h3>
                    <PredictionList teams={[user.bracketPredictions.winner]} />
                </div>
            </div>
        </div>
    )
}

export default UserPage