// src/components/CardPizza.jsx
/* eslint-disable react/prop-types */
// HITO 6: usar el contexto para poder añadir desde Home (Req. 3)
import { useCart } from "../context/CartContext.jsx";
import { clp } from "../utils/format.js";

export default function CardPizza({ id, name, price, ingredients, img }) {
  // HITO 6: el hook debe ir DENTRO del componente
  const { add } = useCart();

  // HITO 6: pasar objeto con id, name, price, img

  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src={img} className="card-img-top" alt={`Pizza ${name}`} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-2">{name}</h5>

          <h6 className="text-muted mb-2">Ingredientes</h6>
          <ul className="mb-3">
            {ingredients?.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center mt-auto">
            {/* HITO 6: usar helper de moneda sin prefijo manual */}
            <span className="fw-bold fs-5">{clp(price)}</span>

            {/* HITO 6: botón Añadir que agrega por id (Req. 3) */}
            <button
              className="btn btn-primary"
              onClick={() => add({ id, name, price, img })}
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
