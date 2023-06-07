import { SingleProduct } from "./pages/SingleProduct";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop/";
import { Cart } from "./components/Cart";
import { useCart } from "./context/CartContext";

function App() {
  const { isCartActive, toggleIsCartActive } = useCart();

  return (
    <>
      {isCartActive && <Cart />}

      <Routes>
        <Route path="/*" element={<Header onOpenCart={toggleIsCartActive} />} />
        <Route
          path="/shop"
          element={<Header onOpenCart={toggleIsCartActive} hasImageBelow={true} />}
        />
      </Routes>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />}>
          <Route index />
          <Route path="/shop/category/:category" />
        </Route>
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
    </>
  );
}

export default App;
