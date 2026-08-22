# Despliegue en GitHub Pages

## Estrategia

- Repositorio público.
- Rama principal: `main`.
- Build automático con GitHub Actions.
- Acción oficial mantenida por Astro para desplegar en GitHub Pages.
- Lockfile incluido en el repositorio.

## Datos necesarios

Antes de configurar:

- nombre definitivo del nuevo repositorio;
- confirmar si se reutilizará `PORTFOLIO` o se creará otro;
- URL final temporal de GitHub Pages;
- posible dominio personalizado futuro, no bloqueante.

## Configuración de Astro

### Repositorio de proyecto normal

Si la URL es:

```text
https://danicode-dev.github.io/NOMBRE_REPO/
```

Configurar conceptualmente:

```js
export default defineConfig({
  site: 'https://danicode-dev.github.io',
  base: '/NOMBRE_REPO',
});
```

### Repositorio especial de usuario

Si el repositorio se llama `danicode-dev.github.io`, no se requiere la misma ruta base de proyecto.

### Dominio personalizado futuro

Cuando se migre a dominio propio:

- actualizar `site`;
- retirar `base` si se sirve desde raíz;
- revisar enlaces internos;
- crear/configurar `CNAME` según la documentación oficial vigente;
- configurar DNS y dominio desde GitHub Pages.

## Workflow

Codex debe consultar la guía oficial vigente de Astro antes de crear `.github/workflows/deploy.yml`, porque las versiones mayores de las acciones cambian con el tiempo.

El workflow debe:

- ejecutarse al hacer push a `main`;
- permitir `workflow_dispatch`;
- usar permisos mínimos `contents: read`, `pages: write`, `id-token: write`;
- compilar y subir el artefacto;
- desplegar en el entorno `github-pages`.

No copiar versiones antiguas de acciones desde tutoriales de terceros.

## Configuración manual en GitHub

1. Abrir `Settings` del repositorio.
2. Ir a `Pages`.
3. Seleccionar `GitHub Actions` como origen.
4. Ejecutar o hacer push a `main`.
5. Revisar el workflow y la URL publicada.
6. Probar navegación directa a `/proyectos/` y `/cv/`.

## Verificación posterior

- No hay 404 en recarga directa.
- El CV carga y exporta.
- Los recursos respetan la ruta base.
- Los enlaces externos funcionan.
- El correo se copia bajo HTTPS.
- Los metadatos tienen URLs absolutas correctas.
