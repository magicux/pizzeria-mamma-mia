import { useEffect, useState } from "react";
// Hito 4: consumir API
import { getPizzas } from "../services/api";
import Header from "../components/Header.jsx";
// Antes importaba datos locales desde el archivo pizzas.js
// import { pizzas as localPizzas } from "../data/pizzas";
import CardPizza from "../components/CardPizza.jsx";

export default function Home() {
  // Hito 4: estado para datos remotos
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hito 4: traer pizzas desde la API al montar
  useEffect(() => {
    let mounted = true;
    getPizzas()
      .then((data) => {
        if (!mounted) return;
        setPizzas(data);
      })
      .catch(() => {
        if (!mounted) return;
        setError("No fue posible cargar las pizzas desde la API");
        // fallback opcional a datos locales si quieres:
        // setPizzas(localPizzas);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="container py-5">Cargando pizzas...</div>;
  if (error) return <div className="container py-5 text-danger">{error}</div>;

return (
  <>
    <Header />
    <div className="container py-4">
      <div className="row g-4">
        {pizzas.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-lg-4">
            <CardPizza {...p} />
          </div>
        ))}
      </div>
    </div>
  </>
);
}