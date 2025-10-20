# 🏠 Million Property - Sistema de Gestión de Propiedades

Sistema completo de gestión de propiedades inmobiliarias con backend en .NET 8 y frontend en Next.js 15.

## 🚀 Inicio Rápido

### Prerrequisitos

- Docker Desktop instalado
- 8GB RAM disponible (mínimo)
- Puertos 3000, 8080 y 27017 disponibles

### Desarrollo

```bash
# Levantar servicios
docker-compose up --build
```

¡Listo! La aplicación estará disponible en:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Swagger**: http://localhost:8080/swagger

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────┐
│           FRONTEND (Next.js 15)         │
│    - React Server Components            │
│    - TypeScript                         │
│    - Tailwind CSS                       │
│    - Puerto: 3000                       │
└──────────────┬──────────────────────────┘
               │
               │ REST API
               │ http://localhost:8080/api
               ↓
┌─────────────────────────────────────────┐
│         BACKEND (.NET 8 API)            │
│    - Clean Architecture                 │
│    - CQRS + MediatR                     │
│    - FluentValidation                   │
│    - AutoMapper                         │
│    - Puerto: 8080                       │
└──────────────┬──────────────────────────┘
               │
               │ MongoDB Driver
               │ mongodb://mongo:27017
               ↓
┌─────────────────────────────────────────┐
│           DATABASE (MongoDB)            │
│    - Colecciones: Properties, Owners    │
│    - Datos de prueba incluidos          │
│    - Puerto: 27017                      │
└─────────────────────────────────────────┘
```

## 📁 Estructura del Proyecto

```
million-test/
├── backend/                    # API .NET 8
│   ├── MillionProperty.API/           # Capa de presentación
│   ├── MillionProperty.Application/   # Lógica de aplicación (CQRS)
│   ├── MillionProperty.Domain/        # Entidades y contratos
│   ├── MillionProperty.Infrastructure/# Repositorios y data
│   └── MillionProperty.Tests.Unit/    # Tests unitarios
│
├── frontend/                   # App Next.js 15
│   ├── src/
│   │   ├── app/               # App Router
│   │   ├── components/        # Componentes reutilizables
│   │   ├── features/          # Componentes por feature
│   │   ├── services/          # API client
│   │   └── types/             # TypeScript types
│   └── public/                # Assets estáticos
│
├── docs/                       # Documentación
│
├── .env                        # Variables de entorno
└── docker-compose.yml          # Configuración de Docker
```

## 🔧 Variables de Entorno

El archivo `.env` contiene la configuración necesaria para el desarrollo:

| Variable                    | Valor                     | Descripción                     |
| --------------------------- | ------------------------- | ------------------------------- |
| `ASPNETCORE_ENVIRONMENT`    | Development               | Entorno del backend             |
| `MONGODB_CONNECTION_STRING` | mongodb://mongo:27017     | Conexión a MongoDB              |
| `NEXT_PUBLIC_API_BASE_URL`  | http://localhost:8080/api | URL de la API (desde navegador) |
| `CORS_ALLOWED_ORIGINS`      | http://localhost:3000     | Orígenes permitidos             |

⚠️ **IMPORTANTE**: `NEXT_PUBLIC_API_BASE_URL` debe usar `localhost` (NO el nombre del contenedor `backend`) porque se ejecuta en el navegador.

## 🛠️ Tecnologías

### Backend

- **.NET 8** - Framework principal
- **MongoDB.Driver** - Base de datos NoSQL
- **MediatR** - Patrón CQRS
- **AutoMapper** - Mapeo de objetos
- **FluentValidation** - Validaciones
- **Swagger/OpenAPI** - Documentación API

### Frontend

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Heroicons** - Iconos
- **React Hook Form** - Formularios

### DevOps

- **Docker** - Containerización
- **Docker Compose** - Orquestación
- **MongoDB** - Base de datos

## 📊 Endpoints Principales

### Properties

- `GET /api/properties` - Listar propiedades (con filtros y paginación)
- `GET /api/properties/{id}` - Detalle de propiedad
- `POST /api/properties` - Crear propiedad
- `PUT /api/properties/{id}` - Actualizar propiedad
- `PATCH /api/properties/{id}/price` - Cambiar precio

### Documentation

- `GET /swagger` - Documentación interactiva de la API

## 🐛 Troubleshooting

### CORS Error

```
Access to fetch has been blocked by CORS policy
```

**Solución:**

1. Verifica `CORS_ALLOWED_ORIGINS=http://localhost:3000` en `.env`
2. Reinicia: `docker-compose restart backend`

### Cannot Connect to API

```
Failed to fetch http://localhost:8080/api/properties
```

**Solución:**

1. Verifica que el backend esté corriendo: `docker ps`
2. Confirma `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api` en `.env`

### MongoDB Connection Error

**Solución:**

1. Verifica que MongoDB esté corriendo: `docker ps | findstr mongo`
2. Reinicia los servicios: `docker-compose restart`

## 📦 Comandos Útiles

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Solo frontend
docker-compose logs -f frontend

# Reconstruir sin caché
docker-compose build --no-cache

# Detener todo
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Ver estado
docker-compose ps
```

## 🧪 Testing

```bash
# Tests del backend
cd backend
dotnet test
```

## 👤 Autor

**SoyJohnXD**

---

**Última actualización:** 20 de octubre de 2025
