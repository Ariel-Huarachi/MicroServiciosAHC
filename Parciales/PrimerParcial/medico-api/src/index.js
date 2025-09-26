require('dotenv').config();
const { AppDataSource } = require('./data-source');
const { createApp } = require('./app');

const PORT = parseInt(process.env.PORT || '3000', 10);

async function start() {
  try {
    await AppDataSource.initialize();
    console.log(' DB conectada');
    const app = createApp(AppDataSource);
    app.listen(PORT, () => console.log(` API escuchando en http://localhost:${PORT}`));
  } catch (err) {
    console.error('Error al iniciar la API:', err);
    process.exit(1);
  }
}

start();
