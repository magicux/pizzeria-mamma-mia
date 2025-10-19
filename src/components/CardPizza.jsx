// src/components/CardPizza.jsx
/* eslint-disable react/prop-types */
import { useCart } from "../context/CartContext.jsx";
import { clp } from "../utils/format.js";

export default function CardPizza({ id, name, price, ingredients, img }) {
  const { add } = useCart();
  const handleAdd = () => add({ id, name, price, img });

  return (
    <div className="card h-100 shadow-sm">
      <img src={img} className="card-img-top" alt={name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-capitalize">{name}</h5>
        <ul className="mb-3">
          {ingredients?.map((ing) => (
            <li key={ing}>🍕 {ing}</li>
          ))}
        </ul>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="fw-bold fs-5">{clp(price)}</span>
          <button className="btn btn-primary" onClick={handleAdd}>
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
