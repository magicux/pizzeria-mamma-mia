/* ===============================
 * HITO 6 — Context API (Carrito)
 * Reqs: 1–5 (PDF Hito 6):
 * 1) Context carrito
 * 2) Navbar muestra total
 * 3) Home añade al carrito (botón en cada card)
 * 4) Cart lista productos y permite +/−/eliminar
 * 5) El total de Cart = total del Navbar
 * =============================== */

import { createContext, useContext, useMemo, useState } from "react";
import { pizzaCart, pizzas } from "../data/pizzas.js";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // 🔹 Parte mostrando EXACTO lo que tenga pizzaCart (tu archivo JS)
  const [cart, setCart] = useState(pizzaCart);
 // HITO 6: Incrementar / Decrementar cantidad (+/−) y eliminar si qty llega a 0 (Req. 4)
  const inc = (id) =>
    setCart((c) => c.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));

  // Hito 3: si llega a 0, se elimina del carrito
  const dec = (id) =>
    setCart((c) =>
      c
        .map((it) => (it.id === id ? { ...it, qty: it.qty - 1 } : it))
        .filter((it) => it.qty > 0)
    );

  // Útil para agregar desde catálogo cuando el carrito esté vacío
  // HITO 6: Agregar producto al carrito desde Home/CardPizza (Req. 3)

const add = (pizza) => {
  setCart((prev) => {
    const found = prev.find((p) => p.id === pizza.id);
    return found
      ? prev.map((p) => (p.id === pizza.id ? { ...p, qty: p.qty + 1 } : p))
      : [...prev, { id: pizza.id, name: pizza.name, price: pizza.price, img: pizza.img, qty: 1 }];
  });
};

 
  const total = useMemo(() => cart.reduce((sum, it) => sum + it.price * it.qty, 0), [cart]);
  const count = useMemo(() => cart.reduce((sum, it) => sum + it.qty, 0), [cart]);

  // HITO 6: Total global usado en Navbar y Cart, debe coincidir (Req. 2 y 5)
  return (
    <CartContext.Provider value={{ cart, inc, dec, add, total, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
};
