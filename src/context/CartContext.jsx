import { useState, createContext, useContext } from "react";

const CartContext = createContext();

function useCart() {
  return useContext(CartContext);
}

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartActive, setIsCartActive] = useState(false);

  const toggleIsCartActive = () => setIsCartActive(!isCartActive);

  function handleAddItemToCart(newItem) {
    // Check if the product is already in the cart
    let isItemInCart = false;
    const modifiedData = cartItems.map((item) => {
      if (item.id === newItem.id) {
        isItemInCart = true;
        item.quantity += 1;
      }

      return item;
    });

    if (isItemInCart) setCartItems(modifiedData);
    else {
      // Add the item
      newItem.quantity = 1;
      setCartItems([newItem, ...cartItems]);
    }
  }

  function handleAdjustProductQuantity(id, currQuantity, action) {
    if (currQuantity === 1 && action === "decrement") {
      handleRemoveItemFromCart(id);
      return;
    }

    const updatedData = cartItems.map((item) => {
      if (item.id === id) item.quantity += action === "increment" ? 1 : -1;
      return item;
    });

    setCartItems(updatedData);
  }

  const handleRemoveItemFromCart = (id) =>
    setCartItems(cartItems.filter((item) => item.id !== id));

  const providerValues = {
    isCartActive,
    toggleIsCartActive,
    cartItems,
    handleAddItemToCart,
    handleAdjustProductQuantity,
    handleRemoveItemFromCart,
  };

  return <CartContext.Provider value={providerValues}>{children}</CartContext.Provider>;
}

export { useCart, CartProvider };
