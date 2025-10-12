// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { CartProvider } from "./context/CartContext.jsx";
// HITO 6 (opcional): envolver app con PizzasProvider
import { PizzasProvider } from "./context/PizzasContext.jsx";


// Páginas
import Home from "./pages/Home.jsx";
import Register from "./pages/RegisterPage.jsx";
import Login from "./pages/LoginPage.jsx";
import Cart from "./pages/Cart.jsx";
import Pizza from "./pages/Pizza.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";



function App() {
  return (
    // Dentro del return, envolver CartProvider con PizzasProvider o viceversa:
    <PizzasProvider>
      <CartProvider>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            {/*
              El Hito 5 exige una ruta fija /pizza/p001 que muestre Pizza.
              Si luego necesitas dinámicas, se puede agregar /pizza/:id más adelante.
            */}
            <Route path="/pizza/p001" element={<Pizza />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </CartProvider>
    </PizzasProvider>
  );
}
export default App;