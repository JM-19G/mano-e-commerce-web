import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default PublicRoute;