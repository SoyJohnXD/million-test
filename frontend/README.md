# Million Test - Frontend

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Características Principales](#características-principales)
- [Patrones de Diseño](#patrones-de-diseño)
- [Testing](#testing)

---

## Descripción General

**Million Test** es una aplicación web moderna para la búsqueda y visualización de propiedades inmobiliarias. El frontend está construido con Next.js 15 utilizando React 19, ofreciendo una experiencia de usuario fluida con renderizado del lado del servidor (SSR) y generación estática de sitios (SSG).

### Características Destacadas

- **Interfaz Moderna**: Diseño responsive con Tailwind CSS 4
- **Búsqueda Avanzada**: Filtros múltiples por precio, ubicación, habitaciones, etc.
- **Búsqueda Geográfica**: Integración con Nominatim para búsqueda por ciudad
- **Tema Claro/Oscuro**: Sistema de temas con persistencia en localStorage
- **Accesibilidad**: Cumplimiento de estándares WCAG
- **Rendimiento Optimizado**: Lazy loading, infinite scroll y optimización de imágenes
- **Cobertura de Testing**: Tests unitarios con Jest y Testing Library

---

## Tecnologías Utilizadas

### Core

- **Next.js 15.5.6** - Framework React con SSR/SSG
- **React 19.1.0** - Biblioteca de interfaz de usuario
- **TypeScript 5.x** - Tipado estático
- **Tailwind CSS 4.x** - Framework de utilidades CSS

### Herramientas de Desarrollo

- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Jest** - Framework de testing
- **Testing Library** - Testing de componentes React

### Librerías Principales

- **@heroicons/react** - Iconos SVG
- **react-intersection-observer** - Detección de elementos en viewport (infinite scroll)
- **next/image** - Optimización de imágenes

---

## Arquitectura del Proyecto

El proyecto sigue una arquitectura basada en **Feature-Sliced Design** adaptada, organizando el código por características y capas:

```
src/
├── app/                    # App Router de Next.js (Pages & Layouts)
├── features/               # Características de negocio
│   └── properties/
│       ├── list/          # Listado de propiedades
│       └── detail/        # Detalle de propiedad
├── entities/              # Entidades de dominio (tipos/modelos)
├── shared/                # Código compartido
│   ├── ui/               # Componentes UI reutilizables
│   ├── hooks/            # Custom hooks
│   └── utils/            # Utilidades
├── services/             # Servicios de API
└── context/              # Contextos de React
```

### Principios Arquitectónicos

1. **Separación de Responsabilidades**: Cada capa tiene un propósito claro
2. **Reutilización**: Componentes y lógica compartida en `/shared`
3. **Tipado Fuerte**: TypeScript en todo el proyecto
4. **Composición**: Componentes pequeños y componibles
5. **Server-First**: Aprovechamiento de Server Components de Next.js

---

## Características Principales

### 1. Sistema de Filtros Avanzado

Implementación de filtros dinámicos con sincronización de URL:

- **Precio**: Rango mínimo y máximo
- **Ubicación**: Búsqueda por ciudad con autocompletado
- **Características**: Habitaciones, baños, área, año
- **Quick Filters**: Botones de acceso rápido con popovers
- **URL Sync**: Los filtros se reflejan en la URL para compartir búsquedas

```typescript
// Ejemplo de uso del hook de filtros
const { filters, updateFilter, clearFilter } = useFilterParams();

updateFilter('price', { min: 100000, max: 500000 });
```

### 2. Búsqueda Geográfica

Integración con API de Nominatim (OpenStreetMap):

- Autocompletado de ciudades
- Debounce para optimizar peticiones
- Resultados filtrados por tipo de ubicación
- Modal de búsqueda responsive

### 3. Infinite Scroll

Carga progresiva de propiedades usando Intersection Observer:

- Sin botón "cargar más"
- Experiencia fluida
- Optimización de rendimiento
- Manejo de estados de carga y error

### 4. Sistema de Temas

Implementación de tema claro/oscuro:

- Persistencia en localStorage
- Cambio sin parpadeo (flash prevention)
- Variables CSS personalizadas
- Soporte de preferencia del sistema

### 5. Optimización de Imágenes

- **next/image** para lazy loading automático
- Múltiples tamaños según dispositivo
- Placeholder blur mientras carga
- Formato WebP cuando disponible

---

## Patrones de Diseño

### 1. Custom Hooks

Encapsulación de lógica reutilizable:

```typescript
// useFilterParams.ts
export function useFilterParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key, value) => {
      // Lógica de actualización
    },
    [router, searchParams]
  );

  return { filters, updateFilter, clearFilter };
}
```

### 4. Server Components + Client Components

Separación clara entre renderizado servidor/cliente:

```typescript
// Server Component (por defecto)
export default async function PropertiesPage() {
  const properties = await getProperties();
  return <PropertyList properties={properties} />;
}

// Client Component (explícito)
'use client';
export function FilterButton() {
  const [isOpen, setIsOpen] = useState(false);
  return <button onClick={() => setIsOpen(!isOpen)}>...</button>;
}
```

---

## Testing

### Estrategia de Testing

- **Unit Tests**: Componentes individuales y hooks

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Watch mode
npm run test:watch

# Con cobertura
npm run test:coverage
```

#### Nomenclatura

```typescript
// Componentes: PascalCase
export function PropertyCard() {}

// Hooks: camelCase con prefijo 'use'
export function useFilterParams() {}

// Utilidades: camelCase
export function formatCurrency() {}

// Constantes: UPPER_SNAKE_CASE
export const DEFAULT_PAGE_SIZE = 15;

// Tipos/Interfaces: PascalCase
export interface PropertyListItem {}
```

#### Estructura de Componentes

```typescript
'use client'; // Solo si es Client Component

import { useState, useEffect } from 'react';
import { ComponentProps } from './types';

// Props interface
interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

// Component
export function MyComponent({ title, onAction }: MyComponentProps) {
  const [state, setState] = useState(false);

  useEffect(() => {
    // Side effects
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onAction}>Action</button>
    </div>
  );
}
```

### Optimización de Rendimiento

```typescript
// React.memo para componentes puros
export const PropertyCard = memo(function PropertyCard({ property }) {
  return <div>{property.name}</div>;
});

// useCallback para funciones que se pasan como props
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);

// useMemo para cálculos costosos
const expensiveValue = useMemo(() => {
  return heavyComputation(data);
}, [data]);
```

---

## 📄 Licencia

Este proyecto es privado y confidencial.

---
