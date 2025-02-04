# 🛍️ Simple CRUD for products

[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
[![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff)](#)

API segura para gestión de productos y autenticación de usuarios, construida para el bootcamp de Thryve.

## ✨ Características Principales

- **Autenticación JWT** con refresh tokens
- **CRUD completo de productos** con validaciones
- HTTPS integrado con certificados autofirmados
- Sistema de logging mediante decoradores
- Validación de datos con express-validator
- Configuración CORS para aplicaciones frontend
- Manejo centralizado de errores
- Tipado estricto con TypeScript

## 🚀 Instalación

1. Clonar repositorio:
```bash
git clone https://github.com/glass-source/lab3.git
cd lab3
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
  3.1 Backend:
  ```env
  MONGO_URI=mongodb://localhost:27017/secure-api
  JWT_SECRET=supersecretkey
  BASE_URL=http://localhost:8080 
  ```

4. Generar certificados SSL:
```bash
cd backend
openssl req -x509 -newkey rsa:4096 -keyout cert/key.pem -out cert/cert.pem -days 365 -nodes
```

5. Iniciar servidor:
  5.1 Backend:
  ```bash
  cd backend
  npm run dev
  ```
  Para buildear y comenzar:
  ```bash
  npm run start
  ```

  5.2 Frontend:
  ```bash
  cd frontend
  ./start.sh
  ```

## 📚 Documentación de la API

### Autenticación
| Método | Endpoint         | Descripción                | Autenticación     |
|--------|------------------|----------------------------|-------------------|
| POST   | /auth/register   | Registro de nuevos usuarios| Público           |
| POST   | /auth/login      | Inicio de sesión           | Público           |
| GET    | /users/me        | Acceso al dashboard        | Requerida         |

### Productos
| Método | Endpoint     | Descripción                | Autenticación     |
|--------|--------------|----------------------------|-------------------|
| GET    | /products    | Obtener todos los productos| Público           |
| POST   | /products    | Crear nuevo producto       | Requerida         |
| PUT    | /products/:id| Actualizar producto        | Requerida         |
| DELETE | /products/:id| Eliminar producto          | Requerida         |

## 🔍 Ejemplos de Uso

Registro de usuario:
```bash
curl -X POST https://localhost:443/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "user123", "password": "SecurePass123!"}'
```

Crear producto:
```bash
curl -X POST https://localhost:443/products \
  -H "auth-token: <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Teclado Mecánico", "descripcion": "Teclado gaming RGB", "precio": 89.99}'
```

## 🛠️ Estructura del Proyecto
```bash
backend/
├── src/
│ ├── controllers/ # Lógica de los endpoints de la API
│ ├── database/ # Configuración y conexión a la base de datos
│ ├── decorators/ # Decoradores para logging y otras funcionalidades
│ ├── factories/ # Patrones de diseño Factory para creación de objetos
│ ├── middleware/ # Middlewares para autenticación, validación y manejo de errores
│ ├── models/ # Esquemas y modelos de MongoDB
│ └── routes/ # Configuración de las rutas de la API
├── .env.example # Plantilla de variables de entorno
├── package.json # Dependencias y scripts del proyecto
└── tsconfig.json # Configuración de TypeScript
```
