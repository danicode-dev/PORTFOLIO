# Plan de implementación para Codex

## Fase 0 - Auditoría

1. Leer documentación.
2. Inventariar archivos adjuntos.
3. Resolver nombres y rutas.
4. Confirmar que no quedan bloqueos de `pending.md`.
5. No programar si faltan activos esenciales o datos públicos definitivos.

## Fase 1 - Inicialización

1. Crear proyecto Astro con el CLI oficial vigente.
2. Activar TypeScript estricto.
3. Añadir Tailwind CSS 4 con el método oficial vigente.
4. Añadir Prettier y plugin Astro.
5. Añadir `@astrojs/check`/dependencias necesarias para `astro check` según el CLI vigente.
6. Crear scripts de validación.
7. Ejecutar check y build inicial.

## Fase 2 - Base y datos

1. Crear estructura de carpetas.
2. Crear tokens de marca.
3. Crear layout base y metadatos.
4. Crear helper de rutas base.
5. Crear datos tipados.
6. Crear componentes UI básicos.
7. Verificar que no hay texto de proyecto hardcodeado en tarjetas.

## Fase 3 - Cabecera y navegación

1. Logo `DGO.`.
2. Navegación desktop.
3. Menú móvil accesible.
4. Estados activos.
5. Botón CV.
6. Preload/prefetch de enlaces internos relevantes.
7. Pruebas de teclado y móvil.

## Fase 4 - Inicio

1. Hero.
2. Fotografía optimizada.
3. Estado de disponibilidad.
4. CTAs.
5. Proyectos destacados.
6. Tecnologías.
7. Formación.
8. Experiencia.
9. Contacto.
10. Footer.

## Fase 5 - Diálogos

1. Componente y script de diálogo reutilizable.
2. Modal “Sobre mí”.
3. Modal de proyectos.
4. Backdrop y animación progresiva.
5. Cierre Escape/backdrop/botón.
6. Restauración del foco.
7. Pruebas automatizadas.

## Fase 6 - Página de proyectos

1. Crear `/proyectos/`.
2. Reutilizar los mismos datos y componentes.
3. No crear páginas de detalle.
4. No añadir filtros con solo tres proyectos.
5. Añadir contacto final.

## Fase 7 - Contacto

1. Correo visible.
2. Botón copiar.
3. `aria-live`.
4. Fallback manual.
5. `mailto:`.
6. Probar en HTTPS tras desplegar.

## Fase 8 - Integración del CV

1. Descomprimir código original.
2. Auditar rutas y dependencias.
3. Copiarlo a `public/cv/`.
4. Corregir solo rutas necesarias.
5. Mantener diseño y exportación.
6. Añadir vuelta al portfolio sin romper exportación.
7. Probar en base de GitHub Pages.

## Fase 9 - Calidad

1. Alt text.
2. Contraste.
3. Navegación por teclado.
4. Reducción de movimiento.
5. Zoom 200 %.
6. Axe.
7. E2E.
8. Capturas visuales.
9. Recursos y 404.
10. Build final.

## Fase 10 - GitHub Pages

1. Configurar `site` y `base`.
2. Crear workflow oficial vigente.
3. Documentar Settings > Pages > GitHub Actions.
4. Publicar.
5. Probar rutas directas.
6. Probar portapapeles bajo HTTPS.
7. Probar exportación del CV.

## Fase 11 - Cierre

1. Actualizar README del proyecto.
2. Documentar comandos.
3. Añadir capturas del resultado.
4. Resumir decisiones.
5. Enumerar pendientes reales, sin ideas genéricas.

## Segunda fase futura, no implementar ahora

- Traducción completa al inglés.
- Rutas `/en/`.
- Selector de idioma.
- `hreflang`.
- Traducción de metadatos y textos alternativos.
- Posible migración del CV a Astro.
- Dominio o despliegue en VPS.
