# Sistema visual y marca

## Dirección visual

La web debe combinar:

- la composición limpia y editorial de la referencia;
- el azul marino y dorado/bronze del CV;
- un acento terracota para aportar más vida;
- superficies cálidas, no gris puro;
- bordes finos y sombras muy contenidas.

No debe parecer una copia de la referencia ni una plantilla genérica de portfolio.

## Paleta propuesta

```css
:root {
  --color-bg: #f7f5f0;
  --color-surface: #ffffff;
  --color-surface-soft: #fcf8f0;
  --color-text: #0e172a;
  --color-text-muted: #5b6473;
  --color-border: #e4d8c5;

  --color-brand: #9a671d;
  --color-brand-hover: #7e5216;
  --color-brand-soft: #f4e7d1;

  --color-accent: #e76336;
  --color-accent-hover: #c94d27;
  --color-accent-soft: #fbe5db;

  --color-secondary: #1b8c82;
  --color-secondary-soft: #dff2ef;

  --color-success: #2fa66e;
  --color-focus: #225dc7;
}
```

## Uso de color

- Azul marino: títulos, texto principal y botones de alto contraste.
- Bronze/dorado: identidad principal, líneas, iconos y detalles del CV.
- Terracota: CTA principal, estados activos y microinteracciones.
- Turquesa: acento puntual para tecnología o estados secundarios.
- Verde: disponibilidad y confirmaciones.
- Fondo cálido: base general.

No usar grandes bloques saturados. Mantener una distribución aproximada:

- 70 % fondos claros;
- 20 % azul marino, grises cálidos y bordes;
- 7 % bronze/terracota;
- 3 % verde/turquesa.

## Tipografía

Primera versión sin dependencia remota de fuentes.

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", sans-serif;
```

Si Inter no está instalada, el sistema debe mantener una apariencia correcta. No cargar Google Fonts en v1.

## Escala tipográfica orientativa

- Hero `h1`: `clamp(2.6rem, 6vw, 5.6rem)`.
- Título de sección: `clamp(1.8rem, 3vw, 3rem)`.
- Tarjeta: `1.25rem` a `1.5rem`.
- Cuerpo: `1rem` a `1.125rem`.
- Etiquetas: `0.75rem` a `0.875rem`, mayúsculas y tracking moderado.

## Espaciado

Usar una escala coherente basada en 4 px. Evitar valores arbitrarios repetidos.

- Contenedor máximo: 1440 px.
- Padding lateral móvil: 20-24 px.
- Padding lateral escritorio: 48-72 px.
- Separación de secciones: 72-120 px según viewport.
- Radio de tarjetas: 18-24 px.
- Radio de botones: 12-16 px.

## Sombras

- Muy sutiles.
- Preferir borde y contraste de superficie antes que sombras fuertes.
- Los modales pueden usar una sombra más marcada por jerarquía.

## Logotipo

Usar monograma de texto `DGO.` salvo que el usuario aporte un logotipo definitivo.

- `DGO` en azul marino.
- Punto en terracota o bronze.
- No generar un logo complejo mediante IA.

## Movimiento

- Duraciones de 160-260 ms.
- Curvas suaves.
- Hover con desplazamientos máximos de 2-4 px.
- No usar parallax pesado, cursores personalizados ni animaciones continuas.
- Respetar `prefers-reduced-motion`.
