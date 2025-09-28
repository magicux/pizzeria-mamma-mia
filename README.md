# 🍕 Pizzería Mamma Mía

Proyecto desarrollado con **React + Vite** y **Bootstrap** como parte del Bootcamp **Desafío Latam**.  
En este repositorio se implementan los **Hitos 1, 2, 3 y 4**, aplicando componentes, estado, eventos, enrutamiento, consumo de API y contexto global.

> **Demo (GH Pages):** https://magicux.github.io/pizzeria-mamma-mia/  
> ⚠️ La demo pública no puede llamar a la API local del Hito 4. Para probar Hito 4, ejecuta el backend y el frontend **en local**.

---

## 📌 Hitos

### ✅ Hito 1
- Configuración del proyecto con **React + Vite**.
- Integración de **Bootstrap** para estilos.
- Componentes base:
  - `Navbar` (barra de navegación).
  - `Header` (hero con imagen y texto central).
  - `Footer` (pie de página full-width).
  - `CardPizza` (card reutilizable).
  - `Home` (vista principal con grid de cards).

### ✅ Hito 2
- Manejo de **estado** y **eventos**.
- Formularios con validaciones:
  - `RegisterPage`: email, contraseña y confirmación (mín. 6 caracteres).
  - `LoginPage`: email y contraseña (mín. 6).
- Mensajes de éxito/error con estilos Bootstrap.
- Rutas principales: `/`, `/login`, `/register`.

### ✅ Hito 3
- **Carrito de compras** con **Context API** (`CartContext`).
- Total del carrito visible en `Navbar`.
- Vista `Cart` con **+/-**, eliminación al llegar a 0 y **cálculo de total**.
- **Conversión de moneda** con helper `clp()` en `src/utils/format.js` para mostrar precios en CLP.

### ✅ Hito 4
- **Consumo de API (Material de apoyo – Backend Pizzas)**.
- Nuevo servicio `src/services/api.js` con:
  - `getPizzas()` → lista.
  - `getPizzaById(id)` → detalle.
- `Home.jsx` ahora **obtiene las pizzas desde la API** y renderiza las cards (con estados de carga y error).
- Nueva vista `Pizza.jsx` que **muestra el detalle por id fijo `p001`**:
  - nombre, imagen, descripción, ingredientes y **precio con `clp()`**.
  - botón **“Añadir al carrito” presente pero deshabilitado** (según requerimiento).
- **Rutas**:
  - Fija: `/pizza` → muestra `p001`.
 
 - Mantención de estilos y estructura existentes (Bootstrap + layout actual).
- En el código nuevo se marcan comentarios `// Hito 4`.

---

## 🗂️ Estructura del proyecto (resumen)

```
src/
├─ assets/
├─ components/
│  ├─ Navbar.jsx
│  ├─ Header.jsx
│  ├─ Footer.jsx
│  ├─ CardPizza.jsx
│  ├─ LoginPage.jsx
│  ├─ RegisterPage.jsx
│  ├─ Cart.jsx
│  └─ Pizza.jsx                # ← Hito 4 (detalle p001)
├─ context/
│  └─ CartContext.jsx
├─ services/
│  └─ api.js                   # ← Hito 4 (getPizzas/getPizzaById)
├─ utils/
│  └─ format.js                # clp() para CLP
├─ views/
│  └─ Home.jsx                 # ahora consume API (Hito 4)
├─ App.jsx                     # rutas (incluye /pizza)
└─ main.jsx
```

---

## ⚙️ Requisitos

- Node.js 18+ (recomendado)
- npm 9+  
*(Y para Hito 4 en local, ejecutar también el backend de apoyo)*

---

## 🧩 Instalación — Frontend

```bash
git clone https://github.com/magicux/pizzeria-mamma-mia.git
cd pizzeria-mamma-mia
npm install
```

### Variables de entorno (opción recomendada)
Crea un archivo `.env` en la raíz del frontend:

