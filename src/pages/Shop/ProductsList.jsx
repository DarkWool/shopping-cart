import { Link } from "react-router-dom";
import { StarsRating } from "../../components/StarsRating";
import { Pagination } from "../../components/Pagination";

export function ProductsList({
  totalItems,
  items,
  isLoading,
  currPage,
  totalPages,
  onPageChange,
}) {
  const loadingStyles = isLoading && "opacity-30";

  return (
    <div className={`py-12 pl-10 ${loadingStyles}`}>
      <div className="text-sm font-semibold mb-3">{totalItems} items</div>
      <div className="grid grid-cols-3 gap-5">
        {items.map((item) => {
          return (
            <Link
              to={`/product/${item.sku}`}
              className="flex flex-col p-5 gap-y-1"
              key={item.sku}
            >
              <div className="mb-5">
                <img src={item.image} alt="" className="h-48 w-full object-contain" />
              </div>
              <span className="text-slate-600">{item.category}</span>
              <p className="font-medium leading-4 text-sm">{item.name}</p>
              <StarsRating
                itemRating={item.customerReviewAverage}
                reviewCount={item.customerReviewCount}
              />
              <span className="pt-3 font-bold text-slate-800 pb-3">
                ${item.regularPrice}
              </span>
            </Link>
          );
        })}
      </div>

      <div>
        <Pagination
          currPage={currPage}
          totalPages={totalPages}
          siblings={3}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
