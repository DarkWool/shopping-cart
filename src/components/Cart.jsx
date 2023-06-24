import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ProductQuantity } from "./ProductQuantity";
import { useCart } from "../context/CartContext";
import { Button } from "./Button";
import StarsImg from "../assets/images/stars.png";

export function Cart() {
  const [isVisible, setIsVisible] = useState(false);
  const {
    items,
    handleAdjustItemQuantity,
    handleRemoveItemFromCart,
    toggleIsCartActive,
    getSubtotal,
  } = useCart();

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 0);
  }, []);

  const TRANSITION_DURATION = 300;
  const transitionClasses = `transition-all duration-${TRANSITION_DURATION}`;
  const classes = isVisible
    ? { cart: "translate-x-0", bg: "bg-black/70 backdrop-blur-sm" }
    : { cart: "translate-x-full invisible" };

  function handleCloseTransition() {
    setIsVisible(false);
    setTimeout(() => {
      toggleIsCartActive();
    }, TRANSITION_DURATION);
  }

  return (
    <>
      {createPortal(
        <>
          <div
            className={`z-[1000] fixed top-0 bg-white h-full w-full leading-5 right-0 text-sm max-w-xl flex flex-col py-10 ${transitionClasses} ${classes.cart}`}
            data-testid="cart"
          >
            <div className="px-16 grow overflow-hidden flex flex-col">
              <div className="mb-9 flex justify-between items-start">
                <div>
                  <span className="text-3xl text-black font-bold tracking-tighter mr-5 font-headings">
                    Shopping Bag
                  </span>
                  <img src={StarsImg} alt="" className="max-h-12 inline-block" />
                </div>

                <Button
                  className="cursor-pointer stroke-black hover:stroke-gray-400 transition-colors ease-in-out duration-200"
                  onClick={handleCloseTransition}
                  label="close"
                  title="close"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="w-9 h-9"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              </div>

              <div className="overflow-y-auto flex-auto">
                <ul className="mr-2">
                  {items.map((item) => (
                    <li key={item.sku} className="flex gap-8 mb-10">
                      <div className="shrink-0 bg-white">
                        <img
                          src={item.image}
                          className="w-20 max-w-full h-20 object-contain"
                        />
                      </div>

                      <div className="flex flex-col gap-y-6">
                        <div className="flex gap-x-4 items-start">
                          <span className="leading-4 font-medium" data-testid="itemTitle">
                            {item.name}
                          </span>

                          <Button
                            className="stroke-slate-400 hover:stroke-slate-900 transition-colors duration-150"
                            onClick={() => handleRemoveItemFromCart(item.sku)}
                            label="Remove item"
                          >
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </Button>
                        </div>

                        <div className="flex justify-between items-end">
                          <p className="font-bold text-base leading-5">
                            ${item.onSale ? item.salePrice : item.regularPrice}
                          </p>
                          <ProductQuantity
                            quantity={item.quantity}
                            onDecrement={() =>
                              handleAdjustItemQuantity(
                                item.sku,
                                item.quantity,
                                "decrement"
                              )
                            }
                            onIncrement={() =>
                              handleAdjustItemQuantity(
                                item.sku,
                                item.quantity,
                                "increment"
                              )
                            }
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-300 pt-6 px-16 text-black">
              <div className="text-base flex justify-between pb-6 items-center">
                <span className="font-semibold">Subtotal:</span>
                <span className="font-bold text-lg" data-testid="subtotal">
                  $ {getSubtotal()}
                </span>
              </div>

              <div>
                <Button
                  variant="primary"
                  label="checkout"
                  className="mb-3 w-full flex justify-center gap-x-2"
                >
                  <span>CHECKOUT</span>
                  <span>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <div
            className={`z-[999] fixed top-0 w-full h-full ${transitionClasses} ${classes.bg}`}
            onClick={handleCloseTransition}
          ></div>
        </>,
        document.body
      )}
    </>
  );
}
