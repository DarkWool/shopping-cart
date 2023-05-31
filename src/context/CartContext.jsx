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
      if (item.id === newItem.id) {
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

  function handleAdjustItemQuantity(id, currQuantity, action) {
    if (currQuantity === 1 && action === "decrement") {
      handleRemoveItemFromCart(id);
      return;
    }

    const updatedData = items.map((item) => {
      if (item.id === id) item.quantity += action === "increment" ? 1 : -1;
      return item;
    });

    setItems(updatedData);
  }

  const handleRemoveItemFromCart = (id) =>
    setItems(items.filter((item) => item.id !== id));

  const providerValues = {
    isCartActive,
    toggleIsCartActive,
    items,
    handleAddItemToCart,
    handleAdjustItemQuantity,
    handleRemoveItemFromCart,
  };

  return <CartContext.Provider value={providerValues}>{children}</CartContext.Provider>;
}

export { useCart, CartProvider };
