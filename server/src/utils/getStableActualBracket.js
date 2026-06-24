import buildActualBracket from "./buildActualBracket.js";

let cachedActualBracket = null;

function mergeArrays(previous = [], fresh = []) {
  return Array.from(new Set([...previous, ...fresh])).filter(Boolean);
}

function mergeBracket(previous, fresh) {
  return {
    roundOf32: mergeArrays(previous.roundOf32, fresh.roundOf32),
    roundOf16: mergeArrays(previous.roundOf16, fresh.roundOf16),
    quarterFinals: mergeArrays(previous.quarterFinals, fresh.quarterFinals),
    semiFinals: mergeArrays(previous.semiFinals, fresh.semiFinals),
    finalists: mergeArrays(previous.finalists, fresh.finalists),
    thirdPlace: fresh.thirdPlace || previous.thirdPlace,
    winner: fresh.winner || previous.winner,
  };
}

function getStableActualBracket(matches) {
  const freshBracket = buildActualBracket(matches);

  if (!cachedActualBracket) {
    cachedActualBracket = freshBracket;
    return cachedActualBracket;
  }

  cachedActualBracket = mergeBracket(cachedActualBracket, freshBracket);

  return cachedActualBracket;
}

export default getStableActualBracket;
