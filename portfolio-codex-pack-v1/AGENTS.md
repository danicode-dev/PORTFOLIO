# Instrucciones permanentes para Codex

## Objetivo

Construir un portfolio personal profesional, rápido, accesible y mantenible para Daniel García Ortega usando exclusivamente el alcance definido en este repositorio.

## Reglas no negociables

1. Lee todos los documentos indicados en `README.md` antes de modificar código.
2. No inventes datos personales, textos, enlaces, métricas, proyectos, clientes, logros ni tecnologías.
3. No publiques datos marcados como privados o excluidos.
4. No añadas React, Vue, Svelte, Next.js ni otro framework de interfaz. Usa componentes `.astro` y TypeScript/JavaScript nativo.
5. No añadas backend, base de datos, CMS, analítica, cookies, modo oscuro ni formulario de envío.
6. No uses `@astrojs/tailwind`. Para Tailwind CSS 4 usa el método oficial actual de Astro/Tailwind mediante el plugin de Vite.
7. No conviertas el portfolio en una SPA. La primera versión debe mantener navegación multipágina estática y rápida.
8. No uses enlaces `href="#"`, contenido lorem ipsum ni botones sin función.
9. No copies literalmente la referencia visual. Reproduce su composición, jerarquía y limpieza, adaptadas a la marca definida en `docs/brand.md`.
10. No reescribas el CV desde una captura o desde el PDF. Reutiliza el código fuente original que aportará el usuario.
11. Centraliza el contenido editable. Los componentes no deben contener datos de proyectos o experiencia repetidos.
12. Respeta GitHub Pages y su ruta base. Los enlaces internos y activos deben funcionar tanto en desarrollo como bajo `/<repo>/`.
13. Toda interacción debe funcionar con teclado, ratón y pantalla táctil.
14. Usa HTML semántico. Para modales usa `<dialog>` nativo con `showModal()`.
15. Mantén el JavaScript del cliente al mínimo.
16. No agregues dependencias salvo que aporten una necesidad concreta y documentada.
17. Usa versiones estables y genera/commitea el lockfile. No fijes versiones basándote en memoria si la documentación oficial indica otra cosa.
18. Antes de terminar ejecuta todos los comandos de validación definidos en `docs/tests.md`.
19. Corrige los errores encontrados. No declares la tarea completada con errores de build, tipos, rutas, accesibilidad automatizada o pruebas funcionales.
20. Entrega un resumen final con: archivos creados/modificados, decisiones aplicadas, comandos ejecutados, resultados y pendientes reales.

## Decisiones técnicas fijadas

- Astro, salida estática y TypeScript `strict`.
- Tailwind CSS 4.
- Componentes Astro sin framework cliente.
- Datos en módulos TypeScript centralizados.
- Primera versión solo en español, preparada para añadir inglés después.
- Página principal `/`.
- Página de proyectos `/proyectos/`.
- CV en `/cv/`, preservando su implementación original.
- La navegación `Sobre mí` abre un modal.
- Las tarjetas de proyecto abren un modal breve, tanto en inicio como en `/proyectos/`.
- No habrá páginas individuales de detalle de proyecto en la primera versión.
- Contacto mediante correo visible, botón de copia y enlace `mailto:`.
- Despliegue con GitHub Actions y GitHub Pages.

## Forma de trabajo

- Realiza primero una auditoría de archivos de entrada.
- Si falta un activo bloqueante, enumera todos los faltantes de una vez; no preguntes uno a uno.
- Trabaja por fases siguiendo `docs/tasks.md`.
- Mantén cambios pequeños y coherentes.
- Después de cada fase importante ejecuta al menos `npm run check` y `npm run build`.
- No alteres el alcance para “mejorarlo”. Cualquier idea fuera de alcance se documenta en una sección final, pero no se implementa.
