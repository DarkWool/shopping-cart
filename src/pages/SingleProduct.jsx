import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { fetchData } from "../utils";
import { useCart } from "../context/CartContext.jsx";

export function SingleProduct() {
  const cartContext = useCart();
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const products = await fetchData(`https://fakestoreapi.com/products/${id}`);
      setData(products);
    })();
  }, [id]);

  if (data === null) {
    return <Loader />;
  } else {
    return (
      <>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <button
          type="button"
          className="py-3 px-5 bg-red-600"
          onClick={() => cartContext.handleAddItemToCart(data)}
        >
          Add to Cart
        </button>
      </>
    );
  }
}
