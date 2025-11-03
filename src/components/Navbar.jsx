import { NavLink, useNavigate } from "react-router-dom";
import { clp } from "../utils/format";
import { useCart } from "../context/CartContext.jsx"; // contexto
import { useUser } from "../context/UserContext.jsx"; // contexto

const Navbar = () => {
  // HITO 6: leer total desde el CartContext
  const { total } = useCart(); // total ahora viene del contexto

  // HITO 8: leer token y logout desde UserContext para mostrar/ocultar botones y cerrar sesión
  const { token, logout, email } = useUser(); // HITO 8

  const navigate = useNavigate();

  const handleLogout = () => {
    // HITO 8: cerrar sesión y redirigir a Login
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    "btn btn-outline-light" + (isActive ? " fw-bold" : "");

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-3">
      <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
        <span role="img" aria-label="pizza">🍕</span>
        <strong>Pizzería Mamma Mía</strong>
      </NavLink>

      <div className="ms-auto d-flex gap-2">
        {/* Home (siempre visible) */}
        <NavLink to="/" className={linkClass} end>
          🍕 Home
        </NavLink>

        {/* Hito 4  (P001) */}
        <NavLink to="/pizza" className={linkClass} end>
          🍕 Pizza (Hito 4)
        </NavLink>

        {/* HITO 8: Botones según token (autenticación con JWT) */}
        {token ? (
          <>
            <NavLink to="/profile" className={linkClass}>
              👤 Profile
            </NavLink>

            {/* HITO 8: Botón Logout visible sólo si hay token */}
            <button
              className="btn btn-outline-warning"
              onClick={handleLogout}
              title={email ? `Cerrar sesión de ${email}` : "Cerrar sesión"}
            >
              🔒 Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={linkClass}>
              🔐 Login
            </NavLink>
            <NavLink to="/register" className={linkClass}>
              🔐 Register
            </NavLink>
          </>
        )}

        {/* Total actualizable */}
        <NavLink to="/cart" className="btn btn-outline-light ms-auto">
          🛒 Total: ${clp(total)}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
