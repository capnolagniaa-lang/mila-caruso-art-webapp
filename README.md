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
  "precioOriginal": 450000,
  "precioImpresion": 60000,
  "imagen": "img/horizonte.jpg",
  "originalVendido": false
}
```

- Subí la foto a la carpeta `img/` y poné su ruta en `imagen`.
- Cada obra se ofrece en dos versiones: **Original** e **Impresión**.
- `"originalVendido": true` saca el original de la venta; la obra sigue publicada y se puede comprar la impresión.
- `anio` es opcional.

## Pago

Al tocar **Comprar** se muestra el alias de Mercado Pago (`config.alias`, por defecto `milacaruso`) y el monto.

Después se ofrece enviar el comprobante por WhatsApp (`config.whatsapp`, con código de país, ej. `5491139320330`) o por Instagram (`config.instagram`). El usuario de Instagram también aparece en el pie de página.
