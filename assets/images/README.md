# Imágenes del sitio

Esta carpeta está organizada por uso. Coloca cada imagen en su subcarpeta
siguiendo estos nombres y tamaños, y avísame cuando estén listas para que
las conecte al HTML (etiquetas `<picture>` con WebP + `loading="lazy"`).

## Formato

- **Fotos dentro del sitio** (equipo, proyectos): usa **`.webp`**. Es hasta
  70-80% más liviano que JPG/PNG con calidad similar, así carga más rápido
  en producción.
- **Imagen de redes sociales (`og/`)**: usa **`.jpg`** o **`.png`**, NO
  `.webp`. Varios crawlers (Facebook, LinkedIn, iMessage) todavía no leen
  bien WebP para las miniaturas de "compartir enlace".

### Cómo convertir a WebP

No hay herramienta de conversión instalada en este entorno de trabajo, así
que conviértelas tú antes de enviarlas (cualquiera de estas opciones sirve,
sin instalar nada):

- [squoosh.app](https://squoosh.app) — arrastras la foto, eliges WebP y
  ajustas la calidad (80-85% es un buen balance).
- Cualquier conversor local que ya tengas (Photoshop, GIMP, Paint.NET con
  plugin WebP, etc.) exportando como "WebP".

## Carpetas

| Carpeta      | Contenido                                              | Tamaño recomendado |
| ------------ | ------------------------------------------------------- | ------------------- |
| `og/`        | Imagen para compartir el link en redes (`og-image.jpg`) | 1200 × 630 px        |
| `equipo/`    | Fotos del equipo, local u oficina para "Nosotros"        | 1200 px de ancho máx |
| `proyectos/` | Fotos de trabajos/instalaciones realizadas (galería)     | 1200 px de ancho máx |

## Ejemplo de uso en el HTML

Una vez la foto esté en su carpeta como WebP, así se referencia (con
fallback automático a JPG si algún navegador muy antiguo no soporta WebP):

```html
<picture>
  <source srcset="assets/images/equipo/equipo-01.webp" type="image/webp" />
  <img
    src="assets/images/equipo/equipo-01.jpg"
    alt="Equipo de Pro System Security"
    width="1200"
    height="800"
    loading="lazy"
  />
</picture>
```

El atributo `width`/`height` evita saltos de layout mientras carga la
imagen, y `loading="lazy"` retrasa la carga de fotos fuera de pantalla
para que la primera vista del sitio siga siendo rápida.
