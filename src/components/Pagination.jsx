import { useSearchParams, useLocation, Link } from "react-router-dom";
import { isNumber } from "../utils.js";

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

function getUrlParams(params) {
  const newParams = new URLSearchParams();

  params.has("search") ? newParams.append("search", params.get("search")) : null;
  params.has("sort") ? newParams.append("sort", params.get("sort")) : null;

  return newParams.size > 0 ? `&${newParams}` : "";
}

function Pagination({ currPage, totalPages, siblings, onPageChange }) {
  const location = useLocation();
  const [params] = useSearchParams();
  const pages = createPagination(currPage, totalPages, siblings);
  const extraParams = getUrlParams(params);

  return (
    <nav className="mt-20 flex items-center gap-8 justify-center font-semibold">
      {pages.map((page, i) => {
        if (page === "...") return <span key={i}>···</span>;

        const path = `${location.pathname}?page=${page}${extraParams}`;

        return currPage !== page ? (
          <Link
            key={i}
            to={path}
            className="p-2 transition-colors ease-in-out hover:text-slate-400"
            onClick={onPageChange}
          >
            {page}
          </Link>
        ) : (
          <span
            key={i}
            className="text-slate-400 border border-slate-400 rounded-full w-10 h-10 flex justify-center items-center"
          >
            {page}
          </span>
        );
      })}
    </nav>
  );
}

export { createPagination, Pagination };
