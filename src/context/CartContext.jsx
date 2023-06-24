import { useState, createContext, useContext } from "react";

const CartContext = createContext();

function useCart() {
  return useContext(CartContext);
}

function CartProvider({ children, initialItems }) {
  const [items, setItems] = useState(initialItems ?? []);
  const [isCartActive, setIsCartActive] = useState(false);

  const toggleIsCartActive = () => setIsCartActive(!isCartActive);

  function handleAddItemToCart(newItem) {
    // Check if the item is already in the cart
    let isItemInCart = false;
    const modifiedData = items.map((item) => {
      if (item.sku === newItem.sku) {
        isItemInCart = true;
        item.quantity += 1;
      }

      return item;
    });

    if (isItemInCart) setItems(modifiedData);
    else {
      // Add the item
      newItem.quantity = 1;
      setItems([newItem, ...items]);
    }
  }

  function handleAdjustItemQuantity(sku, currQuantity, action) {
    if (currQuantity === 1 && action === "decrement") {
      handleRemoveItemFromCart(sku);
      return;
    }

    const updatedData = items.map((item) => {
      if (item.sku === sku) item.quantity += action === "increment" ? 1 : -1;
      return item;
    });

    setItems(updatedData);
  }

  const handleRemoveItemFromCart = (sku) =>
    setItems(items.filter((item) => item.sku !== sku));

  const getSubtotal = () => {
    return items
      .reduce((total, curr) => {
        let price = curr.onSale ? curr.salePrice : curr.regularPrice;
        price *= curr.quantity;

        total += price;
        return total;
      }, 0)
      .toFixed(2);
  };

  const providerValues = {
    isCartActive,
    toggleIsCartActive,
    items,
    handleAddItemToCart,
    handleAdjustItemQuantity,
    handleRemoveItemFromCart,
    getSubtotal,
  };

  return <CartContext.Provider value={providerValues}>{children}</CartContext.Provider>;
}

export { useCart, CartProvider };
