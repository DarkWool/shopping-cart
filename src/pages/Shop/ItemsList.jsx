import { Link } from "react-router-dom";
import { StarsRating } from "../../components/StarsRating";

export function ItemsList({ items }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => {
        return (
          <Link
            to={`/product/${item.sku}`}
            className="flex flex-col p-2 md:p-5 gap-y-1"
            key={item.sku}
          >
            <div className="mb-5">
              <img src={item.image} alt="" className="h-48 w-full object-contain" />
            </div>
            <span className="text-slate-600">{item.category}</span>
            <p className="font-medium leading-5 text-sm">{item.name}</p>

            <StarsRating
              itemRating={item.customerReviewAverage}
              reviewCount={item.customerReviewCount}
            />

            <span className="pt-3 font-bold text-slate-800 pb-3 mt-auto">
              {item.onSale ? (
                <>
                  ${item.salePrice}
                  <div className="text-sm bg-red-600 text-white py-1 px-3 inline-block ml-4">
                    Sale
                  </div>
                </>
              ) : (
                <>${item.regularPrice}</>
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
