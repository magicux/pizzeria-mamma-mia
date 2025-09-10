// src/context/CartContext.jsx
import { createContext, useContext, useMemo, useState } from "react";
import { pizzaCart, pizzas } from "../data/pizzas.js";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // 🔹 Parte mostrando EXACTO lo que tenga pizzaCart (tu archivo JS)
  const [cart, setCart] = useState(pizzaCart);

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
  const add = (id) =>
    setCart((c) => {
      const found = c.find((it) => it.id === id);
      if (found) return c.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it));
      const p = pizzas.find((p) => p.id === id);
      return p ? [...c, { id: p.id, name: p.name, price: p.price, img: p.img, qty: 1 }] : c;
    });

  const total = useMemo(() => cart.reduce((sum, it) => sum + it.price * it.qty, 0), [cart]);
  const count = useMemo(() => cart.reduce((sum, it) => sum + it.qty, 0), [cart]);

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
