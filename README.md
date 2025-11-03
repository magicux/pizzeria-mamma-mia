cat > README_Hito8_Pizzeria_Mamma_Mia.md <<'EOF'
# 🍕 Pizzería Mamma Mía

Proyecto desarrollado con **React + Vite** y **Bootstrap** como parte del Bootcamp **Desafío Latam**.  
Implementa componentes reutilizables, manejo de estado, enrutamiento con React Router y un **carrito de compras** global mediante **Context API**.  
A partir del **Hito 8**, la aplicación incorpora **autenticación real con JWT** y **checkout** que consume un backend con token.

---

## 🚀 Stack Tecnológico

- **React 18 + Vite**
- **React Router DOM**
- **Bootstrap 5**
- **Context API** (para `UserContext` y `CartContext`)
- **Fetch API**
- **Autenticación JWT (JSON Web Token)**

---

## 🧭 Hitos

### ✅ Hito 1
- Configuración inicial del proyecto con **React + Vite**.
- Integración de **Bootstrap**.
- Creación de componentes base:
  - `Navbar`, `Header`, `Footer`, `CardPizza`, `Home`.

---

### ✅ Hito 2
- Manejo de **estado** y **eventos** en React.
- Formularios (`Login` / `Register`) con validaciones básicas.
- Se mantienen los estilos originales de los formularios.

---

### ✅ Hito 5
- Incorporación de **React Router DOM**.
- Organización de vistas en `src/pages/`.
- Rutas principales:  
  `/`, `/login`, `/register`, `/cart`, `/profile`, `/pizza/:id`, `*` (404).
- `Navbar` con enlaces dinámicos y botón con **total del carrito**.
- `Profile` muestra email estático y botón **Cerrar sesión**.
- `NotFound` muestra página 404 y botón para volver al inicio.

---

### ✅ Hito 6 (Context API – Carrito Global)
- Creación de **`CartContext`** para manejar el carrito global:
  - Añadir, aumentar, disminuir y eliminar productos.
  - Cálculo del total global mostrado en `Navbar` y `Cart`.
- Creación de **`PizzasContext`** (catálogo global).
- `CardPizza` muestra datos y permite añadir pizzas al carrito.
- `Cart.jsx` muestra ítems, subtotales y total actualizable.

---

### ✅ Hito 7 (Autenticación Simulada + Rutas Protegidas)
- Creación de **`UserContext`** para manejar la sesión simulada:
  - `token`, `login`, `logout`, persistencia en `localStorage`.
- Implementación de **rutas protegidas**:
  - `PrivateRoute` protege `/profile`.
  - `RedirectIfAuth` evita que usuarios logeados accedan a `/login` o `/register`.
- `Navbar` alterna opciones según sesión activa.
- `Profile` muestra email y permite cerrar sesión.

---

### ✅ Hito 8 (JWT + Checkout Real)
**Objetivo:** conectar la app con un **backend real con JWT**, utilizando endpoints `/api/auth/login`, `/api/auth/register`, `/api/auth/me` y `/api/checkouts`.

#### 🔒 Autenticación real (UserContext)
- `src/config.js`: centraliza la URL del backend
  ```js
  export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
---

## 🗂️ Estructura del proyecto (actualizada)

src/
 ├─ components/
 │   ├─ Navbar.jsx
 │   ├─ Header.jsx
 │   ├─ Footer.jsx
 │   └─ CardPizza.jsx
 │
 ├─ context/
 │   ├─ UserContext.jsx     # JWT login/register/me/logout + persistencia
 │   ├─ CartContext.jsx     # Manejo global del carrito
 │   └─ PizzasContext.jsx   # Catálogo global
 │
 ├─ pages/
 │   ├─ Home.jsx
 │   ├─ LoginPage.jsx
 │   ├─ RegisterPage.jsx
 │   ├─ Cart.jsx
 │   ├─ Pizza.jsx
 │   ├─ Profile.jsx
 │   └─ NotFound.jsx
 │
 ├─ router/
 │   └─ guards.jsx          # PrivateRoute / RedirectIfAuth
 │
 ├─ config.js               # API_URL centralizado (Hito 8)
 ├─ App.jsx
 └─ main.jsx
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

🧪 Pruebas Manuales Sugeridas (Hito 8)

Registro → /register → redirige a /profile.

Persistencia → F5 → mantiene sesión.

Logout → limpia localStorage y redirige a /login.

Checkout → POST /api/checkouts con JWT → mensaje “¡Compra realizada con éxito! ✅”.
---
✅ Checklist Final – Hito 8
Elemento	          Descripción	                                    Estado
config.js	          Centraliza API_URL (lee .env.local)         	    ✅
UserContext	        JWT login/register/me/logout + persistencia	      ✅
Navbar	            Alterna botones según sesión y ejecuta logout	    ✅
Profile	Protegido,  muestra email y permite cerrar sesión       	    ✅
Cart	              Checkout real con JWT + feedback visual	          ✅
Guards              (router/guards.jsx)	PrivateRoute y RedirectIfAuth	✅
App.jsx	            UserProvider + CartProvider envuelven la app	    ✅
.env.local	        Incluye VITE_API_URL	                            ✅
## 🧭 Comandos Git para crear rama y pull request (ejemplo)

```bash
# crear rama con todos los cambios
git checkout -b feature/hito8-full-update

# añadir todos los cambios
git add .

# commit
git commit -m "Hito 8: JWT"

# push a remoto
git push origin feature/hito8-full-update
```

Después de push, crea el Pull Request en GitHub:
- Ve a tu repo → pestaña "Pull requests" → "New pull request".
- Selecciona `feature/hito8-full-update` como rama fuente y `main` como destino.
- Revisa cambios y crea el PR.
