# Contexto del proyecto

## Propietario

- Nombre: Daniel García Ortega.
- Perfil público: desarrollador web full-stack.
- Ubicación pública: Granada, España.
- GitHub: `danicode-dev`.
- Objetivo: presentar perfil, proyectos, stack, formación, experiencia y CV a reclutadores, empresas y colaboradores.

## Motivo del rediseño

El portfolio actual existe, pero se quiere reemplazar por una implementación con Astro más rápida, estructurada, responsive y fácil de mantener. La referencia visual proporcionada utiliza una composición editorial con:

- cabecera limpia;
- fotografía y presentación personal a la izquierda;
- proyectos destacados a la derecha;
- tecnologías, formación, experiencia y enlaces en la zona inferior;
- abundante espacio en blanco;
- tipografía sans serif;
- tarjetas y separadores sutiles.

La nueva web debe inspirarse en esa estructura, no clonarla literalmente.

## Prioridades

1. Publicar rápido una primera versión sólida en GitHub Pages.
2. Reducir JavaScript y dependencias.
3. Evitar contenido inventado o incoherente con el CV.
4. Facilitar cambios de proyectos y textos sin tocar componentes.
5. Ofrecer navegación clara en móvil, tablet y escritorio.
6. Integrar el CV existente sin romper la exportación a PDF.
7. Dejar la base preparada para una traducción al inglés posterior.

## Decisiones confirmadas por el usuario

- Astro como framework.
- Sin modo oscuro.
- Primera implementación solo en español.
- Inglés en una fase posterior.
- Sin analítica.
- Código público.
- GitHub Pages como primer alojamiento.
- Correo visible y copiable.
- Página independiente de proyectos.
- Modales breves para proyectos en inicio y página de proyectos.
- Modal breve de “Sobre mí”.
- CV visualizable y descargable/exportable.
- Paleta adaptada a la identidad visual del CV.

## Fuera de alcance en v1

- Backend.
- CMS.
- Base de datos.
- Panel de administración.
- Formulario que envíe correos.
- Analítica o cookies.
- Modo oscuro.
- Blog.
- Páginas individuales extensas de proyecto.
- Versión inglesa.
- Despliegue en VPS.
