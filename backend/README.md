# MillionProperty Backend API

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Arquitectura](#arquitectura)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Endpoints de la API](#endpoints-de-la-api)
- [Modelos de Datos](#modelos-de-datos)
- [Validaciones](#validaciones)
- [Pruebas Unitarias](#pruebas-unitarias)

---

## Descripción General

**MillionProperty** es una API RESTful desarrollada en **.NET 8** que gestiona información de propiedades inmobiliarias de lujo. La aplicación permite consultar propiedades con filtros avanzados, obtener detalles completos incluyendo información del propietario, imágenes y trazabilidad de ventas.

El backend está construido siguiendo los principios de **Arquitectura Limpia** y utiliza **MongoDB** como base de datos NoSQL para un almacenamiento flexible y escalable.

---

## Arquitectura

El proyecto implementa **Clean Architecture** con las siguientes capas:

```
┌─────────────────────────────────────────┐
│         API Layer (Presentation)        │
│  - Controllers                          │
│  - Middleware                           │
│  - Response Models                      │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      Application Layer (Business)       │
│  - DTOs                                 │
│  - Query Handlers (CQRS)                │
│  - Validators                           │
│  - Mapping Profiles                     │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Domain Layer (Core)             │
│  - Entities                             │
│  - Interfaces                           │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│    Infrastructure Layer (Data Access)   │
│  - Repositories                         │
│  - MongoDB Configuration                │
│  - Data Seeding                         │
└─────────────────────────────────────────┘
```

### Patrones Implementados

- **CQRS (Command Query Responsibility Segregation)**: Separación de operaciones de lectura mediante MediatR
- **Repository Pattern**: Abstracción del acceso a datos
- **Dependency Injection**: Inyección de dependencias nativa de .NET
- **DTO Pattern**: Transferencia de datos desacoplada de las entidades de dominio
- **Global Exception Handling**: Middleware centralizado para manejo de excepciones

---

## 🛠️ Tecnologías Utilizadas

| Tecnología       | Versión | Propósito              |
| ---------------- | ------- | ---------------------- |
| .NET             | 8.0     | Framework principal    |
| MongoDB          | 3.5.0   | Base de datos NoSQL    |
| MediatR          | 13.0.0  | Implementación de CQRS |
| AutoMapper       | 12.0.1  | Mapeo objeto-objeto    |
| FluentValidation | 11.3.1  | Validación de modelos  |
| Swagger/OpenAPI  | 8.0.21  | Documentación de API   |
| NUnit            | 3.13.3  | Framework de pruebas   |
| Moq              | 4.20.72 | Mocking para pruebas   |
| Docker           | -       | Contenedorización      |

---

## Estructura del Proyecto

```
backend/
├── MillionProperty.API/                  # Capa de presentación
│   ├── Controllers/                      # Controladores REST
│   ├── Middleware/                       # Middleware personalizado
│   ├── Responses/                        # Modelos de respuesta
│   └── Program.cs                        # Configuración de la aplicación
│
├── MillionProperty.Application/          # Capa de aplicación
│   ├── DTOs/                            # Data Transfer Objects
│   ├── Features/                        # Características organizadas por dominio
│   │   └── Properties/
│   │       ├── Queries/                 # Consultas CQRS
│   │       └── Validators/              # Validadores FluentValidation
│   └── Mappings/                        # Perfiles de AutoMapper
│
├── MillionProperty.Domain/               # Capa de dominio
│   ├── Entities/                        # Entidades de negocio
│   └── Interfaces/                      # Contratos de repositorios
│
├── MillionProperty.Infrastructure/       # Capa de infraestructura
│   ├── Data/                            # Configuración de MongoDB
│   └── Repositories/                    # Implementación de repositorios
│
└── MillionProperty.Tests.Unit/          # Pruebas unitarias
    ├── API/                             # Pruebas de controladores
    └── Application/                     # Pruebas de handlers y validadores
```

---

## Requisitos Previos

- **.NET SDK 8.0** o superior
- **Docker** y **Docker Compose** (para desarrollo con contenedores)
- **IDE recomendado**: VS Code

### 5. Acceder a la Documentación Swagger

Una vez iniciada la aplicación, accede a:

```
http://localhost:8080/swagger (Docker)
```

---

## Endpoints de la API

### 1. Obtener Listado de Propiedades (con Filtros y Paginación)

**Endpoint:** `GET /api/properties`

**Parámetros de Query (Opcionales):**

| Parámetro         | Tipo    | Descripción                             | Ejemplo    |
| ----------------- | ------- | --------------------------------------- | ---------- |
| `name`            | string  | Filtrar por nombre (búsqueda parcial)   | `Villa`    |
| `address`         | string  | Filtrar por dirección                   | `New York` |
| `minPrice`        | decimal | Precio mínimo                           | `200000`   |
| `maxPrice`        | decimal | Precio máximo                           | `1000000`  |
| `bedrooms`        | int     | Número mínimo de habitaciones           | `3`        |
| `bathrooms`       | int     | Número mínimo de baños                  | `2`        |
| `minYear`         | int     | Año mínimo de construcción              | `2000`     |
| `minSquareMeters` | double  | Metros cuadrados mínimos                | `100`      |
| `pageNumber`      | int     | Número de página (default: 1)           | `1`        |
| `pageSize`        | int     | Tamaño de página (default: 10, max: 50) | `10`       |

**Ejemplo de Request:**

```http
GET /api/properties?name=Villa&minPrice=500000&bedrooms=3&pageNumber=1&pageSize=10
```

**Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "Properties retrieved successfully.",
  "content": {
    "currentPage": 1,
    "pageSize": 10,
    "totalCount": 45,
    "totalPages": 5,
    "hasPreviousPage": false,
    "hasNextPage": true,
    "items": [
      {
        "idProperty": "60c72b2f9b1e8a3a9c8b4567",
        "name": "Villa frente al mar en Sydney",
        "address": "789 Ocean Drive, Sydney, Australia",
        "price": 2500000,
        "imageUrl": "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
        "bedrooms": 4,
        "bathrooms": 3,
        "squareMeters": 350.5,
        "owner": {
          "name": "Robert Smith",
          "photo": "https://i.pravatar.cc/150?u=robert"
        }
      }
    ]
  }
}
```

---

### 2. Obtener Detalles de una Propiedad

**Endpoint:** `GET /api/properties/{id}`

**Parámetros de Ruta:**

| Parámetro | Tipo   | Descripción                              |
| --------- | ------ | ---------------------------------------- |
| `id`      | string | ID de la propiedad (ObjectId de MongoDB) |

**Ejemplo de Request:**

```http
GET /api/properties/60c72b2f9b1e8a3a9c8b4567
```

**Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "Property details retrieved successfully.",
  "content": {
    "idProperty": "60c72b2f9b1e8a3a9c8b4567",
    "name": "Villa frente al mar en Sydney",
    "address": "789 Ocean Drive, Sydney, Australia",
    "price": 2500000,
    "codeInternal": "SY042",
    "year": 2015,
    "description": "Descubre esta impresionante Villa frente al mar ubicada en el corazón de Sydney...",
    "bedrooms": 4,
    "bathrooms": 3,
    "squareMeters": 350.5,
    "owner": {
      "idOwner": "60c72b2f9b1e8a3a9c8b4568",
      "name": "Robert Smith",
      "address": "789 Pine Street, London",
      "photo": "https://i.pravatar.cc/150?u=robert"
    },
    "imageUrls": [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg"
    ],
    "traces": [
      {
        "dateSale": "2015-03-15T00:00:00Z",
        "name": "Venta Inicial",
        "value": 1800000,
        "tax": 90000
      },
      {
        "dateSale": "2018-07-22T00:00:00Z",
        "name": "Reventa 1",
        "value": 2200000,
        "tax": 110000
      }
    ]
  }
}
```

**Respuesta de Error (404 Not Found):**

```json
{
  "success": false,
  "message": "Property not found.",
  "content": null
}
```

**Respuesta de Error (400 Bad Request):**

```json
{
  "success": false,
  "message": "Invalid property ID format.",
  "content": null
}
```

## Validaciones

El proyecto utiliza **FluentValidation** para validar las peticiones entrantes.

### Validaciones de GetFilteredPropertiesQuery

| Campo             | Validación                          | Mensaje de Error                                      |
| ----------------- | ----------------------------------- | ----------------------------------------------------- |
| `minPrice`        | Debe ser menor o igual a `maxPrice` | "Minimum price cannot be greater than maximum price." |
| `name`            | Máximo 50 caracteres                | "Name filter cannot exceed 50 characters."            |
| `bedrooms`        | Mayor o igual a 0                   | "Bedrooms filter cannot be negative."                 |
| `bathrooms`       | Mayor o igual a 0                   | "Bathrooms filter cannot be negative."                |
| `minYear`         | Menor o igual al año actual         | "Minimum year cannot be greater than current year."   |
| `minSquareMeters` | Mayor o igual a 0                   | "Minimum square meters cannot be negative."           |

---

## Pruebas Unitarias

El proyecto incluye pruebas unitarias exhaustivas usando **NUnit** y **Moq**.

### Ejecutar las Pruebas

```bash
# Ejecutar todas las pruebas
dotnet test

# Ejecutar con cobertura
dotnet test --collect:"XPlat Code Coverage"
```

### Cobertura de Pruebas

- **Controllers**: Pruebas de respuestas HTTP y validación de IDs
- **Query Handlers**: Pruebas de lógica de negocio y escenarios edge case
- **Validators**: Pruebas de reglas de validación
- **Repositorios**: Mocks para aislamiento de dependencias

---

## Seeding de Datos

En entorno de desarrollo, la aplicación genera automáticamente **100 propiedades de ejemplo** con:

- 5 propietarios diferentes
- Múltiples imágenes de alta calidad (Pexels)
- Historial de trazabilidad de ventas
- Datos realistas de 13 ciudades globales

El seeding se ejecuta automáticamente al iniciar la aplicación en modo Development.

---

## Licencia

Este proyecto es privado y confidencial.

---
