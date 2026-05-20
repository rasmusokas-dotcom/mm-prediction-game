const teamNames = {
    ALG: "Alžeeria",
    ARG: "Argentina",
    AUS: "Austraalia",
    AUT: "Austria",
    BEL: "Belgia",
    BIH: "Bosnia ja Hertsegoviina",
    BRA: "Brasiilia",
    CAN: "Kanada",
    CIV: "Elevandiluurannik",
    COD: "Kongo DV",
    COL: "Colombia",
    CPV: "Cabo Verde",
    CRO: "Horvaatia",
    CUW: "Curaçao",
    CZE: "Tšehhi",
    ECU: "Ecuador",
    EGY: "Egiptus",
    ENG: "Inglismaa",
    ESP: "Hispaania",
    FRA: "Prantsusmaa",
    GER: "Saksamaa",
    GHA: "Ghana",
    HAI: "Haiti",
    IRN: "Iraan",
    IRQ: "Iraak",
    JOR: "Jordaania",
    JPN: "Jaapan",
    KOR: "Lõuna-Korea",
    KSA: "Saudi Araabia",
    MAR: "Maroko",
    MEX: "Mehhiko",
    NED: "Holland",
    NOR: "Norra",
    NZL: "Uus-Meremaa",
    PAN: "Panama",
    PAR: "Paraguay",
    POR: "Portugal",
    QAT: "Katar",
    RSA: "Lõuna-Aafrika Vabariik",
    SCO: "Šotimaa",
    SEN: "Senegal",
    SUI: "Šveits",
    SWE: "Rootsi",
    TUN: "Tuneesia",
    TUR: "Türgi",
    URY: "Uruguay",
    USA: "USA",
    UZB: "Usbekistan"
}

function toTitleCase(value) {
    return String(value)
        .trim()
        .toLowerCase()
        .split(" ")
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ")
}

export function getTeamName(code) {
    if (!code) return ""

    const value = String(code).trim()
    const normalizedCode = value.toUpperCase()

    if (teamNames[normalizedCode]) {
        return teamNames[normalizedCode]
    }

    return toTitleCase(value)
}