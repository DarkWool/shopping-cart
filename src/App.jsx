import { SingleProduct } from "./pages/SingleProduct";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop/";
import { Cart } from "./components/Cart";
import { useCart } from "./context/CartContext";
import { NotFound } from "./pages/404";

function App() {
  const { isCartActive } = useCart();

  return (
    <>
      {isCartActive && <Cart />}

      <Routes>
        <Route path="/*" element={<Header />} />
        <Route path="/shop/*" element={<Header variant="dark" />} />
      </Routes>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />}>
          <Route index />
          <Route path="category/:category" />
        </Route>
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
