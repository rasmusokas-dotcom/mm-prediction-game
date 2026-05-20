import teamNameMap from "./teamNameMap.js"

function normalizeText(value) {
    return String(value)
        .trim()
        .toLowerCase()
        .replaceAll("ä", "a")
        .replaceAll("ö", "o")
        .replaceAll("ü", "u")
        .replaceAll("õ", "o")
        .replaceAll(" ", "")
}

function normalizeTeam(value) {
    if (!value) return null

    const normalized = normalizeText(value)

    return teamNameMap[normalized] || String(value).trim().toUpperCase()
}

export default normalizeTeam