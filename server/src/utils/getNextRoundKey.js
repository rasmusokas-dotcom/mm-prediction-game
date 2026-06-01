function getNextRoundKey(stage) {
  switch (stage) {
    case "LAST_32":
      return "roundOf16"
    case "LAST_16":
      return "quarterFinals"
    case "QUARTER_FINALS":
      return "semiFinals"
    case "SEMI_FINALS":
      return "finalists"
    case "FINAL":
      return "winner"
    default:
      return null
  }
}

export default getNextRoundKey