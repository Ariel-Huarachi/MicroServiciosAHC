import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';

import { AppDataSource } from './database.js';
import productos from './routes/productoRoutes.js';
import clientes from './routes/clienteRoutes.js';
import facturas from './routes/facturaRoutes.js';
import detalles from './routes/detalleRoutes.js';
import { errorHandler } from './middlewares/error.js';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, name: 'Ventas API' }));

app.use(productos);
app.use(clientes);
app.use(facturas);
app.use(detalles);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Conectado a la base de datos');
    app.listen(PORT, () => console.log(`🚀 API lista en http://localhost:${PORT}`));
    console.log(`📘 Swagger UI: http://localhost:${PORT}/api-docs`);
  })
  .catch((err) => {
    console.error('❌ Error al iniciar la AppDataSource', err);
    process.exit(1);
  });
