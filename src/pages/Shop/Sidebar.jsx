import { useSearchParams, Link } from "react-router-dom";

export function Sidebar({ currCategory, categories, onCategoryChange }) {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.has("sort") ? `?sort=${searchParams.get("sort")}` : "";

  const categoriesList = categories.map((c) => {
    let styles = "px-2 block rounded transition duration-200";
    styles +=
      currCategory === c.id
        ? " font-semibold bg-gray-800 text-white py-2"
        : " font-medium py-1 text-gray-500 hover:bg-gray-200 hover:text-gray-800";

    return (
      <li key={c.id} className="mb-1">
        {currCategory === c.id ? (
          <span className={styles}>{c.name}</span>
        ) : (
          <Link
            to={`/shop/category/${c.id}${sortBy}`}
            className={styles}
            onClick={onCategoryChange}
          >
            {c.name}
          </Link>
        )}
      </li>
    );
  });

  return (
    <div className="w-56 shrink-0 leading-5 pt-8 md:py-12 md:pr-5 mx-auto md:border-r border-gray-200">
      <div className="sticky top-20">
        <h2 className="text-xl font-bold pb-5">Categories</h2>
        {currCategory && (
          <Link
            to={`/shop${sortBy}`}
            className="text-sm font-medium flex items-center gap-x-2 px-3 py-2 border border-red-500 text-red-500 bg-red-50 mb-4"
            onClick={onCategoryChange}
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear Category
          </Link>
        )}
        <ul>{categoriesList}</ul>
      </div>
    </div>
  );
}
