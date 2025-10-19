// HITO 7: Router con rutas protegidas (Profile), de invitado (Login/Register) y detalle dinámico (useParams).
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Páginas (ajusta las rutas si en tu repo están en /views)
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Cart from "./pages/Cart.jsx";
import Pizza from "./pages/Pizza.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";

// Contextos
import { UserProvider } from "./context/UserContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

// Guards H7
import { PrivateRoute, RedirectIfAuth } from "./router/guards.jsx";

function App() {
  return (
    <UserProvider>
      {/* <PizzasProvider> */}
      <CartProvider>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              {/* HITO 7: ruta de detalle dinámica con useParams */}
              <Route path="/pizza/:id" element={<Pizza />} />

              {/* HITO 7: Solo invitados (redirige a "/" si ya hay sesión) */}
              <Route
                path="/login"
                element={
                  <RedirectIfAuth>
                    <LoginPage />
                  </RedirectIfAuth>
                }
              />
              <Route
                path="/register"
                element={
                  <RedirectIfAuth>
                    <RegisterPage />
                  </RedirectIfAuth>
                }
              />

              {/* HITO 7: Protegida (requiere token; si no, va a /login) */}
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
      {/* </PizzasProvider> */}
    </UserProvider>
  );
}

export default App;
