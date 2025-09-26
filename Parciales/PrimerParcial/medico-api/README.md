# Medico API (Node.js + Express + MySQL + TypeORM)

## Recurso: `medico`
Campos: `nombre`, `apellido`, `cedulaProfesional`, `especialidad`, `aniosExperiencia`, `correoElectronico`.

## Endpoints
- GET `/api/medicos` — listar
- GET `/api/medicos/:id` — detalle
- POST `/api/medicos` — crear
- PUT `/api/medicos/:id` — actualizar
- DELETE `/api/medicos/:id` — eliminar
- GET `/api/health` — healthcheck

### Ejemplo POST
```json
{
  "nombre": "Ana",
  "apellido": "Pérez",
  "cedulaProfesional": "CP-123",
  "especialidad": "Cardiología",
  "aniosExperiencia": 5,
  "correoElectronico": "ana.perez@example.com"
}
```

## Desarrollo local (sin Docker)
```bash
cp .env.example .env
npm install
npm run start
# Ajusta .env a tu MySQL local
```

## Docker (recomendado)
```bash
docker compose up --build
# API: http://localhost:3000/api/medicos
# MySQL: puerto 3307 (host) -> 3306 (contenedor)
```

> TypeORM está con `synchronize: true` para crear la tabla automáticamente. En producción, usa migraciones.
