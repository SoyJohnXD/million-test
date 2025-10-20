# Análisis Técnico del Código - Next.js 15

Fecha: 19 de octubre de 2025

Este documento lista los problemas detectados en el frontend (Next.js 15), organizados por severidad, con checklist para seguimiento. Cada ítem incluye el archivo afectado y una breve justificación.

## 🔴 Problemas Críticos

1. [ ] Uso de localStorage en Componente de Servidor

   - Archivo: `frontend/src/context/ThemeContext.tsx`
   - Código:
     ```ts
     const [theme, setTheme] = useState<Theme>(() => {
       if (typeof window !== "undefined") {
         const storedTheme = localStorage.getItem("theme") as Theme | null;
         return storedTheme || "light";
       }
       return "light";
     });
     ```
   - Problema: Causa hydration mismatch entre SSR y cliente.

2. [ X] Client Component innecesario como página principal

   - Archivo: `frontend/src/app/(properties)/page.tsx`
   - Código: `'use client';`
   - Problema: Toda la página es cliente; debería ser Server Component. Afecta SSR/SEO y rendimiento.

3. [X ] Fetching de datos en cliente con useEffect

   - Archivo: `frontend/src/app/(properties)/page.tsx`
   - Líneas: 38–89 (aprox.)
   - Problema: Viola paradigma RSC, sin SSR inicial, SEO pobre, waterfall de requests, loading states innecesarios.

4. [X ] Prop drilling de `setTemporaryValue` vacío

   - Archivo: `frontend/src/features/properties/components/quick_filters/QuickFiltersBar.tsx`
   - Código: `setTemporaryValue={() => {}}`
   - Problema: Función sin efecto; diseño defectuoso. `FilterPopover` debe manejar estado temporal internamente.

5. [ X] Mutación de props con `React.cloneElement`
   - Archivo: `frontend/src/features/properties/components/quick_filters/FilterPopover.tsx`
   - Código: inyección de props a hijos vía `cloneElement`
   - Problema: Rompe unidireccionalidad, complica types y mantenimiento.

## 🟠 Problemas de Rendimiento

6. [x] Re-renders por dependencias innecesarias

   - Archivo: `frontend/src/hooks/useFilterParams.ts`
   - Código: `useMemo(..., [searchParams])`
   - Problema: `searchParams` cambia en cada navegación; dispara renders aunque filtros no cambien.

7. [X ] Portal rendering innecesario

   - Archivo: `frontend/src/features/properties/components/quick_filters/FilterPopover.tsx`
   - Código: `createPortal(..., document.body)` condicionado por `mounted && isOpen`
   - Problema: Posicionamiento podría ser relativo; efectos de layout y recálculos en resize; falta de CSS containment.

8. [ X] Falta de memoización en listas

   - Archivo: `frontend/src/features/properties/components/PropertyList.tsx`
   - Problema: `PropertyCard` no está memoizado; rerenders de todas las cards.

9. [ X] Optimización de imágenes incorrecta
   - Archivo: `frontend/src/utils/image.ts`
   - Problema: Agrega query params arbitrarios; no usa `next/image` adecuadamente; no valida CDN compatibles.

## 🟡 Violaciones de Principios SOLID

10. [ ] SRP: Componente hace demasiadas cosas

    - Archivo: `frontend/src/app/(properties)/page.tsx`
    - Problema: Estado de paginación, fetching, loading, errores, parsing, infinite scroll y UI en un solo lugar.

11. [ ] OCP: Botón poco extensible

    - Archivo: `frontend/src/components/ui/Button.tsx`
    - Problema: Agregar variantes requiere editar el componente; considerar `class-variance-authority` o clases externas.

12. [ ] DIP: Servicio acoplado a `fetchApi`
    - Archivo: `frontend/src/services/properties.ts`
    - Problema: Depende de implementación concreta; sin interfaz para intercambiar transporte.

## 🟢 Code Smells y Anti-Patterns

13. [ ] TODOs en producción

    - Archivos: `frontend/src/services/api.ts`, `frontend/src/services/properties.ts`
    - Problema: Tareas incompletas; migrar a issues o resolver.

