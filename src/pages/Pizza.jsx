// Hito 4: vista de detalle por id fijo (p001)
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPizzaById } from "../services/api";
import { clp } from "../utils/format"; // usar helper existente
// HITO 6 (opcional): consumir pizzas desde contexto en vez de fetch local
import { usePizzas } from "../context/PizzasContext.jsx";

export default function Pizza() {
  const { id } = useParams(); // HITO 7: tomar :id desde la URL
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
   let mounted = true;
   (async () => {
     try {
       const data = await getPizzaById(id);
       if (mounted) setPizza(data);
     } catch (_) {}
   })();
   return () => { mounted = false; };
 }, [id]);

  if (loading) return <div className="container py-5">Cargando pizza...</div>;
  if (error) return <div className="container py-5 text-danger">{error}</div>;
  if (!pizza) return null;

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
          <p className="text-muted">{pizza.desc}</p>

          <h5 className="mt-4">Ingredientes</h5>
          <ul className="mb-4">
            {pizza.ingredients?.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <strong className="fs-4">{clp(pizza.price)}</strong>
            {/*  Hito 4: botón presente pero deshabilitado (no pide carrito aquí) */}
            <button className="btn btn-primary" disabled>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
