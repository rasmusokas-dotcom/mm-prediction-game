import Papa from "papaparse"

const GOOGLE_SHEET_CSV_URL = "SIIA_PANE_OMA_CSV_LINK"

export async function getPredictionsFromSheet() {
  const response = await fetch(GOOGLE_SHEET_CSV_URL)
  const csvText = await response.text()

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  })

  return parsed.data
}