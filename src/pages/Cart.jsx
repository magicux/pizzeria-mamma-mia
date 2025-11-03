import { useState } from "react"; // HITO 8
import { clp } from "../utils/format.js";
import { useCart } from "../context/CartContext.jsx";
import { useUser } from "../context/UserContext.jsx";
import { pizzas } from "../data/pizzas.js";
import { API_URL } from "../config.js"; // HITO 8

const Cart = () => {
  // HITO 6: cart + acciones + total desde el Context
  const { cart, inc, dec, add, total } = useCart();
  const { token } = useUser(); // HITO 8: para enviar Authorization: Bearer <token>

  const isEmpty = cart.length === 0;

  // HITO 8: estado de pago (éxito/error) y loading
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleAdd = (p) => {
    // intentar añadir el objeto completo; si el contexto espera id, también intentamos con p.id
    if (!add) return console.warn("Función add no disponible en el contexto");
    try {
      add(p); // preferimos pasar el objeto completo
    } catch (e) {
      try {
        add(p.id);
      } catch (err) {
        console.error("No se pudo añadir la pizza al carrito", err);
      }
    }
  };

  // HITO 8: realizar checkout contra el backend
  const handlePay = async () => {
    setStatus({ type: "", text: "" });
    if (!token) {
      setStatus({ type: "danger", text: "Debes iniciar sesión para comprar." });
      return;
    }
    if (total === 0 || isEmpty) {
      setStatus({ type: "warning", text: "Tu carrito está vacío." });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/checkouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // HITO 8: JWT
        },
        body: JSON.stringify({ cart }), // HITO 8: envío del carrito
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "No fue posible procesar el pago.");
      }

      // Éxito de compra
      setStatus({ type: "success", text: "¡Compra realizada con éxito! ✅" }); // HITO 8
      // Si tienes clearCart en tu contexto, podrías llamarlo aquí.
      // clearCart?.();
    } catch (e) {
      setStatus({ type: "danger", text: e.message }); // HITO 8
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-4">
      <h2 className="mb-4">Tu Carrito 🧺</h2>

      {/* HITO 8: mensajes de estado */}
      {status.text && (
        <div className={`alert alert-${status.type}`}>{status.text}</div>
      )}

      {isEmpty ? (
        <>
          <div className="alert alert-info">No tienes productos en el carrito.</div>

          {/* Catálogo cuando está vacío: mostrar todos los datos y permitir añadir */}
          <h5 className="mt-3">Sigue comprando 🍕</h5>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {pizzas.map((p) => (
              <div className="col" key={p.id}>
                <div className="card h-100 shadow-sm">
                  <img src={p.img} className="card-img-top" alt={p.name} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.name}</h5>
                    {p.ingredients && (
                      <p className="text-muted small mb-2">
                        {p.ingredients.join(" · ")}
                      </p>
                    )}
                    <p className="mb-2 text-muted">ID: {p.id}</p>
                    <p className="fw-bold mb-3">${clp(p.price)}</p>
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => handleAdd(p)}
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <ul className="list-group">
              {cart.map((it) => (
                <li key={it.id} className="list-group-item py-3">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={it.img}
                      alt={it.name}
                      width={80}
                      height={80}
                      className="rounded object-fit-cover"
                    />
                    <div className="me-auto">
                      <h6 className="mb-1">{it.name}</h6>
                      <small className="text-muted">
                        Precio unitario: ${clp(it.price)}
                      </small>
                    </div>

                    <div className="btn-group" role="group" aria-label="qty">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => dec(it.id)}
                        disabled={loading} // HITO 8: no modificar mientras paga
                      >
                        −
                      </button>
                      <span className="btn btn-light disabled">{it.qty}</span>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => inc(it.id)}
                        disabled={loading} // HITO 8
                      >
                        +
                      </button>
                    </div>

                    <div className="ms-3 text-end" style={{ minWidth: 120 }}>
                      <div className="fw-bold">${clp(it.price * it.qty)}</div>
                      <small className="text-muted">Subtotal</small>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Resumen</h5>
                <div className="d-flex justify-content-between my-2">
                  <span>Total</span>
                  <strong>${clp(total)}</strong>
                </div>

                {/* HITO 8: botón Pagar que llama a /api/checkouts */}
                <button
                  className="btn btn-success w-100 mt-2"
                  disabled={!token || total === 0 || loading}
                  onClick={handlePay}
                  title={!token ? "Inicia sesión para comprar" : "Pagar ahora"}
                >
                  {loading ? "Procesando..." : "Pagar"}
                </button>

                <small className="d-block text-muted mt-2">
                  {/* HITO 8: ahora el botón realiza una compra real (POST /api/checkouts) */}
                  * Requiere sesión iniciada para procesar el pago.
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
