// src/services/api.js
export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function getPizzas() {
  const res = await fetch(`${API_BASE}/api/pizzas`);
  if (!res.ok) throw new Error("Error al cargar pizzas");
  return res.json();
}

export async function getPizzaById(id) {
  const res = await fetch(`${API_BASE}/api/pizzas/${id}`);
  if (!res.ok) throw new Error("Pizza no encontrada");
  return res.json();
}
