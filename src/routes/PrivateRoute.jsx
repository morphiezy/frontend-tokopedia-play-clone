import { Navigate } from "react-router-dom";

export default function PrivateRoute({ redirect, isAuth, children }) {
  if (isAuth) return children;
  return <Navigate to={redirect} replace />;
}
