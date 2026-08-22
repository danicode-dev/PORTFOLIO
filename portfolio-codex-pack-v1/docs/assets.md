# Archivos y activos que debe adjuntar el usuario

Codex no debe reconstruir estos recursos desde capturas si existe el original.

## 1. Referencia visual

Nombre recomendado:

```text
input/reference/portfolio-reference.png
```

Contenido: imagen del diseño objetivo enviada en la conversación.

Uso: referencia de composición, no para copiar píxel a píxel.

## 2. Fotografía principal

Nombre recomendado:

```text
input/profile/profile-main.jpg
```

Requisitos:

- original con buena resolución;
- sin texto incrustado;
- autorización para recortar;
- indicar encuadre preferido;
- aportar una segunda foto opcional si existe.

Opcional:

```text
input/profile/profile-alt.jpg
```

## 3. Capturas de proyectos

```text
input/projects/al-lio.png
input/projects/feedback2action.png
input/projects/sidn-cost-control.png
```

Preferible:

- capturas reales;
- sin datos privados;
- proporciones similares;
- al menos 1600 px de ancho si es posible;
- no usar mockups generados si hay captura real.

## 4. Logos de proyectos

```text
input/projects/logos/al-lio.png
input/projects/logos/feedback2action.png
input/projects/logos/sidn-cost-control.png
```

Si no son necesarios para el diseño, no deben añadirse solo por rellenar.

## 5. Logos de empresas

```text
input/companies/salunox.svg
input/companies/konecta.png
input/companies/alcampo.png
```

Aportar originales o archivos ya utilizados en el CV. No descargar versiones aleatorias de internet si el usuario dispone de ellas.

## 6. CV en código

Comprimir la carpeta completa actual como:

```text
input/cv-source.zip
```

Debe incluir, sin omitir dependencias locales:

- `index.html` o nombre real del HTML;
- `styles.css` y cualquier CSS adicional;
- scripts JavaScript;
- carpeta `img` completa;
- logotipos de empresas y proyectos;
- fotografía;
- archivos usados por el botón de exportación PDF;
- dependencias locales;
- cualquier README con instrucciones.

La captura muestra archivos como `index.html`, `styles.css`, carpeta `img`, logos y fotografías. Debe adjuntarse la carpeta real, no solo una captura.

## 7. CV PDF

Nombre recomendado:

```text
input/cv-daniel-garcia-ortega.pdf
```

Uso:

- recurso de descarga directa opcional;
- referencia visual;
- fallback si la exportación dinámica falla.

No sustituye al código fuente del CV.

## 8. Enlaces de proyectos

Crear un archivo aportado por el usuario o resolver en `pending.md` con:

- URL pública de demo de Al-Lío;
- repositorio público de Al-Lío;
- URL pública de Feedback2Action, si se hace público;
- demo de Feedback2Action, si existe;
- repositorio de SIDN Cost Control;
- demo de SIDN Cost Control;
- confirmación del rol de Daniel en los dos proyectos de hackathon.

## 9. Datos públicos

Confirmar:

- correo definitivo;
- LinkedIn definitivo;
- disponibilidad pública;
- si quiere publicar teléfono;
- si quiere publicar datos de discapacidad/carné/vehículo;
- nombre del nuevo repositorio.

## 10. Convención final dentro del proyecto

Codex debe optimizar y mover los recursos a:

```text
public/images/profile/
public/images/projects/
public/images/companies/
public/cv/
```

No mantener nombres con espacios, mayúsculas inconsistentes o sufijos como `final2`.
