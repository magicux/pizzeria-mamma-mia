# 🍕 Pizzería Mamma Mía

Proyecto desarrollado con **React + Vite** y **Bootstrap** como parte del Bootcamp **Desafío Latam**.  
Implementa componentes reutilizables, manejo de estado, enrutamiento con React Router y un **carrito de compras** con Context API.

---

## 🧭 Hitos

### ✅ Hito 1
- Configuración del proyecto con **React + Vite**.
- Integración de **Bootstrap**.
- Componentes base:
  - `Navbar`, `Header`, `Footer`, `CardPizza`.
  - `Home` (vista principal que renderiza cards de pizzas).

### ✅ Hito 2
- Manejo de **estado** y **eventos** en React.
- **Formularios** (Login / Register) con validaciones básicas.  
  > **Importante:** los estilos de los formularios se mantienen sin cambios.

### ✅ Hito 5 (enfatizado en este README)
**Objetivo:** incorporar **enrutamiento con React Router** y estandarizar la estructura **pages** para las vistas.

**Checklist del Hito 5 (cumplido):**
- [x] Migración/organización de vistas en `src/pages/`:
  - `Home.jsx`, `Login.jsx`, `Register.jsx`, `Cart.jsx`, `Pizza.jsx`, `Profile.jsx`, `NotFound.jsx`.
- [x] **Mapa de rutas**:
  - `/` → Home  
  - `/login` → Login (form existente, **sin cambios de estilos**)  
  - `/register` → Register (form existente, **sin cambios de estilos**)  
  - `/cart` → Cart  
  - `/pizza/p001` → **Detalle fijo** de una pizza (ruta **estática** exigida por el hito)  
  - `/profile` → **Profile** (email estático + botón “Cerrar sesión”)  
  - `*` → **NotFound** (404 con botón “Volver al inicio”)
- [x] `Navbar` con **Links** a las rutas y **botón 🛒** que redirige a `/cart` mostrando el **Total** del carrito.
- [x] Página **NotFound** dedicada (no un H2 inline).
- [x] Mantener `HashRouter`/`BrowserRouter` según despliegue (para **GitHub Pages** se recomienda `HashRouter`).

---

## 🗂️ Estructura de carpetas

```bash
src/
  components/
    Navbar.jsx
    Footer.jsx
    CardPizza.jsx
    # otros componentes reutilizables
  context/
    CartContext.jsx
  pages/
    Home.jsx
    Login.jsx          # (basado en tu LoginPage original, mismo estilo)
    Register.jsx       # (basado en tu RegisterPage original, mismo estilo)
    Cart.jsx
    Pizza.jsx          # /pizza/p001 (ruta fija)
    Profile.jsx        # email estático + botón "Cerrar sesión"
    NotFound.jsx       # 404 con botón "Volver al inicio"
  App.jsx
  main.jsx
  index.css
```

> **Nota:** Se respeta el diseño y estilos existentes de los formularios (Login/Register).

---

## 🧩 Enrutamiento (React Router)

`App.jsx` define las rutas y envuelve la app con el **CartProvider**:

```jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import Cart from "./pages/Cart.jsx";
import Pizza from "./pages/Pizza.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";

import { CartProvider } from "./context/CartContext.jsx";

function App() {
  return (
    <CartProvider>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/p001" element={<Pizza />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
export default App;
```

En `main.jsx`:  
- Para **GitHub Pages**, usa `HashRouter`.  
- Para hosting tradicional (servidor con soporte a history API), `BrowserRouter`.

---

## 🛒 Navbar y Carrito

- `Navbar` usa `NavLink`/`Link` para navegación.
- El botón **🛒 Total** redirige a `/cart` y muestra el total desde el **CartContext**.
- **No** se agrega `/pizza/p001` al menú (requisito del hito).

---

## 👤 Profile y 🚫 NotFound

- `Profile.jsx` muestra un **email estático** y un **botón “Cerrar sesión”** (sin lógica de auth en este hito).
- `NotFound.jsx` entrega una pantalla 404 con **botón para volver al inicio**.

---

## ▶️ Scripts

```bash
# instalar dependencias
npm install

# entorno de desarrollo
npm run dev

# build de producción
npm run build

# previsualizar build
npm run preview
```

---

## 🚀 Despliegue en GitHub Pages (opcional)

1) Usa `HashRouter` en `main.jsx`.  
2) Publica `dist` en GitHub Pages (branch `gh-pages` o desde Settings → Pages).  
3) Si usas subruta (`/pizzeria-mamma-mia/`), configura la `base` de Vite.

---

## 🔧 Troubleshooting rápido

- **“does not provide an export named 'default'”**  
  Exporta como **default** en cada página:
  ```jsx
  export default function NotFound() { ... }
  export default function Profile() { ... }
  ```

- **“useCart debe usarse dentro de <CartProvider>”**  
  Verifica que quien usa `useCart()` (p. ej. `Navbar`) esté **dentro** de `<CartProvider>`:
  ```jsx
  // CartContext.jsx
  export function CartProvider({ children }) { ... }
  export function useCart() { ... }

  // App.jsx
  import { CartProvider } from "./context/CartContext.jsx";

  // Navbar.jsx
  import { useCart } from "../context/CartContext.jsx";
  ```

- **404 en GitHub Pages**  
  Usa `HashRouter` para evitar errores al refrescar rutas internas.

---

## 🧪 Cómo validar el Hito 5

- Navega a `/`, `/login`, `/register`, `/cart`, `/profile`, `/pizza/p001`.
- Verifica que **NotFound** se muestre en rutas inexistentes.
- Comprueba que el botón **🛒 Total** lleva a `/cart`.
- Revisa que `Login` y `Register` **mantienen sus estilos** originales.

---

## 🛠️ Stack

- **React 18 + Vite**
- **React Router**
- **Bootstrap**
- **Context API** (carrito)

---

## 🤝 Flujo de contribución (branch → PR)

```bash
git checkout -b feature/hito5nueva
git add .
git commit -m "Hito 5: rutas, pages, NotFound y Profile (sin cambios de estilos en formularios)"
git push -u origin feature/hito5

# con GitHub CLI (opcional)
gh pr create --base main --head feature/hito5nueva   --title "Hito 5: Enrutamiento + pages + NotFound + Profile"   --body "Se migran vistas a /pages, se agrega ruta fija /pizza/p001, NotFound y Profile; Navbar con Links y botón Cart. Formularios sin cambios de estilos."
```
