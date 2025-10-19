// src/router/guards.jsx
// HITO 7: Wrappers de rutas protegidas y de invitado
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

// Rutas que requieren estar autenticado
export function PrivateRoute({ children }) {
  const { token } = useUser();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

// Rutas solo para invitados: si hay token, redirige al home
export function RedirectIfAuth({ children }) {
  const { token } = useUser();
  if (token) return <Navigate to="/" replace />;
  return children;
}
