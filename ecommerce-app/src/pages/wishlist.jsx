import PageWrapper from "../components/PageWrapper";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useToast } from "../hooks/useToast.js";
import { addToCart } from "../features/cart/cartSlice";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { toast } = useToast();

  return (
    <PageWrapper>
      <div style={styles.container}>
        <h1>❤️ Wishlist ({wishlistItems.length})</h1>

        {wishlistItems.length === 0 ? (
          <p>No items yet</p>
        ) : (
          <div style={styles.grid}>
            {wishlistItems.map((product) => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  onAdd={(item) => {
                    dispatch(addToCart(item));
                    toast("Added to cart", { type: "success" });
                  }}
                />

                <button
                  onClick={() => dispatch(removeFromWishlist(product.id))}
                  style={styles.remove}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

const styles = {
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    background: "rgba(255,255,255,0.9)",
    padding: 20,
    borderRadius: 12,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 20,
  },
  remove: {
    marginTop: 5,
    background: "red",
    color: "#fff",
    border: "none",
    padding: 6,
    borderRadius: 6,
  },
};

export default Wishlist;