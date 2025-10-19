import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPizzaById } from "../services/api";
import { clp } from "../utils/format";
import { useCart } from "../context/CartContext.jsx";

export default function Pizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // soporte para distintos nombres de la función add en el contexto
  const { addToCart, add } = useCart();
  const addFn = addToCart || add;

  useEffect(() => {
    let mounted = true;
    const pid = id || "p001";
    setLoading(true);
    setError("");

    (async () => {
      try {
        const data = await getPizzaById(pid);
        if (!mounted) return;
        if (!data) {
          setPizza(null);
          setError("Pizza no encontrada");
        } else {
          setPizza(data);
        }
      } catch (e) {
        if (mounted) setError("Error al cargar la pizza");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="container py-5">Cargando pizza...</div>;
  if (error) return <div className="container py-5 text-danger">{error}</div>;
  if (!pizza) return <div className="container py-5">Pizza no encontrada.</div>;

  const handleAdd = () => {
    if (!addFn) return console.warn("addToCart no está disponible en el contexto");
    addFn({ id: pizza.id, name: pizza.name, price: pizza.price, img: pizza.img });
  };

  return (
    <div className="container py-4">
      <div className="row g-4 align-items-start">
        <div className="col-12 col-md-6">
          <img
            src={pizza.img}
            alt={pizza.name}
            className="img-fluid rounded"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-12 col-md-6">
          <h2 className="mb-2">{pizza.name}</h2>
          {pizza.desc && <p className="text-muted">{pizza.desc}</p>}

          <h5 className="mt-4">Ingredientes</h5>
          <ul className="mb-4">
            {pizza.ingredients?.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <strong className="fs-4">${clp(pizza.price)}</strong>
            <button className="btn btn-primary" onClick={handleAdd}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
