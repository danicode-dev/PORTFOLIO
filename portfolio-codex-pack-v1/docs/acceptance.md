# Criterios de aceptación

## Base técnica

- [ ] Proyecto inicializado con Astro estable.
- [ ] TypeScript `strict`.
- [ ] Tailwind CSS 4 mediante el método oficial vigente.
- [ ] Sin frameworks cliente adicionales.
- [ ] Lockfile incluido.
- [ ] `npm run format:check` correcto.
- [ ] `npm run check` correcto.
- [ ] `npm run build` correcto.
- [ ] `npm run test:e2e` correcto.

## Contenido

- [ ] No hay lorem ipsum.
- [ ] No hay datos inventados.
- [ ] No hay `PENDING_*` en producción.
- [ ] El nombre, cargo, experiencia, formación y proyectos coinciden con la documentación.
- [ ] No se muestran teléfono, discapacidad, carné o vehículo sin aprobación explícita.
- [ ] Correo público confirmado.
- [ ] LinkedIn confirmado.

## Inicio

- [ ] La composición transmite la referencia sin copiarla.
- [ ] Hero responsive con fotografía optimizada.
- [ ] Tres proyectos destacados.
- [ ] Tecnologías, formación y experiencia visibles.
- [ ] Contacto claro.
- [ ] Modal “Sobre mí” funcional y accesible.
- [ ] Modales de proyectos funcionales.

## Proyectos

- [ ] Existe `/proyectos/`.
- [ ] No existen páginas individuales extensas.
- [ ] Las tarjetas abren modales.
- [ ] CTAs solo con URL real.
- [ ] Repositorios privados no se presentan como accesibles públicamente.

## CV

- [ ] Existe `/cv/`.
- [ ] Reutiliza el código original.
- [ ] No hay recursos rotos.
- [ ] El botón de exportación PDF funciona en producción.
- [ ] Existe una forma clara de volver al portfolio.

## Navegación

- [ ] Cabecera desktop.
- [ ] Menú móvil.
- [ ] Hover, active y focus visibles.
- [ ] Navegación por teclado completa.
- [ ] Enlaces internos compatibles con GitHub Pages `base`.
- [ ] Sin scroll horizontal accidental.

## Contacto

- [ ] Correo visible y seleccionable.
- [ ] Copia mediante botón bajo HTTPS.
- [ ] Fallback útil si falla Clipboard API.
- [ ] Confirmación accesible.
- [ ] Enlace `mailto:` válido.

## Accesibilidad

- [ ] HTML semántico.
- [ ] Encabezados correctos.
- [ ] Alt text revisado.
- [ ] Contraste revisado.
- [ ] `prefers-reduced-motion` aplicado.
- [ ] Modales cierran con Escape y restauran foco.
- [ ] Axe sin violaciones automatizadas críticas en estados definidos.

## Despliegue

- [ ] Workflow oficial de GitHub Pages.
- [ ] Build publicado desde `main`.
- [ ] Ruta final disponible.
- [ ] Recarga directa de `/proyectos/` funciona.
- [ ] Recarga directa de `/cv/` funciona.
- [ ] No hay 404 de activos.
