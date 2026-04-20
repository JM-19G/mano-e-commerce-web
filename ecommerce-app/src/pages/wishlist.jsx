import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import ProductCard from "../components/ProductCard";
import { addToCart } from "../features/cart/cartSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <div style={{ padding: 20 }}>
      <h1>❤️ My Wishlist ({wishlistItems.length})</h1>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty. Start adding products you like!</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {wishlistItems.map((product) => (
            <div key={product.id} style={{ position: "relative" }}>
              <ProductCard 
                product={product} 
                onAdd={(item) => dispatch(addToCart(item))} 
              />
              
              <button
                onClick={() => dispatch(removeFromWishlist(product.id))}
                style={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: 5,
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;