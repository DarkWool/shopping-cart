import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Loader } from "../../components/Loader";
import { API_KEY } from "../../api.js";
import { useFetch } from "../../hooks/useFetch";
import { Container } from "../../components/Container";
import { AdditionalInfo } from "./AdditionalInfo";
import { StarsRating } from "../../components/StarsRating";
import { Button } from "../../components/Button";
import { Carousel } from "./Carousel";
import { decode } from "html-entities";

export function SingleProduct() {
  const cartContext = useCart();
  const { id } = useParams();
  const [loading, error, rawData] = useFetch(
    `https://api.bestbuy.com/v1/products(sku=${id})?apiKey=${API_KEY}&show=addToCartUrl,categoryPath.id,categoryPath.name,color,customerReviewAverage,customerReviewCount,description,details.name,details.value,features.feature,image,images,includedItemList.includedItem,longDescription,manufacturer,modelNumber,name,onSale,regularPrice,salePrice,shortDescription,sku,productVariations&format=json`
  );

  if (loading || error) return <Loader />;

  const data = rawData.products[0];

  const addItem = () => {
    cartContext.toggleIsCartActive();
    cartContext.handleAddItemToCart(data);
  };

  return (
    <>
      <Container className="flex gap-x-32 mt-20 mb-32" as="section">
        <div className="max-w-lg w-full">
          <Carousel images={data.images} />
        </div>

        <div className="max-w-prose">
          <div className="flex gap-x-6 text-sm mb-3">
            <div>
              <span className="font-semibold mr-2">Model:</span>
              {data.modelNumber}
            </div>
            <div>
              <span className="font-semibold mr-2">SKU:</span>
              {data.sku}
            </div>
          </div>

          <h1 className="font-bold text-2xl mb-1 leading-none">{data.name}</h1>

          <StarsRating
            itemRating={data.customerReviewAverage}
            showRating={true}
            reviewCount={data.customerReviewCount}
            className="mb-5"
          />

          <div className="mb-6 leading-none">
            <span className="mr-1 font-bold">$</span>
            <span className="font-medium leading-none text-3xl">{data.regularPrice}</span>
          </div>

          {data.color && (
            <div>
              <span className="font-bold inline-block">Color:</span> {data.color}
            </div>
          )}

          <hr className="border-slate-200 mt-7 mb-8"></hr>

          <div className="text-sm mb-8 leading-snug [&>p]:mb-3">
            <p className="mb-4">{data.description}</p>
            <p>{decode(data.longDescription)}</p>

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

          <Button
            variant="primary"
            onClick={addItem}
            label="Add to Cart"
            className="mb-4 font-extrabold"
          >
            ADD TO CART
          </Button>
        </div>
      </Container>

      <AdditionalInfo
        features={data.features}
        included={data.includedItemList}
        details={data.details}
      />
    </>
  );
}
