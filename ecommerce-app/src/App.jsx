import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ AUTH PAGES (NO NAVBAR) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ MAIN APP PAGES (WITH NAVBAR) */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
            </>
          }
        />

        <Route
          path="/orders"
          element={
            <>
              <Navbar />
              <Orders />
            </>
          }
        />

        <Route
          path="/wishlist"
          element={
            <>
              <Navbar />
              <Wishlist />
            </>
          }
        />

        <Route
          path="/checkout"
          element={
            <>
              <Navbar />
              <Checkout />
            </>
          }
        />

        <Route
          path="/product/:id"
          element={
            <>
              <Navbar />
              <ProductDetails />
            </>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;