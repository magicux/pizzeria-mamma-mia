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

---

### ✅ Hito 2
- Manejo de **estado** y **eventos** en React.  
- Creación de **formularios** (`Login` / `Register`) con validaciones básicas.  
- Se mantienen los **estilos originales** de los formularios.

---

### ✅ Hito 5  
**Objetivo:** incorporar **enrutamiento con React Router** y organizar las vistas en `src/pages/`.

**Checklist cumplido:**
- Rutas principales: `/`, `/login`, `/register`, `/cart`, `/profile`, `/pizza/p001`, `* → NotFound`.  
- `Navbar` con enlaces de navegación y botón 🛒 que muestra el total.  
- `Profile` con email estático y botón *Cerrar sesión*.  
- `NotFound` con mensaje 404 y botón *Volver al inicio*.  

---

### ✅ Hito 6 (**Carrito global y Context API**)
**Objetivo:** conectar toda la aplicación mediante estados globales (carrito y catálogo) utilizando **React Context API**.

#### 🔹 Requerimientos implementados
- [x] **`CartContext`**:  
  - Maneja el estado global del carrito.  
  - Permite agregar pizzas desde cualquier vista.  
  - Incrementar / decrementar cantidad (+ / −).  
  - Eliminar ítems con cantidad 0.  
  - Calcular el **total global** mostrado en `Navbar` y `Cart`.  

- [x] **`PizzasContext`**:  
  - Centraliza el listado de pizzas (simulado desde datos locales o JSON).  
  - Evita duplicar el `fetch` en `Home`.  

- [x] **`CardPizza`**:  
  - Muestra nombre, ingredientes, imagen y precio.  
  - Botón **“Añadir”** que agrega la pizza al carrito usando `useCart()`.  

- [x] **`Cart.jsx`**:  
  - Lista las pizzas agregadas con nombre, imagen, precio unitario y subtotal.  
  - Botones (+ / −) para modificar cantidad en tiempo real.  
  - Total calculado con precisión y sincronizado con el `Navbar`.  

- [x] **`Navbar.jsx`**:  
  - Muestra el **total** del carrito desde el contexto global.  
  - Redirige a `/cart` al hacer clic en el botón 🛒.  

- [x] Flujo de datos completamente funcional entre `Home`, `Cart` y `Navbar`.

---

## 🗂️ Estructura del proyecto

```bash
src/
  components/
    Navbar.jsx
    Header.jsx
    Footer.jsx
    CardPizza.jsx
  context/
    CartContext.jsx       # Lógica global del carrito
    PizzasContext.jsx     # Centraliza el listado de pizzas
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

## 🧩 Envoltorio de Providers en App.jsx

```jsx
import { PizzasProvider } from "./context/PizzasContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function App() {
  return (
    <PizzasProvider>
      <CartProvider>
        {/* Navbar, Rutas, Footer */}
      </CartProvider>
    </PizzasProvider>
  );
}

export default App;
```

---

## 🛒 Lógica del Carrito

- **add(pizza)** → agrega o incrementa cantidad de la pizza seleccionada.  
- **inc(id)** / **dec(id)** → modifican cantidad.  
- **total** → valor total acumulado (`price × qty`).  
- `Navbar` y `Cart` consumen el mismo `total` desde `CartContext`.  
- Se manejan errores con mensajes amigables (`useCart debe usarse dentro de <CartProvider>`).

---

## 🧪 Validación del Hito 6

1. **Home:** muestra las pizzas desde `PizzasContext`.  
2. **Botón “Añadir”:** incrementa el total en `Navbar`.  
3. **Cart:** refleja las pizzas añadidas, con cantidades correctas.  
4. **Botones + / −:** actualizan el subtotal y el total general.  
5. **Total:** coincide entre `Navbar` y `Cart`.  
6. **Sin duplicación de datos:** Home ya no realiza `fetch` directo.

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
4. Utiliza `HashRouter` en `main.jsx` para evitar errores 404.

---

## 🧱 Stack Tecnológico

- **React 18 + Vite**  
- **React Router DOM**  
- **Bootstrap 5**  
- **Context API**

---

## 💬 Comentario Final

El **Hito 6** completa la funcionalidad principal de la aplicación:  
- Manejo global de estado mediante Context API.  
- Comunicación directa entre componentes sin prop-drilling.  
- Sincronización en tiempo real entre Home, Navbar y Cart.  
- Preparación lista para integrar servicios externos o backend real.
