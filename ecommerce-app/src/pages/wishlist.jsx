import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useToast } from "../hooks/useToast.js";
import { addToCart } from "../features/cart/cartSlice";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { toast } = useToast();

  const heartIcon = "\u2764\uFE0F";

  return (
    <div style={{ padding: 20 }}>
      <h1>
        {heartIcon} My Wishlist ({wishlistItems.length})
      </h1>

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
                onAdd={(item) => {
                  dispatch(addToCart(item));
                  toast(`Added ${item.title} to cart`, { type: "success" });
                }}
              />

              <button
                onClick={() => {
                  dispatch(removeFromWishlist(product.id));
                  toast("Removed from wishlist", { type: "info" });
                }}
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
