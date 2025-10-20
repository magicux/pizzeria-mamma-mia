// HITO 7: Contexto de usuario (token + login + logout) con persistencia en localStorage.
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  // Guardamos el token para persistir la sesión entre recargas.
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("token") || "demo-token-h7";
    } catch {
      return "demo-token-h7";
    }
  });
  useEffect(() => {
    try {
      if (token) localStorage.setItem("token", token);
      else localStorage.removeItem("token");
    } catch {}
  }, [token]);

  // HITO 7: login simulado. Si hay email/pass, considera login OK y setea token.
  const login = async (email, password) => {
    if (email && password) setToken("demo-token-h7");
    return true;
  };

  // HITO 7: logout = limpiar token (se refleja en localStorage por el useEffect).
  const logout = () => setToken("");

  const value = useMemo(() => ({ token, login, logout }), [token]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Hook de conveniencia para consumir el contexto en cualquier componente.
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser debe usarse dentro de <UserProvider>");
  return ctx;
};
