// src/services/api.js
// HITO 6: Servicio centralizado para pizzas (robusto a entornos y errores)
const RAW_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5000";
// Normaliza removiendo slashes finales: "https://api" en vez de "https://api///"
export const API_BASE = RAW_BASE.replace(/\/+$/, "");

// Helper de request con headers comunes y mejor manejo de errores
async function apiRequest(path, options = {}) {
  const url = `${API_BASE}${path}`; // path debe iniciar con "/"
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
    // credentials: "include", // ⬅️ descomenta si tu API usa cookies (CORS debe permitirlo)
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    // Propagamos más contexto (status + payload truncado)
    throw new Error(`API ${url} → ${res.status} ${res.statusText} ${text?.slice(0, 140) || ""}`);
  }
  return res.json();
}

// Lista de pizzas
export async function getPizzas() {
  // Backend esperado: GET /api/pizzas → [{ id, name, price, img, ingredients }, ...]
  return apiRequest("/api/pizzas");
}

// Detalle por id
export async function getPizzaById(id) {
  if (!id) throw new Error("id requerido en getPizzaById");
  return apiRequest(`/api/pizzas/${encodeURIComponent(id)}`);
}

