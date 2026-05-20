import fs from "fs"
import path from "path"
import xlsx from "xlsx"
import normalizeTeam from "./normalizeTeam.js"

function getCell(row, index) {
  return row[index] ?? null
}

function readPredictionFiles() {
  const folderPath = path.join(process.cwd(), "uploads", "predictions")

  if (!fs.existsSync(folderPath)) {
    return []
  }

  const files = fs
    .readdirSync(folderPath)
    .filter(file => file.endsWith(".xlsx"))

  if (files.length === 0) {
    return []
  }

  return files.map(file => {
    const filePath = path.join(folderPath, file)
    const workbook = xlsx.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]

    const rows = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
      defval: null
    })

    const userName = rows[1]?.[18] || file.replace(".xlsx", "")

    const matchPredictions = rows
      .slice(1)
      .filter(row => row[0])
      .map(row => ({
        userName,
        matchId: Number(row[0]),
        homeTeam: normalizeTeam(getCell(row, 1)),
        homePrediction: Number(getCell(row, 2)),
        awayPrediction: Number(getCell(row, 3)),
        awayTeam: normalizeTeam(getCell(row, 4))
      }))
      .filter(prediction =>
        prediction.matchId &&
        !Number.isNaN(prediction.homePrediction) &&
        !Number.isNaN(prediction.awayPrediction)
      )

    const bracketPredictions = {
      roundOf32: rows
        .slice(1)
        .map(row => normalizeTeam(row[6]))
        .filter(Boolean),

      roundOf16: rows
        .slice(1)
        .map(row => normalizeTeam(row[8]))
        .filter(Boolean),

      quarterFinals: rows
        .slice(1)
        .map(row => normalizeTeam(row[10]))
        .filter(Boolean),

      semiFinals: rows
        .slice(1)
        .map(row => normalizeTeam(row[12]))
        .filter(Boolean),

      thirdPlace: normalizeTeam(rows[1]?.[13]),

      finalists: rows
        .slice(1)
        .map(row => normalizeTeam(row[14]))
        .filter(Boolean),

      winner: normalizeTeam(rows[1]?.[16])
    }

    return {
      userName,
      matchPredictions,
      bracketPredictions
    }
  })
}

export default readPredictionFiles