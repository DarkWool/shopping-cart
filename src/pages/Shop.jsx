import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { fetchData } from "../utils";

export function Shop() {
  const { category } = useParams();
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
    })();
  }, [category]);

  if (products === null) {
    return <Loader />;
  }

  return (
    products && (
      <>
        <div className="container max-w-screen-xl py-20 flex gap-10">
          <div className="w-52 shrink-0 leading-5">
            {/* Sidebar */}
            <h2 className="text-xl font-black pb-5">Categories</h2>
            {category && (
              <Link
                to="/shop"
                className="text-sm font-medium flex items-center gap-x-2 px-3 py-2 border border-red-500 text-red-500 bg-red-50 mb-2"
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
            <ul>
              {categories.map((cat, index) => {
                return (
                  <li className="mb-2 capitalize" key={index}>
                    <Link to={`/shop/category/${cat}`}>{cat}</Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h1 className="text-5xl mb-8 tracking-tight">
              World-class <span className="font-extrabold">composable businesses.</span>
            </h1>
            <div className="grid grid-cols-3 gap-5">
              {products.map((product) => {
                return (
                  <div className="flex flex-col p-5 gap-y-1" key={product.id}>
                    <span className="text-slate-600">{product.category}</span>
                    <p className="font-semibold leading-5">{product.title}</p>
                    <span className="font-medium pt-3">${product.price}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    )
  );
}
