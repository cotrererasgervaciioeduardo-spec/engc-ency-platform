# ENGC ENCY

Plataforma web de herramientas digitales e inteligencia artificial. Esta entrega corresponde a la **etapa 1**: identidad visual, catálogo, exploración y una interfaz de asistente en modo demostración.

La conexión con OpenRouter está preparada en el backend. Para activarla, configura `OPENROUTER_API_KEY` en `.env` del servidor. Sin esa clave, el chat permanece en modo demostración.

## Qué está listo

- Página de inicio, catálogo, explorar y acerca de.
- Buscador, filtros y ordenación del catálogo (datos reales en PostgreSQL).
- Fichas de herramientas con estado honesto (`Vista previa` o `Próximamente`).
- Formulario de aviso de disponibilidad (correo + herramienta, validado en servidor).
- Interfaz flotante del chatbot, claramente marcada como demostración.
- Ruta `/api/chat` con modo demostración cuando falta la clave y conexión real a OpenRouter cuando se configura.
- Estilos oscuros, responsive y con respeto a `prefers-reduced-motion`.

## Qué es una demostración

- El asistente **no** genera respuestas de un modelo. Cualquier mensaje recibe un aviso de estado.
- Las herramientas del catálogo **no** ejecutan IA. No inventan resúmenes, traducciones ni código.
- Las novedades de Explorar son hitos internos del proyecto, no estadísticas de usuarios.

## Requisitos

- Node.js 20 o superior
- PostgreSQL (en este entorno: `postgresql://postgres:postgres@127.0.0.1:5432/app_db`)

El frontend es Next.js (App Router). Las rutas `/api/*` necesitan un runtime Node.js; un hosting estático no basta para el backend de la etapa 2.

## Instalación y arranque

```bash
npm install
cp .env.example .env
npx drizzle-kit push
npm run dev
```

Compilación de producción:

```bash
npm run build
npm run start
```

Comprobaciones:

```bash
npx next typegen
npx tsc --noEmit
npm run build
```

## Variables de entorno

| Variable | Ámbito | Uso |
| --- | --- | --- |
| `DATABASE_URL` | Servidor | Conexión PostgreSQL |
| `OPENROUTER_API_KEY` | Servidor | Clave privada de OpenRouter. Nunca la añadas al frontend ni con prefijo `NEXT_PUBLIC_`. |
| `OPENROUTER_MODEL` | Servidor, opcional | Identificador del modelo; por defecto `openrouter/free`. Revisa disponibilidad y límites en OpenRouter. |
| `SITE_URL` | Servidor, opcional | URL pública del sitio para atribución en OpenRouter. |

## Arquitectura relevante

```
src/app/            páginas y rutas API
src/components/     interfaz reutilizable
src/data/catalog.ts catálogo de herramientas
src/db/             Drizzle, esquema y semilla
src/lib/            validación, rate limit, consultas
src/services/openrouter.ts  cliente futuro (ahora es un stub)
```

## Activar OpenRouter

1. Crea una clave desde el panel de OpenRouter.
2. Copia `.env.example` a `.env` y configura `OPENROUTER_API_KEY` en el entorno del servidor.
3. Opcionalmente, configura `OPENROUTER_MODEL` con un identificador de modelo disponible y `SITE_URL` con la URL pública del sitio.
4. Reinicia el servidor. La interfaz detectará si el backend tiene la clave configurada.
5. Prueba el chat con un mensaje corto y revisa los límites de gasto de tu cuenta.

La solicitud a OpenRouter se realiza exclusivamente desde `src/services/openrouter.ts`, llamado por `src/app/api/chat/route.ts`. El historial se envía en la solicitud actual y no se persiste en la base de datos.

No coloques la clave en HTML, componentes cliente, `README` ni archivos públicos.

## Limitaciones pendientes

- Autenticación de usuarios no implementada (por eso no hay botón de acceso).
- El historial del chat vive en la interfaz durante la sesión y no se guarda en la base de datos por defecto.
- Ninguna herramienta genera contenido automático todavía.

## Privacidad y límites antes de publicar

- La ruta del chat no guarda mensajes en PostgreSQL; el historial se mantiene en la interfaz y se envía al servidor con cada petición para mantener el contexto.
- Cuando OpenRouter está configurado, el contenido enviado se transmite a OpenRouter para generar la respuesta. Revisa sus condiciones de privacidad antes de usar información sensible.
- El limitador incluido es en memoria y sirve como protección básica de desarrollo; en producción con varias instancias, sustitúyelo por un limitador compartido y configura límites de gasto en OpenRouter.
- La aplicación requiere PostgreSQL para el catálogo y el formulario de interés, aunque la ruta del chat ya no necesita guardar conversaciones.
