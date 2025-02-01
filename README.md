# 🛍️ Typescript API REST

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)](https://www.mongodb.com/)

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
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```env
MONGO_URI=mongodb://localhost:27017/secure-api
JWT_SECRET=supersecretkey
```

4. Generar certificados SSL:
```bash
openssl req -x509 -newkey rsa:4096 -keyout cert/key.pem -out cert/cert.pem -days 365 -nodes
```

5. Iniciar servidor:
```bash
npm run dev
```

## 📚 Documentación de la API

### Autenticación
| Método | Endpoint         | Descripción                |
|--------|------------------|----------------------------|
| POST   | /auth/register   | Registro de nuevos usuarios |
| POST   | /auth/login      | Inicio de sesión           |

### Productos
| Método | Endpoint         | Descripción                | Autenticación |
|--------|------------------|----------------------------|---------------|
| GET    | /products    | Obtener todos los productos| Público           |
| POST   | /products    | Crear nuevo producto       | Requerida         |
| PUT    | /products/:id| Actualizar producto        | Requerida         |
| DELETE | /products/:id| Eliminar producto          | Requerida         |

## 🔍 Ejemplos de Uso

Registro de usuario:
```bash
curl -X POST https://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "user123", "password": "SecurePass123!"}'
```

Crear producto:
```bash
curl -X POST https://localhost:3000/api/products \
  -H "auth-token: <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Teclado Mecánico", "descripcion": "Teclado gaming RGB", "precio": 89.99}'
```

## 🛠️ Estructura del Proyecto
```bash
lab3/
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