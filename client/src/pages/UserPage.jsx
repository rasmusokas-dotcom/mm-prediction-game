import useUser from "../hooks/useUser"
import { useParams } from "react-router-dom"
import { getTeamName } from "../utils/teamNames"
import { useState } from "react"
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

function groupMatchesByGroup(matches) {
    return matches.reduce((groups, match) => {
        const groupName = match.group || "Muu"

        if (!groups[groupName]) {
            groups[groupName] = []
        }

        groups[groupName].push(match)

        return groups
    }, {})
}

function UserPage() {
    const [showAllMatches, setShowAllMatches] = useState(false)
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
    const visibleMatches = showAllMatches
        ? user.matches
        : user.matches.filter(match => isToday(match.utcDate))
    return (
        <div className="container">
            <h1>{user.name}</h1>

            <h2>Kokku: {user.points}p</h2>

            <p>Mängud: {user.matchPoints}p</p>

            <p>Playoff: {user.bracketPoints}p</p>

            <div className="section">
                <h2>Mängud</h2>
                <button
                    className="secondary-button"
                    onClick={() => setShowAllMatches(!showAllMatches)}
                >
                    {showAllMatches ? "Näita ainult tänaseid mänge" : "Näita kõiki mänge"}
                </button>
                <div className="matches-table">
                    <div className="matches-table-header">
                        <div>Mäng</div>
                        <div>Ennustus</div>
                        <div>Tulemus</div>
                        <div>Punktid</div>
                    </div>
                    {visibleMatches.length === 0 && (
                        <p>Tänase kuupäeva mänge ei ole.</p>
                    )}
                    {visibleMatches.map(match => (<div
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

                <div className="playoff-grid">
                    <div className="card">
                        <h3>32 parimat</h3>
                        <PredictionList teams={user.bracketPredictions.roundOf32} />
                    </div>

                    <div className="card">
                        <h3>16 parimat</h3>
                        <PredictionList teams={user.bracketPredictions.roundOf16} />
                    </div>

                    <div className="card">
                        <h3>8 parimat</h3>
                        <PredictionList teams={user.bracketPredictions.quarterFinals} />
                    </div>

                    <div className="card">
                        <h3>4 parimat</h3>
                        <PredictionList teams={user.bracketPredictions.semiFinals} />
                    </div>

                    <div className="card">
                        <h3>Finalistid</h3>
                        <PredictionList teams={user.bracketPredictions.finalists} />
                    </div>

                    <div className="card">
                        <h3>3. koha võitja</h3>
                        <PredictionList teams={[user.bracketPredictions.thirdPlace]} />

                        <h3>Maailmameister</h3>
                        <PredictionList teams={[user.bracketPredictions.winner]} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage