import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";

async function getAllProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
}

export function Shop() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const products = await getAllProducts();
      setData(products);
    })();
  }, []);

  if (data === null) {
    return <Loader />;
  } else {
    return (
      data && (
        <>
          <div className="container max-w-screen-xl py-20">
            <h1 className="text-5xl mb-8 tracking-tight">
              World-class <span className="font-extrabold">composable businesses.</span>
            </h1>
            <div className="grid grid-cols-3 gap-5">
              {data.map((product) => {
                console.table(product);

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
        </>
      )
    );
  }
}
