import { SingleProduct } from "./pages/SingleProduct";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop/";
import { Cart } from "./components/Cart";
import { useCart } from "./context/CartContext";

function App() {
  const cartContext = useCart();

  return (
    <>
      {cartContext.isCartActive && (
        <Cart
          items={cartContext.cartItems}
          onAdjustQuantity={cartContext.handleAdjustProductQuantity}
          onDeleteItem={cartContext.handleRemoveItemFromCart}
          onClose={cartContext.toggleIsCartActive}
        />
      )}

      <Header onOpenCart={cartContext.toggleIsCartActive} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/category/:category" element={<Shop />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
    </>
  );
}

export default App;
