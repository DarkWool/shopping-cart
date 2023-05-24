import { useEffect, useState } from "react";

export function Cart({ onClose, onDeleteItem, items }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 0);
  }, []);

  const TRANSITION_DURATION = 300;
  const transitionClasses = `transition-all duration-${TRANSITION_DURATION}`;
  let classes = { cart: "", background: "" };
  if (isVisible) {
    classes.cart = "translate-x-0";
    classes.background = "bg-black/70 backdrop-blur-sm";
  } else {
    classes.cart = "translate-x-full";
  }

  function handleCloseTransition() {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, TRANSITION_DURATION);
  }

  return (
    <>
      <div
        className={`z-10 fixed bg-white h-full max-w-xl w-full leading-5 py-16 px-20 right-0 overflow-y-auto text-sm ${transitionClasses} ${classes.cart}`}
      >
        <div className="mb-14 flex items-center justify-between">
          <span className="text-4xl font-extrabold block">Shopping Bag</span>
          <span className="cursor-pointer" onClick={handleCloseTransition}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>

        <div>
          <ul>
            {items.map((item) => (
              <li key={item.id} className="flex gap-8 mb-8">
                <div className="shrink-0 bg-white">
                  <img src={item.image} className="w-24 max-w-full h-24 object-contain" />
                </div>
                <div className="flex flex-col gap-y-2 items-start">
                  <p className="leading-5 font-medium">{item.title}</p>
                  <p className="font-bold text-lg leading-5">${item.price}</p>
                  <p className="font-bold text-sm leading-5">Quantity: {item.quantity}</p>

                  <button
                    className="bg-red-50 text-red-700 px-3 py-1 text-xs border-red-200 border w-auto text-left"
                    onClick={() => onDeleteItem(item.id)}
                  >
                    <p className="font-semibold leading-5">Remove</p>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm font-bold">
          <span>Subtotal:</span> $
          {items.reduce((total, curr) => {
            console.log(curr);
            total += curr.price * curr.quantity;
            return total;
          }, 0)}
        </div>
      </div>

      <div
        className={`fixed w-full h-full ${transitionClasses} ${classes.background}`}
        onClick={handleCloseTransition}
      ></div>
    </>
  );
}
