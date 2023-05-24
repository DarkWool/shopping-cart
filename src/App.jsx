import { SingleProduct } from "./pages/SingleProduct";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop/";
import { Cart } from "./components/Cart";
import { useState } from "react";

function App() {
  const [isCartActive, setIsCartActive] = useState(false);

  const toggleIsCartActive = () => setIsCartActive(!isCartActive);

  return (
    <>
      {isCartActive && <Cart onClose={toggleIsCartActive} />}
      <Header onOpenCart={toggleIsCartActive} />
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
