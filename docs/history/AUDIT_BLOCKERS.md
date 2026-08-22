# Bloqueos de publicación

Fecha: 2 de agosto de 2026

Este archivo agrupa todos los datos obligatorios que no pueden resolverse de forma segura con el workspace actual. La implementación y las validaciones locales pueden continuar, pero la publicación no debe declararse completada hasta resolverlos.

## 1. Correo público definitivo

Se han encontrado dos valores distintos:

- CV: `dangarort123@gmail.com`.
- Portfolio anterior: `webdaniel2025@gmail.com`.

No existe evidencia adicional que autorice a elegir uno. El contacto se implementará sin publicar un correo arbitrario; el correo visible, `mailto:` y copia se activarán cuando se confirme el valor definitivo.

## 2. LinkedIn definitivo

Se ha detectado esta URL tanto en la documentación como en el CV:

`https://www.linkedin.com/in/daniel-garc%C3%ADa-ortega-404754385/`

La documentación exige confirmarla antes de publicarla. La acción de LinkedIn se ocultará mientras siga pendiente.

## 3. Repositorio y GitHub Pages

`C:\Users\danga\Desktop\PORTFOLIO` no contiene `.git`, no tiene rama actual y no tiene remoto configurado. Por tanto, no pueden confirmarse:

- el repositorio de destino;
- si se reutiliza `danicode-dev/PORTFOLIO`;
- la rama real de publicación;
- el valor definitivo de `base`;
- la URL final de GitHub Pages;
- la ejecución real del workflow en GitHub.

La implementación mantendrá rutas centralizadas y permitirá validar localmente una ruta base configurable. El workflow se dejará preparado y documentado, pero no se afirmará que el sitio está publicado.

## Pendientes opcionales que no bloquean la implementación

- Disponibilidad pública: se oculta.
- Rol individual en Feedback2Action y SIDN Cost Control: se omite.
- Demo y repositorios no públicos de los proyectos de hackathon: no se renderizan CTAs.
- Capturas reales de los proyectos: se usan únicamente los logos/insignia ya confirmados.

## Trabajo que sí puede completarse de forma segura

- Proyecto Astro estático completo.
- Datos tipados sin valores `PENDING_*` en producción.
- Inicio, `/proyectos/`, diálogos, navegación y menú móvil.
- CV original integrado en `/cv/`.
- Tests de formato, tipos, build, E2E, accesibilidad, responsive y rutas.
- Workflow y documentación de despliegue pendientes únicamente de la identidad real del repositorio.
