# 🍕 Pizzería Mamma Mía

Proyecto desarrollado con **React + Vite** y **Bootstrap** como parte del Bootcamp **Desafío Latam**.  
Implementa componentes reutilizables, manejo de estado, enrutamiento con React Router y un **carrito de compras global** mediante **Context API**.

---

## 🧭 Hitos

### ✅ Hito 1
- Configuración del proyecto con **React + Vite**.  
- Integración de **Bootstrap**.  
- Creación de componentes base:
  - `Navbar`, `Header`, `Footer`, `CardPizza`.  
  - `Home` (vista principal que renderiza las cards de pizzas).

### ✅ Hito 2
- Manejo de **estado** y **eventos** en React.  
- Creación de **formularios** (`Login` / `Register`) con validaciones básicas.  
- Se mantienen los **estilos originales** de los formularios.

### ✅ Hito 5  
**Objetivo:** incorporar **enrutamiento con React Router** y organizar las vistas en `src/pages/`.

**Checklist cumplido:**
- Rutas principales: `/`, `/login`, `/register`, `/cart`, `/profile`, `/pizza/p001`, `* → NotFound`.  
- `Navbar` con enlaces de navegación y botón 🛒 que muestra el total.  
- `Profile` con email estático y botón *Cerrar sesión*.  
- `NotFound` con mensaje 404 y botón *Volver al inicio*.  

### ✅ Hito 6 (**Carrito global y Context API**)
**Objetivo:** conectar toda la aplicación mediante estados globales (carrito y catálogo) utilizando **React Context API**.

#### 🔹 Requerimientos implementados
- **`CartContext`**:  
  - Maneja el estado global del carrito.  
  - Permite agregar pizzas desde cualquier vista.  
  - Incrementar / decrementar cantidad (+ / −).  
  - Eliminar ítems con cantidad 0.  
  - Calcular el **total global** mostrado en `Navbar` y `Cart`.  

- **`PizzasContext`**:  
  - Centraliza el listado de pizzas (simulado desde datos locales o JSON).  
  - Evita duplicar el `fetch` en `Home`.  

- **`CardPizza`**:  
  - Muestra nombre, ingredientes, imagen y precio.  
  - Botón **“Añadir”** que agrega la pizza al carrito usando `useCart()`.  

- **`Cart.jsx`**:  
  - Lista las pizzas agregadas con nombre, imagen, precio unitario y subtotal.  
  - Botones (+ / −) para modificar cantidad en tiempo real.  
  - Total calculado con precisión y sincronizado con el `Navbar`.  

- **`Navbar.jsx`**:  
  - Muestra el **total** del carrito desde el contexto global.  
  - Redirige a `/cart` al hacer clic en el botón 🛒.  

---

### ✅ Hito 7 (**Autenticación simulada, persistencia y protecciones**)

**Objetivo:** añadir contexto de usuario (token), persistencia en localStorage y rutas protegidas/guest.

#### 🔹 Cambios y funcionalidades agregadas
- **`UserContext`**:
  - Nuevo contexto que maneja `token`, `login(email, password)` y `logout()`.
  - Persistencia del token en `localStorage` (se guarda/borra automáticamente).
  - Exporta `UserProvider` y el hook `useUser()` que valida su uso dentro del provider.
- **Rutas protegidas y de invitado**:
  - `PrivateRoute` para proteger `/profile` (redirige a `/login` si no hay token).
  - `RedirectIfAuth` o guard para rutas de invitado (`/login`, `/register`) que redirige a `/` si ya hay token.
- **Integración en la UI**:
  - `Navbar` consume `useUser()` para mostrar `Profile` / `Logout` cuando hay token, o `Login` / `Register` si no.
  - `Profile` muestra el token actual y permite `logout`.
- **Persistencia y flujo**:
  - Login simulado (si hay email y password se genera token demo).
  - Token persiste entre recargas; `logout` limpia token y localStorage.
