import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div style={{ padding: 10 }}>
         <Link to="/">Home</Link> |{" "}
         <Link to="/cart">Cart</Link> |{" "}
         <Link to="/orders">Orders</Link>
        </div>

        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/orders" element={<Orders />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;