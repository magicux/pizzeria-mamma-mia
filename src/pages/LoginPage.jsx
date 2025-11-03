// HITO 8: Login real contra /api/auth/login
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error, isAuth } = useUser();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    const { ok, error: err } = await login(form);
    if (ok) {
      setMsg("Ingreso exitoso ✅");
      // navega a home o profile
      navigate("/profile");
    } else {
      setMsg(err || "No fue posible iniciar sesión");
    }
  };

  if (isAuth) {
    // si ya está logeado, lo mandamos a su perfil
    navigate("/profile");
  }

  return (
    <div className="container py-4">
      <h2>Login</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="col-12 col-md-6 p-0">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            className="form-control"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            autoComplete="username"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            className="form-control"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            autoComplete="current-password"
          />
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
