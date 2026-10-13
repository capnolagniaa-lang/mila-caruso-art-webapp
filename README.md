# Mila Caruso

Tienda online de pinturas. Sitio estático, listo para Render.

## Deploy en Render

1. En Render: **New → Blueprint** (o **Static Site**) y elegí este repositorio.
2. Render lee `render.yaml` y crea el sitio `mila-caruso-art` → `https://mila-caruso-art.onrender.com`.
3. Cada `git push` a `main` vuelve a publicar el sitio.

Si lo creás como **Static Site** a mano: nombre `mila-caruso-art`, build command vacío, publish directory `.`.

## Cargar obras

Todo se edita en `data/obras.json`. Cada obra:

```json
{
  "id": "horizonte",
  "titulo": "Horizonte",
  "tecnica": "Óleo sobre lienzo",
  "medidas": "80 x 100 cm",
  "anio": 2025,
  "descripcion": "Texto breve.",
  "precio": 450000,
  "imagen": "img/horizonte.jpg",
  "vendida": false
}
```

- Subí la foto a la carpeta `img/` y poné su ruta en `imagen`.
- `"vendida": true` muestra la obra como vendida y desactiva la compra.
- `anio` es opcional.

## Pago

Al tocar **Comprar** se muestra el alias de Mercado Pago (`config.alias`, por defecto `milacaruso`) y el monto.

En `config` podés completar `whatsapp` (con código de país, ej. `5491112345678`) o `email` para que aparezca el botón **Enviar comprobante**, y `instagram` para el pie de página.
