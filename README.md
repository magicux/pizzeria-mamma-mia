# 🍕 Pizzería Mamma Mía

Proyecto desarrollado con **React + Vite** y **Bootstrap** como parte del Bootcamp **Desafío Latam**.  
En este repositorio se implementan los **Hitos 1 y 2**, aplicando componentes, estado, eventos, validaciones y enrutamiento.


El sitio quedará disponible en:
👉 https://magicux.github.io/pizzeria-mamma-mia/


---

## 📌 Hitos

### ✅ Hito 1
- Configuración del proyecto con **React + Vite**.
- Integración de **Bootstrap** para estilos.
- Creación de componentes base:
  - `Navbar` (barra de navegación).
  - `Header` (banner/hero con imagen de fondo y texto central).
  - `Footer` (pie de página full-width).
  - `CardPizza` (componente reutilizable para pizzas).
  - `Home` (vista principal que renderiza cards de pizzas).

### ✅ Hito 2
- Manejo de **estado** y **eventos** en React.
- Creación de formularios con validaciones:
  - `RegisterPage`:
    - Campos: Email, Contraseña, Confirmar contraseña.
    - Validaciones: campos obligatorios, mínimo 6 caracteres, confirmación igual a contraseña.
  - `LoginPage`:
    - Campos: Email, Contraseña.
    - Validaciones: campos obligatorios, mínimo 6 caracteres.
- Mensajes dinámicos de éxito/error en ambos formularios.
- Navegación mediante **React Router**:
  - `/` → Home
  - `/login` → LoginPage
  - `/register` → RegisterPage
- Formularios centrados y adaptados al diseño del sitio (hero + cards).
- Navbar y Footer full-width, coherentes en todas las páginas.

---

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
│       └── Header.jpg       # imagen del hero/banner
├── components/
│   ├── Navbar.jsx           # barra de navegación
│   ├── Header.jsx           # hero/banner
│   ├── Footer.jsx           # pie de página
│   ├── CardPizza.jsx        # componente reutilizable de pizzas
│   ├── LoginPage.jsx        # formulario de login (Hito 2)
│   └── RegisterPage.jsx     # formulario de registro (Hito 2)
├── data/
│   └── pizzas.js            # data de pizzas (opcional)
├── views/
│   └── Home.jsx             # vista principal con header + cards
├── utils/
│   └── format.js            # helper para formateo de CLP
├── App.jsx                  # enrutamiento y layout principal
├── main.jsx                 # punto de entrada con ReactDOM
└── index.css                # estilos globales (hero, auth, layout)
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

