import { useSearchParams, useLocation, Link } from "react-router-dom";
import { createPagination, getUrlParams } from "../helpers.js";

function Pagination({ currPage, totalPages, siblings, onPageChange }) {
  const location = useLocation();
  const [params] = useSearchParams();
  const pages = createPagination(currPage, totalPages, siblings);
  const extraParams = getUrlParams(params);

  return (
    <nav className="mt-20 flex md:justify-center gap-8 items-center font-semibold overflow-x-scroll">
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
            className="text-slate-400 border border-slate-400 rounded-full w-10 h-10 flex justify-center items-center shrink-0"
          >
            {page}
          </span>
        );
      })}
    </nav>
  );
}

export { Pagination };
