import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { Sidebar } from "./Sidebar";
import { ItemsList } from "./ItemsList";
import { Container } from "../../components/Container";
import { Pagination } from "../../components/Pagination";
import { SortItems } from "./SortItems";
import { useFetch } from "../../hooks/useFetch";
import { categoriesData } from "./categoriesData";

export function Shop() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const currCategoryId = category || "abcat0712000";
  const currPage = searchParams?.get("page") || 1;
  const sortBy = searchParams?.get("sort") || "customerReviewCount.dsc";

  const searchTerm = searchParams?.get("search");
  const searchBy = searchTerm ? `&name=${searchTerm}*` : "";

  const [loadingItems, errorItems, itemsData, anticipateFetch] = useFetch(
    `https://api.bestbuy.com/v1/products(categoryPath.id=${currCategoryId}${searchBy})?apiKey=${
      import.meta.env.VITE_API_KEY
    }&sort=${sortBy}&show=categoryPath.id,categoryPath.name,customerReviewAverage,customerReviewCount,image,name,onSale,percentSavings,regularPrice,salePrice,shortDescription,sku&pageSize=18&page=${currPage}&format=json`
  );

  const categories = categoriesData.subCategories;
  const loadingStyles = loadingItems && "opacity-30";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [category, currPage]);

  if (errorItems)
    return (
      <Container className="grow flex justify-center flex-col">
        <h1 className="text-3xl">An error occurred while loading the data!</h1>
        <span className="block text-lg text-slate-500">Please, try again...</span>
      </Container>
    );

  return !itemsData ? (
    <div className="grow">
      <Loader />
    </div>
  ) : (
    <>
      <div className="h-52 md:h-80 bg-store-banner -mt-20 bg-no-repeat bg-cover">
        <div className="bg-black/30 w-full h-full flex items-end">
          <Container className="text-right">
            <h1 className="font-headings text-white text-3xl md:text-6xl font-extrabold tracking-tight leading-none">
              GAMING STORE
            </h1>
          </Container>
        </div>
      </div>

      <div className="relative grow">
        <Container className="flex flex-col md:flex-row relative">
          <Sidebar
            currCategory={category}
            categories={categories}
            onCategoryChange={anticipateFetch}
          />

          <div className={`py-12 md:pl-10 w-full ${loadingStyles}`}>
            <div className="text-sm mb-3 flex justify-between">
              <div>
                {searchBy ? (
                  <div className="font-medium">
                    Showing results for:{" "}
                    <span className="font-bold block text-xl">
                      {searchTerm} ({itemsData.total})
                    </span>
                  </div>
                ) : (
                  <span className="block font-bold">{itemsData.total} items</span>
                )}
              </div>
              <SortItems onChange={anticipateFetch} />
            </div>

            {itemsData.products.length > 0 ? (
              <>
                <ItemsList
                  isLoading={loadingItems}
                  totalItems={itemsData.total}
                  items={itemsData.products}
                />
                <div>
                  {+itemsData.totalPages && (
                    <Pagination
                      currPage={+currPage}
                      totalPages={+itemsData.totalPages}
                      siblings={3}
                      onPageChange={anticipateFetch}
                    />
                  )}
                </div>
              </>
            ) : (
              <p className="font-medium">No items found, please try again.</p>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
