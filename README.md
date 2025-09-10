🍕 Pizzería Mamma Mía

Proyecto desarrollado con React + Vite y Bootstrap como parte del Bootcamp Desafío Latam.
En este repositorio se implementan los Hitos 1, 2 y 3, aplicando componentes, estado, eventos, validaciones, enrutamiento y carrito con estado global.

El sitio quedará disponible en:
👉 https://magicux.github.io/pizzeria-mamma-mia/

📌 Hitos
✅ Hito 1

Configuración del proyecto con React + Vite.

Integración de Bootstrap para estilos.

Creación de componentes base:

Navbar (barra de navegación).

Header (banner/hero con imagen de fondo y texto central).

Footer (pie de página full-width).

CardPizza (componente reutilizable para pizzas).

Home (vista principal que renderiza cards de pizzas).

✅ Hito 2

Manejo de estado y eventos en React.

Creación de formularios con validaciones:

RegisterPage:

Campos: Email, Contraseña, Confirmar contraseña.

Validaciones: campos obligatorios, mínimo 6 caracteres, confirmación igual a contraseña.

LoginPage:

Campos: Email, Contraseña.

Validaciones: campos obligatorios, mínimo 6 caracteres.

Mensajes dinámicos de éxito/error en ambos formularios.

Navegación mediante React Router:

/ → Home

/login → LoginPage

/register → RegisterPage

Formularios centrados y adaptados al diseño del sitio (hero + cards).

Navbar y Footer full-width, coherentes en todas las páginas.

✅ Hito 3

Datos de pizzas centralizados en src/data/pizzas.js:

pizzas (catálogo de 6 pizzas).

pizzaCart (estado inicial del carrito).

El proyecto parte mostrando exactamente lo que haya en pizzaCart.

Carrito (/cart) con:

Listado de productos del carrito.

Botones + / − por ítem; si la cantidad llega a 0, el ítem se elimina.

Total calculado dinámicamente.

Botón “Pagar” (sin acción por ahora).

Estado global del carrito con Context API:

src/context/CartContext.jsx expone cart, inc, dec, add, total, count.

El Navbar muestra el total en CLP y se actualiza en tiempo real.

Formato de moneda local a través de utilitario clp (src/utils/format.js), usado de manera consistente en Navbar, CardPizza y Cart.

Navbar enlaza al carrito usando NavLink con las mismas clases Bootstrap (no se rompen estilos).

(UX opcional): Si el carrito queda vacío, se puede mostrar un catálogo para seguir comprando (no afecta los requisitos del hito).

## 🚀 Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/magicux/pizzeria-mamma-mia.git
Entrar a la carpeta del proyecto:

cd pizzeria-mamma-mia


Instalar dependencias:

npm install


Iniciar servidor de desarrollo:

npm run dev


Compilar para producción:

npm run build

📂 Estructura del proyecto

src/
├── assets/
│   └── imgs/
│       └── Header.jpg            # imagen del hero/banner
├── components/
│   ├── Navbar.jsx                # barra de navegación (link a /cart y total dinámico)
│   ├── Header.jsx                # hero/banner
│   ├── Footer.jsx                # pie de página
│   ├── CardPizza.jsx             # componente de tarjeta para pizzas (usa clp)
│   ├── LoginPage.jsx             # formulario de login (Hito 2)
│   ├── RegisterPage.jsx          # formulario de registro (Hito 2)
│   └── Cart.jsx                  # carrito (Hito 3) +/−, elimina en 0, total
├── context/
│   └── CartContext.jsx           # estado global del carrito (Hito 3)
├── data/
│   └── pizzas.js                 # data de pizzas + pizzaCart (estado inicial)
├── utils/
│   └── format.js                 # helper para formateo CLP (clp)
├── views/
│   └── Home.jsx                  # vista principal con header + cards (usa pizzas.js)
├── App.jsx                       # enrutamiento y layout principal (incluye /cart)
├── main.jsx                      # punto de entrada con ReactDOM
└── index.css                     # estilos globales (hero, auth, layout)


🔧 Detalles de implementación del Hito 3

Contexto del carrito
CartContext.jsx inicializa su estado con pizzaCart desde src/data/pizzas.js para partir mostrando esos ítems.
Expone:

inc(id): suma 1 a la cantidad.

dec(id): resta 1 y elimina el ítem si queda en 0.

add(id): agrega una pizza del catálogo si no existe en el carrito (o incrementa si ya existe).

total: suma de price * qty.

count: suma de cantidades (para badges si se quiere).

App.jsx
La app se envuelve con <CartProvider> y se agrega la ruta /cart:

<CartProvider>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/cart" element={<Cart />} />
  </Routes>
  <Footer />
</CartProvider>


Navbar.jsx
Se reemplaza el botón final por un NavLink a /cart, manteniendo las clases Bootstrap y el total en CLP con clp(total):

<NavLink to="/cart" className="btn btn-success">
  🛒 Total: ${clp(total)}
</NavLink>


Cart.jsx
Recorre cart desde el contexto, muestra + / − y elimina ítems con qty 0.
Muestra Total usando clp(total) y deja “Pagar” deshabilitable si está vacío.
(Opcional UX): si cart.length === 0, renderiza un catálogo con pizzas para seguir agregando.

Formateo CLP
Todo precio se muestra con clp(valor).
Si clp no añade el símbolo, se antepone $ (p. ej. ${clp(total)}).


🛠 Tecnologías utilizadas

React + Vite

Bootstrap

React Router DOM

JavaScript (ES6+)

🌐 Deploy en GitHub Pages

Instalar dependencia de deploy:

npm install gh-pages --save-dev


Configurar vite.config.js:

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/pizzeria-mamma-mia/",
  plugins: [react()],
});


Agregar scripts en package.json:

"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}


Ejecutar:

npm run deploy


👨‍💻 Autor

Proyecto realizado por Daniel Aros en el marco del Bootcamp Desafío Latam.

