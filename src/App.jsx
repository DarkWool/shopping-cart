import { SingleProduct } from "./pages/SingleProduct";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop/";
import { Cart } from "./components/Cart";
import { useCart } from "./context/CartContext";

function App() {
  const { isCartActive } = useCart();

  return (
    <>
      {isCartActive && <Cart />}

      <Routes>
        <Route path="/*" element={<Header />} />
        <Route path="/shop/*" element={<Header hasImageBelow={true} />} />
      </Routes>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />}>
          <Route index />
          <Route path="category/:category" />
        </Route>
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
