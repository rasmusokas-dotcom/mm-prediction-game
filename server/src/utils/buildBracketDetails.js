function buildTeamDetails(predictedTeams, actualTeams, pointsPerTeam) {
    return predictedTeams.map(team => {
        const correct = actualTeams.includes(team)

        return {
            team,
            correct,
            points: correct ? pointsPerTeam : 0
        }
    })
}

function buildSingleTeamDetail(predictedTeam, actualTeam, points) {
    if (!predictedTeam) {
        return null
    }

    const correct = predictedTeam === actualTeam

    return {
        team: predictedTeam,
        correct,
        points: correct ? points : 0
    }
}

function buildBracketDetails(prediction, actualBracket) {
    return {
        roundOf32: buildTeamDetails(
            prediction.roundOf32,
            actualBracket.roundOf32,
            1
        ),

        roundOf16: buildTeamDetails(
            prediction.roundOf16,
            actualBracket.roundOf16,
            2
        ),

        quarterFinals: buildTeamDetails(
            prediction.quarterFinals,
            actualBracket.quarterFinals,
            3
        ),

        semiFinals: buildTeamDetails(
            prediction.semiFinals,
            actualBracket.semiFinals,
            4
        ),

        finalists: buildTeamDetails(
            prediction.finalists,
            actualBracket.finalists,
            5
        ),

        thirdPlace: buildSingleTeamDetail(
            prediction.thirdPlace,
            actualBracket.thirdPlace,
            5
        ),

        winner: buildSingleTeamDetail(
            prediction.winner,
            actualBracket.winner,
            10
        )
    }
}

export default buildBracketDetails