const express = require('express');
const { buildMedicoRouter } = require('./routes/medico.routes');

function createApp(AppDataSource) {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (req, res) => res.json({ ok: true }));

  app.use('/api/medicos', buildMedicoRouter(AppDataSource));

  // 404
  app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));

  return app;
  
}

module.exports = { createApp };
