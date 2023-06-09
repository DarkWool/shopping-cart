import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { fetchData } from "../../utils";
import { Sidebar } from "./Sidebar";
import { ProductsList } from "./ProductsList";
import { API_KEY } from "../../api.js";

export function Shop() {
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState(null);

  const currCategoryId = category || "abcat0712000";

  useEffect(() => {
    (async () => {
      const pageSize = 18;
      const itemsResponse = await fetchData(
        `https://api.bestbuy.com/v1/products(categoryPath.id=${currCategoryId})?apiKey=${API_KEY}&sort=customerReviewCount.desc&show=categoryPath.id,categoryPath.name,customerReviewAverage,customerReviewCount,image,name,onSale,percentSavings,regularPrice,salePrice,shortDescription,sku&pageSize=${pageSize}&format=json`
      );

      console.log(itemsResponse);

      if (categories === null) {
        const categoriesRes = await fetchData(
          `https://api.bestbuy.com/v1/categories(id=pcmcat1591132221892)?apiKey=${API_KEY}&format=json`
        );
        const categoriesData = categoriesRes.categories[0].subCategories;
        console.log(categoriesData);
        setCategories(categoriesData);
      }
      setIsLoading(false);
      setItems(itemsResponse);
    })();
  }, [currCategoryId]);

  function handleCategoryChange() {
    setIsLoading(true);
  }

  if (categories === null) return <Loader />;

  return (
    <>
      <div className="h-80 bg-store-banner -mt-20 bg-no-repeat bg-cover">
        <div className="bg-black/30 w-full h-full flex items-end">
          <div className="container max-w-screen-xl text-right">
            <h1 className="font-headings text-white text-6xl font-extrabold tracking-tight">
              GAMING STORE
            </h1>
          </div>
        </div>
      </div>

      <div className="relative grow">
        <div className="container max-w-screen-xl flex relative">
          <Sidebar
            currCategory={category}
            categories={categories}
            onCategoryChange={handleCategoryChange}
          />
          <ProductsList
            isLoading={isLoading}
            totalItems={items.total}
            items={items.products}
          />
        </div>
      </div>
    </>
  );
}
