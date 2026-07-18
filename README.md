# ProSystem Security

Landing Page profesional y responsiva para servicios de seguridad, desarrollada con HTML, CSS y JavaScript puro. Diseñada para promocionar e impulsar servicios de instalación de cámaras de seguridad, sistemas de vigilancia, alarmas y control de acceso.

## Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsivo con Custom Properties, Flexbox y Grid
- **JavaScript ES6+** - Interactividad y animaciones

## Características

- Diseño moderno y profesional con tema oscuro
- Totalmente responsivo (mobile-first)
- Animaciones de scroll con Intersection Observer
- Navbar con efecto de transparencia al hacer scroll
- Menú hamburguesa para dispositivos móviles
- Formulario de contacto funcional con validación
- Contadores animados
- Botón flotante de WhatsApp
- Optimizado para SEO

## Estructura del Proyecto

```
prosystem-security/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos globales
├── js/
│   └── script.js       # JavaScript principal
├── assets/
│   └── images/         # Imágenes del proyecto
├── sections/           # Secciones modulares (futuro)
└── README.md
```

## Cómo Ejecutar

1. Clonar o descargar el proyecto
2. Abrir `index.html` en un navegador web moderno

```bash
# Opcionalmente, usar un servidor local:
npx serve .
# o
python -m http.server 8000
```

## Secciones

- **Inicio** - Hero con estadísticas y llamada a la acción
- **Servicios** - 6 servicios de seguridad detallados
- **Nosotros** - Información de la empresa con estadísticas
- **Proyectos** - Portafolio de trabajos realizados
- **Testimonios** - Reseñas de clientes satisfechos
- **Contacto** - Formulario de contacto e información
- **Footer** - Enlaces, redes sociales y boletín

## Migración a React

Este proyecto está estructurado para facilitar una futura migración a React:
- Componentes modulares bien definidos en el HTML
- CSS organizado por secciones
- JavaScript con funciones independientes
- Estructura de carpetas preparada para `src/components/`

## Licencia

Proyecto privado - ProSystem Security 2026