14. [X ] Magic numbers hardcoded

    - Archivo: `frontend/src/app/(properties)/page.tsx`
    - Código: `const PAGE_SIZE = 15;`
    - Problema: Debe centralizarse en configuración.

15. [ ] Manejo de errores inconsistente

    - Archivo: `frontend/src/services/api.ts`
    - Código: `catch {}` vacío al parsear JSON
    - Problema: Silencia errores; dificulta diagnóstico.

16. [ X] Type assertions inseguros

    - Archivo: `frontend/src/services/location.ts`
    - Código: `const data: any[] = await response.json();`
    - Problema: Pierde type safety; definir interfaces/DTOs.

17. [X ] CSS utilities duplicados

    - Archivo: `frontend/src/app/globals.css`
    - Problema: Reglas duplicadas para `body`; riesgo de conflicto.

18. [ X] Lógica de negocio en UI y duplicada

    - Archivo: `frontend/src/features/properties/components/quick_filters/QuickFiltersBar.tsx`
    - Problema: `formatShortPrice` duplicada (existe en `utils/text.ts`).

19. [ X] Keys inseguras en listas

    - Archivo: `frontend/src/features/properties/components/location_filter/LocationSearchModal.tsx`
    - Código: `key={'location-' + index}`
    - Problema: El índice no es estable; usar identificador único.

20. [ X] Código muerto
    - Archivo: `frontend/src/features/property_detail/OwnerCard.tsx`
    - Problema: `handleSubmit` solo hace `console.log`.

## 🔵 Problemas de Arquitectura

21. [X ] Services con responsabilidades mezcladas

    - Archivo: `frontend/src/services/properties.ts`
    - Problema: Parámetros + query string + HTTP + errores en un mismo módulo.

22. [X ] Tipos acoplados entre dominios

    - Archivo: `frontend/src/types/property.ts`
    - Problema: Depende de `Owner*`; proponer DTOs específicos por caso de uso.

23. [ ] Falta de validación de datos

    - Archivos: Todos los servicios
    - Problema: No se valida la respuesta; considerar `zod` en runtime.

24. [ ] Estado global innecesario (ThemeContext)

    - Archivo: `frontend/src/context/ThemeContext.tsx`
    - Problema: Podría resolverse con CSS variables + script en `<head>` sin React Context.

25. [x] Sin estrategia de cache
    - Archivo: `frontend/src/services/properties.ts`
    - Problema: No se usa caching de Next.js 15 (revalidación, `cache`, `revalidatePath`).
    - Solución: Se aplica caching estándar de Next.js 15 usando `fetch` con `{ next: { revalidate: 60 } }` y exportando `revalidate = 60` en la página SSR. No se usan tags ni helpers adicionales ya que solo hay GET en la demo.

---

## 📊 Resumen Priorizado

- Crítico (arreglar ya)

  - [ ] Cambiar páginas a Server Components
  - [ ] Mover fetching a servidor
  - [ ] Arreglar hydration mismatch en `ThemeContext`
  - [ ] Eliminar prop drilling con funciones vacías

- Alto (próxima iteración)

  - [ ] Memoizar `PropertyCard`
  - [ ] Validación de datos con Zod
  - [ ] Centralizar configuración
  - [ ] Arreglar optimización de imágenes

- Medio (refactor gradual)

  - [ ] Separar responsabilidades en componentes grandes
  - [ ] Abstracciones para services
  - [ ] Eliminar código duplicado

- Bajo (calidad de código)
  - [ ] Resolver TODOs
  - [ ] Mejorar manejo de errores
  - [ ] Usar tipos estrictos (eliminar `any`)

---

## ✅ Criterios de Hecho (DoD)

- Cada problema resuelto debe incluir:
  - PR con descripción del cambio y referencia a este documento.
  - Pruebas (unitarias/integración) cuando aplique.
  - Chequeo de rendimiento/tiempo de carga si afecta UX.
  - Actualización de docs si cambia API/props/contratos.
