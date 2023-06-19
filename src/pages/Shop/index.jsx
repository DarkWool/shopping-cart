import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { Sidebar } from "./Sidebar";
import { ProductsList } from "./ProductsList";
import { Container } from "../../components/Container";
import { API_KEY } from "../../api.js";
import { useFetch } from "../../hooks/useFetch";

export function Shop() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const currCategoryId = category || "abcat0712000";
  const currPage = searchParams?.get("page") || 1;
  const sortBy = searchParams?.get("sort") || "customerReviewCount.dsc";

  const [, errorCats, categoriesData] = useFetch(
    `https://api.bestbuy.com/v1/categories(id=pcmcat1591132221892)?apiKey=${API_KEY}&format=json`,
    {},
    []
  );
  const [loadingItems, errorItems, itemsData, anticipateFetch] = useFetch(
    `https://api.bestbuy.com/v1/products(categoryPath.id=${currCategoryId})?apiKey=${API_KEY}&sort=${sortBy}&show=categoryPath.id,categoryPath.name,customerReviewAverage,customerReviewCount,image,name,onSale,percentSavings,regularPrice,salePrice,shortDescription,sku&pageSize=18&page=${currPage}&format=json`
  );

  const categories = categoriesData?.categories[0].subCategories;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [category, currPage]);

  if (errorCats || errorItems)
    return (
      <Container className="grow flex justify-center flex-col">
        <h1 className="text-4xl">An error occurred while loading the data!</h1>
        <span className="block text-lg text-slate-500">Please, try again...</span>
      </Container>
    );

  return !categoriesData || !itemsData ? (
    <Loader />
  ) : (
    <>
      <div className="h-80 bg-store-banner -mt-20 bg-no-repeat bg-cover">
        <div className="bg-black/30 w-full h-full flex items-end">
          <Container className="text-right">
            <h1 className="font-headings text-white text-6xl font-extrabold tracking-tight">
              GAMING STORE
            </h1>
          </Container>
        </div>
      </div>

      <div className="relative grow">
        <Container className="flex relative">
          <Sidebar
            currCategory={category}
            categories={categories}
            onCategoryChange={anticipateFetch}
          />
          <ProductsList
            isLoading={loadingItems}
            totalItems={itemsData.total}
            items={itemsData.products}
            currPage={+currPage}
            totalPages={+itemsData.totalPages}
            onPageChange={anticipateFetch}
          />
        </Container>
      </div>
    </>
  );
}
