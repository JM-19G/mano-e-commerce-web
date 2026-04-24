import { useEffect } from "react";

function Checkout() {

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      alert("Please login first");
      window.location.href = "/login";
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Checkout Page</h2>
      <p>Proceed with your order...</p>
    </div>
  );
}

export default Checkout;