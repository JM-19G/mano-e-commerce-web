import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
  const user = localStorage.getItem("currentUser");

  return (
    <BrowserRouter>
      {user && <Navbar />} {/* 👈 only show when logged in */}

      <Layout>
        <Routes>
          {/* Auth Pages */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Pages */}
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/cart"
            element={user ? <Cart /> : <Navigate to="/" />}
          />
          <Route
            path="/orders"
            element={user ? <Orders /> : <Navigate to="/" />}
          />
          <Route
            path="/wishlist"
            element={user ? <Wishlist /> : <Navigate to="/" />}
          />
          <Route
            path="/product/:id"
            element={user ? <ProductDetails /> : <Navigate to="/" />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;