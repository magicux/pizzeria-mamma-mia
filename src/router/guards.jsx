// HITO 7: Guards de rutas (protegidas / solo invitados).
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

// Rutas que requieren sesión. Si no hay token, redirige a /login.
export function PrivateRoute({ children }) {
  const { token } = useUser();
  return token ? children : <Navigate to="/login" replace />;
}

// Rutas para invitados. Si hay token, redirige a home.
export function RedirectIfAuth({ children }) {
  const { token } = useUser();
  return token ? <Navigate to="/" replace /> : children;
}
