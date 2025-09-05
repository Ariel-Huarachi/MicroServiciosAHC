
# Ventas API (Express + TypeORM + Swagger)

> Proyecto base para el enunciado: Productos, Clientes, Facturas y Detalles de Factura.

## Requisitos
- Node 18+
- MySQL en local (puedes usar XAMPP/WAMP/MAMP)

## Configuración
1. Copia `.env.example` a `.env` y edita credenciales.
2. Crea la base de datos vacía: `CREATE DATABASE ventas_api CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
3. Instala dependencias: `npm i`
4. Ejecuta: `npm run dev`
5. Abre Swagger: `http://localhost:3000/api-docs`

> **Nota:** TypeORM está con `synchronize: true` para desarrollo. En producción usa migraciones.

## Estructura
```
src/
  controller/
  entity/
  routes/
  middlewares/
  app.js
  database.js
  swagger.js
```

## Endpoints clave
- Productos CRUD: `/api/productos`
- Clientes CRUD: `/api/clientes`
- Facturas CRUD: `/api/facturas`
- Facturas por cliente: `/api/clientes/{clienteId}/facturas`
- Detalles de factura:
  - Añadir/Listar: `/api/facturas/{facturaId}/detalles`
  - Actualizar/Eliminar: `/api/detalles/{id}`