```
VITE_API_BASE=http://localhost:5000
```

El servicio `src/services/api.js` usa `import.meta.env.VITE_API_BASE` para construir las URLs.

---

## 🍕 Backend (Material de apoyo – API Pizzas)

1) Descomprime **“Material de apoyo – Backend Pizzas”** en una carpeta aparte (por ej. `backend-pizzas/`).  
2) En esa carpeta:

```bash
npm install
npm start
```

- Servirá en: `http://localhost:5000`  
- Endpoints usados por el frontend:
  - `GET /api/pizzas`  
  - `GET /api/pizzas/p001`

### Evitar CORS en desarrollo (dos opciones)

**A) Usar variable de entorno (recomendado):**  
Define `VITE_API_BASE=http://localhost:5000` y consume `fetch(${VITE_API_BASE}/api/...)` desde el frontend (ya implementado en `api.js`).

**B) Usar proxy de Vite (alternativa):**  
Si prefieres llamar a `/api/...` sin dominio en dev, agrega proxy en `vite.config.js`:

```js
// vite.config.js (fragmento)
export default defineConfig({
  base: "/pizzeria-mamma-mia/",
  plugins: [react()],
  server: {
    proxy: { "/api": "http://localhost:5000" }
  }
});
```

> **Nota:** En **GitHub Pages** el frontend es estático; para demo pública de Hito 4 necesitas hospedar la API o probar localmente.

---

## ▶️ Ejecutar en desarrollo

En una terminal (backend):
```bash
cd backend-pizzas
npm start
```

En otra terminal (frontend):
```bash
cd pizzeria-mamma-mia
npm run dev
```

- Frontend: `http://localhost:5173`  
- Backend: `http://localhost:5000`

---

## 🧭 Rutas principales

- `/` → **Home** (cards desde API).  
- `/login` y `/register` → formularios con validación.  
- `/cart` → carrito con Context.  
- `/pizza` → **página única Hito 4** (id fijo `p001`).  


---

## 💰 Conversión de moneda

Se utiliza **`clp()`** desde `src/utils/format.js` para mostrar precios en pesos chilenos de manera consistente en todas las vistas.

---

## 🧪 Cómo verificar llamadas a la API en Chrome

1. Abre la app y **DevTools** (`F12` / `Ctrl+Shift+I`).  
2. Pestaña **Network** → marca **Disable cache**.  
3. Filtra por `api` y **recarga**.  
4. Deberías ver `GET /api/pizzas` o `http://localhost:5000/api/pizzas`.  
   - **200**: OK.  
   - **(blocked:cors)**: usar proxy de Vite o habilitar CORS en backend.  
   - **ERR_CONNECTION_REFUSED**: backend apagado.  
5. Haz clic en la request → **Preview/Response** para ver el JSON.

---

## 📦 Scripts

- `dev` → servidor de desarrollo Vite.  
- `build` → build de producción.  
- `preview` → vista previa del build.  
- (opcional) `predeploy` / `deploy` → GitHub Pages con `gh-pages`.

---

## 🚀 Deploy en GitHub Pages

1) Instalar `gh-pages`:

```bash
npm i -D gh-pages
```

2) `vite.config.js`:

```js
export default defineConfig({
  base: "/pizzeria-mamma-mia/",
  plugins: [react()],
});
```

3) `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4) Publicar:

```bash
npm run deploy
```

> **Importante:** La versión publicada en GH Pages no podrá consumir tu API local. Usa la ejecución local para evaluar Hito 4.

---

## 🛠️ Tecnologías

- **React + Vite**
- **Bootstrap 5**
- **React Router DOM**
- **Context API**
- **API REST (Node + Express del material de apoyo)**
- **gh-pages** para deploy

---

## 👤 Autor

Proyecto realizado por **Daniel Aros** en el marco del Bootcamp **Desafío Latam**.

---