- **Entrada (main.jsx)**:
  - La app se envuelve con los providers en `main.jsx`: `BrowserRouter > UserProvider > CartProvider > PizzasProvider > App`.
  - Solo un `BrowserRouter` en la app (evitar errores "You cannot render a <Router> inside another <Router>").
- **Mejoras en UX**:
  - Guardias para evitar que componentes que consumen contextos se rendericen fuera de sus providers (evitar errores tipo "useX debe usarse dentro de <XProvider>").

---

## 🗂️ Estructura del proyecto (actualizada)

```bash
src/
  components/
    Navbar.jsx
    Header.jsx
    Footer.jsx
    CardPizza.jsx
  context/
    UserContext.jsx       # HITO 7: token + login + logout + persistencia
    CartContext.jsx       # HITO 6: Lógica global del carrito
    PizzasContext.jsx     # HITO 6: Centraliza el listado de pizzas
  pages/
    Home.jsx
    LoginPage.jsx
    RegisterPage.jsx
    Cart.jsx
    Pizza.jsx
    Profile.jsx
    NotFound.jsx
  App.jsx
  main.jsx
```

---

## 🛠️ Notas de integración importantes
- Asegura que `main.jsx` importe Bootstrap y los estilos globales:
  ```js
  import "bootstrap/dist/css/bootstrap.min.css";
  import "./index.css";
  ```
- Verifica que `UserProvider`, `CartProvider` y `PizzasProvider` envuelvan `App` en `main.jsx` (único lugar para `BrowserRouter`).
- Comprueba que los hooks `useUser`, `useCart` y `usePizzas` se importan como named exports y que sus providers están presentes en el árbol de componentes.
- Evita declarar más de un `BrowserRouter` en la app.

---

## ▶️ Scripts

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Generar build de producción
npm run build

# Previsualizar el build
npm run preview
```

---

## 🚀 Despliegue (GitHub Pages)

1. Configura `base: "/pizzeria-mamma-mia/"` en `vite.config.js`.  
2. Usa `npm run build` para generar el proyecto.  
3. Publica `/dist` en GitHub Pages (rama `gh-pages` o desde *Settings → Pages*).  
4. Para Pages puedes usar `HashRouter` en `main.jsx` para evitar errores 404.

---

## 🧪 Ejemplos de uso del UserContext (Hito 7)

- Uso del hook en un componente (p. ej. `Profile.jsx` o `Navbar.jsx`):

```jsx
import { useUser } from "../context/UserContext.jsx";

function Example() {
  const { token, login, logout } = useUser();

  // login simulado
  const handleLogin = async () => {
    await login("correo@ejemplo.com", "password");
    // ahora token está disponible y persistido en localStorage
  };

  return (
    <div>
      <p>Token: {token || "(no autenticado)"}</p>
      <button onClick={handleLogin}>Login demo</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

- `UserProvider` en `main.jsx` (entrada única, envuelve App):

```jsx
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { PizzasProvider } from "./context/PizzasContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <CartProvider>
        <PizzasProvider>
          <App />
        </PizzasProvider>
      </CartProvider>
    </UserProvider>
  </BrowserRouter>
);
```

- Nota: `useUser()` lanza un error si se usa fuera de `UserProvider`. Asegúrate de envolver la app correctamente.

---

## 🧭 Comandos Git para crear rama y pull request (ejemplo)

```bash
# crear rama con todos los cambios
git checkout -b feature/hito7-full-update

# añadir todos los cambios
git add .

# commit
git commit -m "Hito 7: UserContext, providers y guards; mejoras en Cart y Nav"

# push a remoto
git push origin feature/hito7-full-update
```

Después de push, crea el Pull Request en GitHub:
- Ve a tu repo → pestaña "Pull requests" → "New pull request".
- Selecciona `feature/hito7-full-update` como rama fuente y `main` como destino.
- Revisa cambios y crea el PR.
