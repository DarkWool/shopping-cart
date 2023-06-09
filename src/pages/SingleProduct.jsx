import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { fetchData } from "../utils";
import { useCart } from "../context/CartContext.jsx";
import { API_KEY } from "../api";

export function SingleProduct() {
  const cartContext = useCart();
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetchData(
        `https://api.bestbuy.com/v1/products(sku=${id})?apiKey=${API_KEY}&format=json`
      );
      setData(response.products[0]);
      console.log(response.products[0]);
    })();
  }, [id]);

  if (data === null) {
    return <Loader />;
  } else {
    return (
      <div className="container max-w-screen-xl flex gap-x-32 my-20">
        <div className="max-w-lg w-full">
          <img src={data.image} alt="" />
        </div>

        <div className="max-w-prose">
          <div className="text-sm text-slate-600 mb-3">
            Inicio / Tienda / {data.category}
          </div>

          <h1 className="font-bold text-3xl mb-6 leading-none">{data.name}</h1>
          <div className="mb-6 leading-none">
            <span className="mr-1 font-medium">$</span>
            <span className="font-medium leading-none text-3xl">{data.regularPrice}</span>
          </div>

          <div className="leading-tight text-sm mb-8 [&>p]:mb-3">
            <p className="mb-4">{data.description}</p>
            <p>{data.longDescription}</p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
              tincidunt quam orci, a luctus tortor auctor ut. Duis consequat tempus
              feugiat. Donec pretium, mauris id tincidunt hendrerit, urna velit tristique
              tellus, sed interdum orci eros quis dolor. Aliquam porta nec nunc vel
              viverra. Cras dapibus sagittis orci, et ullamcorper lacus tincidunt id.
              Praesent id enim est. Nullam suscipit erat at elit tempor mattis. Nulla ac
              tortor ultricies, posuere nibh quis, pellentesque orci.
            </p>

            <p>
              Proin varius magna nec laoreet viverra. Maecenas eleifend, diam et vulputate
              facilisis, nunc purus fermentum neque, vitae vestibulum lectus nunc a
              turpis. Curabitur tincidunt arcu et ex posuere, id imperdiet purus iaculis.
              Fusce efficitur tincidunt purus vitae sagittis. Nunc commodo nibh eget
              condimentum iaculis. Ut erat massa, gravida eget urna sit amet, tristique
              posuere erat. Aliquam eu mollis massa. Proin venenatis lectus vitae
              scelerisque dapibus. Duis auctor lectus id nisi viverra congue. Curabitur et
              semper purus. Cras vel lacus sit amet nulla rutrum venenatis et vel nunc.
              Curabitur dignissim auctor mollis. Integer mattis vehicula elit ac
              scelerisque. Nullam tempor massa erat, et feugiat massa luctus a. Nullam
              viverra malesuada purus at fermentum. Pellentesque id imperdiet ex.
            </p>
          </div>

          <button
            type="button"
            className="py-4 px-8 font-bold rounded-full uppercase border-2 border-black shadow-[7px_8px_0px_5px_black] mb-4"
            onClick={() => cartContext.handleAddItemToCart(data)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
}
