import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Loader } from "../../components/Loader";
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
    `https://api.bestbuy.com/v1/products(sku=${id})?apiKey=${
      import.meta.env.VITE_API_KEY
    }&show=addToCartUrl,categoryPath.id,categoryPath.name,color,customerReviewAverage,customerReviewCount,description,details.name,details.value,features.feature,image,images,includedItemList.includedItem,longDescription,manufacturer,modelNumber,name,onSale,regularPrice,salePrice,shortDescription,sku,productVariations&format=json`
  );

  if (loading || error) return <Loader />;

  const data = rawData.products[0];

  const addItem = () => {
    const { sku, name, image, regularPrice, salePrice, onSale } = data;
    cartContext.toggleIsCartActive();
    cartContext.handleAddItemToCart({
      sku,
      name,
      image,
      regularPrice,
      salePrice,
      onSale,
    });
  };

  return (
    <>
      <Container
        className="flex flex-col gap-y-8 gap-x-32 mt-5 md:flex-row md:mt-20 mb-32"
        as="section"
      >
        <div className="max-w-lg w-full mx-auto">
          <Carousel images={data.images} />
        </div>

        <div className="max-w-prose">
          <div className="flex flex-col md:flex-row gap-x-6 text-sm mb-3">
            <div>
              <span className="font-semibold mr-2 inline-block">Model:</span>
              {data.modelNumber}
            </div>
            <div>
              <span className="font-semibold mr-2 inline-block">SKU:</span>
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

          <Price
            regularPrice={data.regularPrice}
            salePrice={data.salePrice}
            onSale={data.onSale}
          />

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
            label="Add to Bag"
            className="mb-4 font-extrabold"
          >
            ADD TO BAG
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

function Price({ regularPrice, salePrice, onSale }) {
  const createPriceElement = (price) => {
    return (
      <div>
        <span className="mr-1 font-bold">$</span>
        <span className="font-medium leading-none text-3xl">{price}</span>
      </div>
    );
  };

  return (
    <div className="mb-6 leading-none">
      {onSale ? (
        <>
          <span className="block line-through text-xl text-gray-500">
            ${regularPrice}
          </span>
          {createPriceElement(salePrice)}
        </>
      ) : (
        <>{createPriceElement(regularPrice)}</>
      )}
    </div>
  );
}
