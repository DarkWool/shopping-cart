import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { fetchData } from "../../utils";
import { Sidebar } from "./Sidebar";
import { ProductsList } from "./ProductsList";

export function Shop() {
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    (async () => {
      const productsQuery = category ? `products/category/${category}` : "products";
      const products = await fetchData(`https://fakestoreapi.com/${productsQuery}`);

      if (categories === null) {
        const categoriesData = await fetchData(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(categoriesData);
      }
      setProducts(products);
      setIsLoading(false);
    })();
  }, [category]);

  function handleCategoryChange() {
    setIsLoading(true);
  }

  if (products === null) return <Loader />;

  return (
    products && (
      <div className="container max-w-screen-xl py-20 flex gap-10">
        <Sidebar
          currCategory={category}
          categories={categories}
          onCategoryChange={handleCategoryChange}
        />

        <div>
          <h1 className="text-5xl mb-8 tracking-tight">
            World-class <span className="font-extrabold">composable businesses.</span>
          </h1>
          <ProductsList isLoading={isLoading} products={products} />
        </div>
      </div>
    )
  );
}
