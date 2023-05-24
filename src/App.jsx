import { SingleProduct } from "./pages/SingleProduct";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop/";
import { Cart } from "./components/Cart";
import { useState, createContext } from "react";

export const CartContext = createContext();

function App() {
  const [isCartActive, setIsCartActive] = useState(false);
  const [cartData, setCartData] = useState([]);

  const toggleIsCartActive = () => setIsCartActive(!isCartActive);

  function handleAddItemToCart(newItem) {
    // Check if the product is already in the cart
    let isItemInCart = false;
    const modifiedData = cartData.map((item) => {
      if (item.id === newItem.id) {
        isItemInCart = true;
        item.quantity += 1;
      }

      return item;
    });

    if (isItemInCart) setCartData(modifiedData);
    else {
      // Add the item
      newItem.quantity = 1;
      setCartData([newItem, ...cartData]);
    }
  }

  const removeItemFromCart = (id) =>
    setCartData(cartData.filter((item) => item.id !== id));

  return (
    <>
      {isCartActive && (
        <Cart
          items={cartData}
          onClose={toggleIsCartActive}
          onDeleteItem={removeItemFromCart}
        />
      )}
      <Header onOpenCart={toggleIsCartActive} />
      <CartContext.Provider value={handleAddItemToCart}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/category/:category" element={<Shop />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
      </CartContext.Provider>
    </>
  );
}

export default App;
