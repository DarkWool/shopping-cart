import { isNumber } from "./utils.js";

const createRange = (startingNum, length) =>
  Array.from({ length }, (_, i) => startingNum + i);

function createPagination(currPage, totalPages, siblings = 3) {
  if (![currPage, totalPages, siblings].every((n) => isNumber(n) && n > 0))
    throw new Error("All parameters must be numbers and greater than zero");

  const DOTS = "...";

  // Only for the starting pages
  if (currPage - siblings <= 2) {
    return currPage + siblings + 1 >= totalPages
      ? createRange(1, totalPages)
      : [...createRange(1, currPage + siblings), DOTS, totalPages];
  }

  const startingPage = currPage - siblings;
  if (currPage >= totalPages - (siblings + 1)) {
    // ending
    const len = totalPages - startingPage + 1;
    return [1, DOTS, ...createRange(startingPage, len)];
  } else {
    // middle
    const len = siblings * 2 + 1;
    return [1, DOTS, ...createRange(startingPage, len), DOTS, totalPages];
  }
}

function getUrlParams(currParams) {
  const newParams = new URLSearchParams();

  currParams.has("search") ? newParams.append("search", currParams.get("search")) : null;
  currParams.has("sort") ? newParams.append("sort", currParams.get("sort")) : null;

  return newParams.size > 0 ? `&${newParams}` : "";
}

export { createPagination, getUrlParams };
