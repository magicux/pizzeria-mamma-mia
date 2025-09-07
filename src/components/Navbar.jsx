import { NavLink } from "react-router-dom";
import { clp } from "../utils/format";

const Navbar = () => {
  const total = 25000;
  const token = false; // true = logueado, false = no logueado (simulación)

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

        {/* Botones según token */}
        {token ? (
          <>
            <NavLink to="/profile" className={linkClass}>
              🔓 Profile
            </NavLink>
            <button className="btn btn-outline-light">🔒 Logout</button>
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

        {/* Total (siempre visible) */}
        <button className="btn btn-success">
          🛒 Total: ${clp(total)}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
