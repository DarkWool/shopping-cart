import { useId } from "react";
import { useSearchParams } from "react-router-dom";

export function SortItems({ onChange }) {
  const selectId = useId();
  const [searchParams, setSearchParams] = useSearchParams();
  const inputValue = searchParams.get("sort") || "";

  return (
    <div>
      <span className="inline-block mr-2">Sort by</span>
      <select
        name={selectId}
        id={selectId}
        className="text-base py-1 px-2 rounded border border-slate-300 bg-slate-50 cursor-pointer transition-colors ease-in-out hover:border-slate-400"
        value={inputValue}
        onChange={(e) => {
          searchParams.delete("page");

          if (e.target.value !== "") {
            searchParams.set("sort", e.target.value);
          } else {
            searchParams.delete("sort");
          }
          setSearchParams(searchParams);

          onChange();
        }}
      >
        <option value="">Popularity</option>
        <option value="regularPrice.asc">Price Low to High</option>
        <option value="regularPrice.dsc">Price High to Low</option>
        <option value="name.asc">A - Z</option>
        <option value="name.dsc">Z - A</option>
      </select>
    </div>
  );
}
