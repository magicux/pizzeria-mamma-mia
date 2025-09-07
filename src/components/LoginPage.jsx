import { useState } from "react";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      return setMsg({ type: "danger", text: "Todos los campos son obligatorios." });
    }
    if (password.length < 6) {
      return setMsg({ type: "warning", text: "La contraseña debe tener al menos 6 caracteres." });
    }
    setMsg({ type: "success", text: "Inicio de sesión exitoso ✅" });
  };

  return (
    <section className="page-center">
      <div className="auth-card">
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-body p-4">
            <h3 className="mb-3 text-center">Iniciar sesión</h3>

            {msg.text && <div className={`alert alert-${msg.type} mb-3`}>{msg.text}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <span className="input-group-text">📧</span>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="ejemplo@correo.com"
                    value={form.email}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text">🔒</span>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Mínimo 6 caracteres"
                    value={form.password}
                    onChange={onChange}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100">
                Ingresar
              </button>
            </form>
          </div>
        </div>
        <p className="text-center text-muted small mt-3 mb-0">
          ¿No tienes cuenta? Regístrate desde el menú.
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
